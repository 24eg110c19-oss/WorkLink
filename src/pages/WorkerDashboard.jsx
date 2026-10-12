import { useState } from "react";
import { Link } from "react-router-dom";

function WorkerDashboard() {
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem("worklinkApplications");
    return saved ? JSON.parse(saved) : [];
  });

  const jobs = [
    {
      id: 1,
      title: "Waiter",
      business: "ABC Restaurant",
      location: "Hyderabad",
      salary: 800,
      type: "Full Time",
      match: 95.8,
    },
    {
      id: 2,
      title: "Event Staff",
      business: "Grand Events",
      location: "Hyderabad",
      salary: 1000,
      type: "Part Time",
      match: 91.4,
    },
    {
      id: 3,
      title: "Delivery Assistant",
      business: "QuickMart",
      location: "Hyderabad",
      salary: 900,
      type: "Full Time",
      match: 87.6,
    },
  ];

  const applyJob = (job) => {
    if (appliedJobs.some((item) => item.id === job.id)) {
      return;
    }

    const updatedApplications = [...appliedJobs, job];

    setAppliedJobs(updatedApplications);

    localStorage.setItem(
      "worklinkApplications",
      JSON.stringify(updatedApplications)
    );

    alert("Application submitted successfully!");
  };

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <h1>Worker Dashboard</h1>
          <p>Welcome back, Worker!</p>
        </div>

        <Link to="/" className="logout-btn">
          Logout
        </Link>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Available Jobs</h3>
          <h2>{jobs.length}</h2>
          <p>Jobs matching your skills</p>
        </div>

        <div className="dashboard-card">
          <h3>Applications</h3>
          <h2>{appliedJobs.length}</h2>
          <p>Jobs you applied for</p>
        </div>

        <div className="dashboard-card">
          <h3>Profile Rating</h3>
          <h2>4.8 ⭐</h2>
          <p>Your current rating</p>
        </div>

        <div className="dashboard-card">
          <h3>Best AI Match</h3>
          <h2>{Math.max(...jobs.map((job) => job.match))}%</h2>
          <p>Best job match</p>
        </div>

      </div>

      <div className="job-section">

        <h2>🤖 AI Recommended Jobs</h2>

        {jobs.map((job) => {

          const alreadyApplied = appliedJobs.some(
            (item) => item.id === job.id
          );

          return (
            <div className="job-card" key={job.id}>

              <div>

                <h3>{job.title}</h3>

                <p>
                  {job.business} • {job.location}
                </p>

                <p>
                  ₹{job.salary}/day • {job.type}
                </p>

                <p>
                  AI Match: <strong>{job.match}%</strong>
                </p>

              </div>

              <button
                onClick={() => applyJob(job)}
                disabled={alreadyApplied}
              >
                {alreadyApplied ? "Applied ✓" : "Apply"}
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default WorkerDashboard;