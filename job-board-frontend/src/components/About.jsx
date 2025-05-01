import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function About() {
  const { darkMode } = useContext(AppContext);

  return (
    <div
      className={`w-full px-4 md:px-20 py-10 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`p-6 rounded-lg shadow-lg md:p-10 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="pb-2 mb-6 text-3xl font-extrabold border-b border-gray-300 md:text-4xl">
          About Job Board
        </h2>

        <p className="mb-4">
          Welcome to <span className="font-semibold">Job Board</span>, a modern
          and efficient platform where employers and job seekers connect with
          ease. Whether you're a company searching for the right talent or an
          individual seeking your next career opportunity, we've got you
          covered.
        </p>

        <p className="mb-4">
          Our mission is to bridge the gap between employers and skilled
          professionals by providing an intuitive, user-friendly interface and
          powerful job search tools.
        </p>

        <p className="mb-4">
          <strong>For Employers:</strong> Easily post job listings with detailed
          descriptions, including title, location, salary range, qualifications,
          and more. Manage applicants and reach a wider audience with
          streamlined tools.
        </p>

        <p className="mb-4">
          <strong>For Job Seekers:</strong> Browse job postings by title,
          location, or company. Use our advanced filters to quickly find roles
          that match your skills and interests. Apply directly through the
          platform in just a few clicks.
        </p>

        <p className="mb-4">
          <strong>Dark Mode Support:</strong> We care about your eyes. Our
          entire platform supports dark mode for a more comfortable experience
          during long job hunts or recruitment sessions.
        </p>

        <p className="mb-4">
          Job Board is built using modern web technologies including{" "}
          <span className="italic">React</span>,{" "}
          <span className="italic">Tailwind CSS</span>, and{" "}
          <span className="italic">Node.js</span> for speed, reliability, and
          scalability.
        </p>

        <p className="mb-4">
          Our platform is constantly evolving based on feedback from our users.
          We are committed to delivering a seamless experience with regular
          updates, new features, and enhanced security.
        </p>

        <p className="mb-4">
          Whether you're hiring for a fast-growing startup or applying to your
          dream job, Job Board streamlines the entire process—from posting and
          browsing to applying and hiring.
        </p>

        <p className="mb-4">
          We also support resume uploads, bookmarking favorite jobs, and
          real-time notifications so that you never miss an opportunity.
        </p>

        <p className="font-medium">
          Join us today and be a part of a smarter, faster hiring and job search
          experience.
        </p>
      </div>
    </div>
  );
}

export default About;
