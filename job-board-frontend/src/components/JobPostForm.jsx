import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

function JobPostForm({ defaultCompany = "" }) {
  const { darkMode } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    company: defaultCompany,
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, company: defaultCompany }));
  }, [defaultCompany]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({
          title: "",
          company: defaultCompany,
          location: "",
          description: "",
        });
      } else {
        setErrorMessage("Failed to post job. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error posting job: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-xl shadow-lg p-8 rounded-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="mb-4 text-3xl font-bold text-center">Post a Job</h2>

        {errorMessage && (
          <p className="mb-4 text-center text-red-500">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobPostForm;
