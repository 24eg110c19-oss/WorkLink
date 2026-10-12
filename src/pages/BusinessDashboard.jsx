import { useState } from "react";
import { Link } from "react-router-dom";

function BusinessDashboard() {
  const [hiredWorkers, setHiredWorkers] = useState([]);

  const applications = [
    {
      name: "Ravi Kumar",
      job: "Waiter",
      location: "Hyderabad",
      rating: 4.9,
      match: 95.8,
      experience: "3 Years",
    },
    {
      name: "Arun Kumar",
      job: "Event Staff",
      location: "Hyderabad",
      rating: 4.7,
      match: 91.4,
      experience: "2 Years",
    },
    {
      name: "Suresh Kumar",
      job: "Kitchen Assistant",
      location: "Hyderabad",
      rating: 4.5,
      match: 87.6,
      experience: "1 Year",
    },
  ];

  const hireWorker = (name) => {
    setHiredWorkers((previous) => [...previous, name]);
  };

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <h1>Business Dashboard</h1>
          <p>Manage your workforce and job postings</p>
        </div>

        <Link to="/" className="logout-btn">
          Logout
        </Link>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Active Jobs</h3>
          <h2>6</h2>
          <p>Currently available jobs</p>
        </div>

        <div className="dashboard-card">
          <h3>Applications</h3>
          <h2>{applications.length}</h2>
          <p>Worker applications received</p>
        </div>

        <div className="dashboard-card">
          <h3>Workers Hired</h3>
          <h2>{18 + hiredWorkers.length}</h2>
          <p>Total workers hired</p>
        </div>

        <div className="dashboard-card">
          <h3>Average Rating</h3>
          <h2>4.7 ⭐</h2>
          <p>Your business rating</p>
        </div>

      </div>

      <div className="job-section">

        <div className="dashboard-header">

          <h2>My Job Posts</h2>

          <Link
            to="/post-job"
            className="primary-btn"
          >
            + Post New Job
          </Link>

        </div>

        <div className="job-card">

          <div>
            <h3>Waiter Required</h3>
            <p>Hyderabad • ₹800/day</p>
            <p>Applications: 12</p>
          </div>

          <Link
            to="/ai-matching"
            className="primary-btn"
          >
            AI Match Workers
          </Link>

        </div>

        <div className="job-card">

          <div>
            <h3>Event Staff Required</h3>
            <p>Hyderabad • ₹1,000/day</p>
            <p>Applications: 8</p>
          </div>

          <Link
            to="/ai-matching"
            className="primary-btn"
          >
            AI Match Workers
          </Link>

        </div>

        <div className="job-card">

          <div>
            <h3>Kitchen Assistant</h3>
            <p>Hyderabad • ₹900/day</p>
            <p>Applications: 12</p>
          </div>

          <Link
            to="/ai-matching"
            className="primary-btn"
          >
            AI Match Workers
          </Link>

        </div>

      </div>

      <div className="job-section">

        <h2>👥 Worker Applications</h2>

        {applications.map((worker) => {

          const isHired = hiredWorkers.includes(worker.name);

          return (
            <div
              className="job-card"
              key={worker.name}
            >

              <div>

                <h3>{worker.name}</h3>

                <p>
                  Job: {worker.job}
                </p>

                <p>
                  📍 {worker.location} • Experience:{" "}
                  {worker.experience}
                </p>

                <p>
                  Rating: {worker.rating} ⭐
                </p>

              </div>

              <div>

                <h2>{worker.match}%</h2>

                <button
                  onClick={() => hireWorker(worker.name)}
                  disabled={isHired}
                >
                  {isHired ? "✅ Hired" : "Hire Worker"}
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default BusinessDashboard;