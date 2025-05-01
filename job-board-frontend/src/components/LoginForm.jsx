import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function LoginForm() {
  const { login, setView, darkMode } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (!success) {
      setError("Invalid username or password");
    } else {
      setError("");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="mb-6 text-3xl font-bold text-center">Login</h2>

        {error && (
          <p className="mb-4 text-sm text-center text-red-500">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md"
            />
            <div className="mt-2">
              <label className="text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>

          <p className="mt-6 text-sm text-center">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setView("signup")}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
