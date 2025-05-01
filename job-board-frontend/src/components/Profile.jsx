import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function Profile() {
  const {
    user,
    logout,
    changePassword,
    updateJob,
    deleteJob,
    jobs,
    fetchUserJobs,
    setView,
    darkMode,
  } = useContext(AppContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [updatedJobData, setUpdatedJobData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.username) {
      fetchUserJobs();
    }
  }, [user?.username]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setMessage("Please fill both old and new password fields.");
      return;
    }
    const success = await changePassword(
      user.username,
      oldPassword,
      newPassword
    );
    if (success) {
      setMessage("Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
    } else {
      setMessage("Failed to change password.");
    }
  };

  const handleSelectJob = (job) => {
    if (!job) return;
    setSelectedJobId(job._id);
    setUpdatedJobData({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
    });
    setMessage("");
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    if (!selectedJobId) {
      setMessage("Please select a job to update.");
      return;
    }
    const success = await updateJob(selectedJobId, updatedJobData);
    if (success) {
      setMessage("Job updated successfully.");
      setSelectedJobId(null);
      setUpdatedJobData({
        title: "",
        company: "",
        location: "",
        description: "",
      });
      fetchUserJobs();
    } else {
      setMessage("Failed to update job.");
    }
  };

  const handleDeleteJob = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmed) {
      const success = await deleteJob(id);
      if (success) {
        setMessage("Job deleted successfully.");
        if (selectedJobId === id) {
          setSelectedJobId(null);
          setUpdatedJobData({
            title: "",
            company: "",
            location: "",
            description: "",
          });
        }
        fetchUserJobs();
      } else {
        setMessage("Failed to delete job.");
      }
    }
  };

  const inputStyle = `w-full px-3 py-2 border rounded ${
    darkMode
      ? "bg-gray-700 text-white border-gray-600"
      : "bg-white text-black border-gray-300"
  }`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-3xl p-6  rounded-lg shadow-md  ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h2 className="mb-6 text-3xl font-bold text-center">Profile</h2>
        <p className="mb-4 text-2xl font-bold text-center">
          Username: {user?.username}
        </p>

        <div className="flex justify-center mb-6"></div>

        {/* Change Password */}
        <section className="mb-10">
          <h3 className="mb-4 text-xl font-semibold text-center">
            Change Password
          </h3>
          <form
            onSubmit={handleChangePassword}
            className="max-w-md mx-auto space-y-4"
          >
            <div>
              <label className="block mb-1">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputStyle}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Change Password
            </button>
          </form>
        </section>

        {/* Manage Jobs */}
        <section>
          <h3 className="mb-4 text-xl font-semibold text-center">
            Manage Job Posts
          </h3>
          <div className="max-w-md mx-auto mb-6">
            <label className="block mb-1">Select Job to Update</label>
            <select
              value={selectedJobId || ""}
              onChange={(e) => {
                const job = jobs.find((j) => j._id === e.target.value);
                handleSelectJob(job);
              }}
              className={inputStyle}
            >
              <option value="">-- Select a job --</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title} at {job.company}
                </option>
              ))}
            </select>
          </div>

          {selectedJobId && (
            <form
              onSubmit={handleUpdateJob}
              className="max-w-md mx-auto mb-6 space-y-4"
            >
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  value={updatedJobData.title}
                  onChange={(e) =>
                    setUpdatedJobData({
                      ...updatedJobData,
                      title: e.target.value,
                    })
                  }
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Company</label>
                <input
                  type="text"
                  value={updatedJobData.company}
                  onChange={(e) =>
                    setUpdatedJobData({
                      ...updatedJobData,
                      company: e.target.value,
                    })
                  }
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  value={updatedJobData.location}
                  onChange={(e) =>
                    setUpdatedJobData({
                      ...updatedJobData,
                      location: e.target.value,
                    })
                  }
                  className={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  value={updatedJobData.description}
                  onChange={(e) =>
                    setUpdatedJobData({
                      ...updatedJobData,
                      description: e.target.value,
                    })
                  }
                  className={inputStyle}
                  rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Update Job
              </button>
            </form>
          )}

          {/* Delete Jobs */}
          <div className="max-w-md mx-auto">
            <h4 className="mb-2 font-semibold">Delete Job Posts</h4>
            {jobs.length === 0 && <p>No job posts available.</p>}
            {jobs.map((job) => (
              <div
                key={job._id}
                className={`flex items-center justify-between p-2 mb-2 border rounded ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <span>
                  {job.title} at {job.company}
                </span>
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Message */}
        {message && (
          <p className="mt-6 font-semibold text-center text-red-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
