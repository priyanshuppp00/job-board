import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const defaultJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    company: "Tech India Pvt Ltd",
    location: "Bangalore, India",
    description: "Develop and maintain frontend applications using React.",
  },
  {
    _id: "2",
    title: "Backend Developer",
    company: "Tech India Pvt Ltd",
    location: "Mumbai, India",
    description: "Build and maintain backend APIs using Node.js and MongoDB.",
  },
];

const defaultUsers = [
  {
    username: "user1",
    password: "password1",
  },
  {
    username: "user2",
    password: "password2",
  },
];

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("isLoggedIn");
    return saved === "true" ? true : false;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [jobs, setJobs] = useState(defaultJobs);
  const [users, setUsers] = useState(defaultUsers);
  const [view, setView] = useState("home"); // 'home', 'about', 'login', 'signup', 'post', 'apply'

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser({ username });
        setToken(data.token);
        setView("home");
        return true;
      } else {
        const data = await response.json();
        alert(data.error || "Login failed");
        return false;
      }
    } catch (error) {
      alert("Login error: " + error.message);
      return false;
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser({ username });
        setToken(data.token);
        setView("home");
        return true;
      } else if (response.status === 400) {
        // User exists, attempt login
        return await login(username, password);
      } else {
        const data = await response.json();
        alert(data.error || "Signup failed");
        return false;
      }
    } catch (error) {
      alert("Signup error: " + error.message);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    setView("home");
  };

  const cleanupData = () => {
    setJobs(defaultJobs);
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
    setView("home");
  };

  const changePassword = async (username, oldPassword, newPassword) => {
    try {
      const response = await fetch(
        "http://localhost:5000/users/change-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, oldPassword, newPassword }),
        }
      );
      if (response.ok) {
        alert("Password changed successfully");
        return true;
      } else {
        const data = await response.json();
        alert(data.error || "Failed to change password");
        return false;
      }
    } catch (error) {
      alert("Change password error: " + error.message);
      return false;
    }
  };

  const fetchUserJobs = async () => {
    if (!user) return;
    try {
      const response = await fetch(
        `http://localhost:5000/jobs?userId=${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const jobsData = await response.json();
        setJobs(jobsData);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to fetch jobs");
      }
    } catch (error) {
      alert("Fetch jobs error: " + error.message);
    }
  };

  const updateJob = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedJob = await response.json();
        setJobs((prevJobs) =>
          prevJobs.map((job) => (job._id === id ? updatedJob : job))
        );
        return true;
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update job");
        return false;
      }
    } catch (error) {
      alert("Update job error: " + error.message);
      return false;
    }
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        return true;
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete job");
        return false;
      }
    } catch (error) {
      alert("Delete job error: " + error.message);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isLoggedIn,
        user,
        login,
        signup,
        logout,
        jobs,
        setJobs,
        view,
        setView,
        cleanupData,
        changePassword,
        updateJob,
        deleteJob,
        fetchUserJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
