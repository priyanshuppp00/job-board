import React, { useContext, useState } from "react";
import JobPostForm from "./components/JobPostForm";
import JobList from "./components/JobList";
import ApplicationForm from "./components/ApplicationForm";
import Navbar from "./components/Navbar";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from "./components/Profile";
import { AppContext } from "./context/AppContext";
import Container from "./components/Container";

function App() {
  const { isLoggedIn, darkMode, setDarkMode, view, setView, logout } =
    useContext(AppContext);

  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleLogin = () => {
    setView("login");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Container>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
        onNavigate={setView}
      />
      <h1 className="mb-8 text-3xl font-bold text-center">Job Board</h1>

      {view === "home" && (
        <>
          <JobList />
        </>
      )}

      {view === "about" && <About />}
      {view === "list" && isLoggedIn && <JobList />}
      {view === "post" && isLoggedIn && (
        <JobPostForm defaultCompany="Tech India Pvt Ltd" />
      )}
      {view === "apply" && selectedJobId && isLoggedIn && (
        <ApplicationForm jobId={selectedJobId} />
      )}
      {view === "login" && <LoginForm />}
      {view === "signup" && <SignupForm />}
      {view === "profile" && <Profile />}
    </Container>
  );
}

export default App;
