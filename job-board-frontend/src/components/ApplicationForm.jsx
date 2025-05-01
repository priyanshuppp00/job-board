import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function ApplicationForm({ jobId }) {
  const { darkMode } = useContext(AppContext);
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    resume: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, jobId }),
      });
      if (response.ok) {
        alert("Application submitted successfully!");
        setFormData({ applicantName: "", applicantEmail: "", resume: "" });
      } else {
        alert("Failed to submit application");
      }
    } catch (error) {
      alert("Error submitting application: " + error.message);
    }
  };

  return (
    <div
      className={`w-full px-4 md:px-20 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-2xl p-6 mx-auto rounded-lg shadow-lg md:p-10">
        <h2 className="pb-2 mb-6 text-3xl font-extrabold border-b border-gray-300 md:text-4xl">
          Apply for Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded "
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="applicantEmail"
              value={formData.applicantEmail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded "
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Resume (URL or text)
            </label>
            <textarea
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
