import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

function JobList() {
  const {
    darkMode,
    isLoggedIn,
    setView,
    jobs: defaultJobs,
    user,
  } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState({
    title: "",
    location: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const mergeJobs = (fetchedJobs, defaultJobs) => {
    const jobMap = new Map();
    fetchedJobs.forEach((job) => jobMap.set(job._id, job));
    defaultJobs.forEach((job) => {
      if (!jobMap.has(job._id)) {
        jobMap.set(job._id, job);
      }
    });
    return Array.from(jobMap.values());
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    const query = new URLSearchParams();
    if (search.title) query.append("title", search.title);
    if (search.location) query.append("location", search.location);
    if (search.company) query.append("company", search.company);

    try {
      const response = await fetch(
        `http://localhost:5000/jobs?${query.toString()}`
      );
      const data = await response.json();
      const mergedJobs = mergeJobs(data, defaultJobs);
      setJobs(mergedJobs);
    } catch (error) {
      alert("Failed to fetch jobs: " + error.message);
      const mergedJobs = mergeJobs([], defaultJobs);
      setJobs(mergedJobs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleApply = (jobId) => {
    if (!isLoggedIn) {
      setView("login");
    } else {
      alert("Apply functionality to be implemented for job id: " + jobId);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${jobId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Job deleted successfully.");
          fetchJobs();
        } else {
          alert("Failed to delete job.");
        }
      } catch (error) {
        alert("Error deleting job: " + error.message);
      }
    }
  };

  const handleUpdate = (job) => {
    alert("Update functionality to be implemented for job id: " + job._id);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-3xl p-8 rounded-lg shadow-lg  ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="mb-6 text-2xl font-bold">Job Listings</h2>

        <form
          onSubmit={handleSearchSubmit}
          className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3"
        >
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-semibold">
              Job Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Job Title"
              value={search.title}
              onChange={handleSearchChange}
              className="px-3 py-2 text-black border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-semibold">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Location"
              value={search.location}
              onChange={handleSearchChange}
              className="px-3 py-2 text-black border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="company" className="text-sm font-semibold">
              Company
            </label>
            <input
              id="company"
              type="text"
              name="company"
              placeholder="Company"
              value={search.company}
              onChange={handleSearchChange}
              className="px-3 py-2 text-black border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-600 rounded md:col-span-3 hover:bg-green-700"
          >
            Search
          </button>
        </form>

        {isLoading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found. Try adjusting your search filters.</p>
        ) : (
          <ul>
            {jobs.map((job) => (
              <li key={job._id} className="py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p>
                  {job.company} - {job.location}
                </p>
                <p className="mt-2">{job.description}</p>
                <div className="flex flex-wrap mt-2 space-x-2">
                  <button
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                    onClick={() => handleApply(job._id)}
                  >
                    Apply
                  </button>
                  {isLoggedIn && user && job.postedBy === user.username && (
                    <>
                      <button
                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                        onClick={() => handleUpdate(job)}
                      >
                        Update
                      </button>
                      <button
                        className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default JobList;
