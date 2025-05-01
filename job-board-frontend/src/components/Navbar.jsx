import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "post", label: "Post Job" },
  { key: "list", label: "Search Job" },
];

function Navbar({
  isLoggedIn,
  onLogin,
  onLogout,
  darkMode,
  onDarkModeToggle,
  onNavigate,
  user,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const handleNavigate = (page) => {
    setShowMenu(false);
    const publicPages = ["home", "about", "login", "signup"];
    if (!isLoggedIn && !publicPages.includes(page)) {
      alert("Login required to access this page.");
      onNavigate("login");
    } else {
      onNavigate(page);
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <header
      className={`w-full fixed z-50 shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="container flex items-center justify-between p-6 mx-auto">
        {/* Logo & Nav */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigate("home")}
            className="mr-4 text-2xl font-bold"
          >
            JobBoard
          </button>

          <nav className="flex-wrap hidden md:flex">
            {(isLoggedIn
              ? [
                  ...NAV_ITEMS,
                  { key: "profile", label: user?.username || "Profile" },
                ]
              : NAV_ITEMS.filter((n) => n.key === "home" || n.key === "about")
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className="px-3 py-1 font-medium hover:underline"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center">
          <button
            onClick={onDarkModeToggle}
            className="px-2 py-1 mr-2 text-black bg-gray-200 rounded hover:bg-gray-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => handleNavigate("login")}
                className="px-4 py-1 mr-2 text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-white"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigate("signup")}
                className="px-4 py-1 text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-white"
              >
                Signup
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="ml-4 text-2xl md:hidden"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle navigation"
          >
            {showMenu ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className={`md:hidden px-4 py-4 space-y-3 text-lg ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          {(isLoggedIn
            ? [
                ...NAV_ITEMS,
                { key: "profile", label: user?.username || "Profile" },
              ]
            : NAV_ITEMS.filter((n) => n.key === "home" || n.key === "about")
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleNavigate(key)}
              className="block w-full text-left hover:text-red-500"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
