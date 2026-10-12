import { Link } from "react-router-dom";

function calculateMatch(worker, job) {
  let score = 0;

  const requiredSkills = job.skills
    .toLowerCase()
    .split(",")
    .map((skill) => skill.trim());

  const workerSkills = worker.skills
    .toLowerCase()
    .split(",")
    .map((skill) => skill.trim());

  const skillMatched = requiredSkills.some((skill) =>
    workerSkills.includes(skill)
  );

  if (skillMatched) score += 40;

  if (worker.location.toLowerCase() === job.location.toLowerCase()) {
    score += 20;
  }

  if (worker.available) {
    score += 20;
  }

  score += Math.min(worker.experience * 2, 10);
  score += Math.min(worker.rating * 2, 10);

  return score.toFixed(1);
}

function AIMatching() {
  const savedJob = localStorage.getItem("worklinkJob");

  const job = savedJob
    ? JSON.parse(savedJob)
    : {
        title: "Waiter",
        skills: "Waiter, Customer Service",
        location: "Hyderabad",
        salary: "800",
        jobType: "Full Time",
        workers: "3",
      };

  const workers = [
    {
      name: "Ravi Kumar",
      skills: "Waiter, Customer Service",
      experience: 3,
      location: "Hyderabad",
      rating: 4.9,
      available: true,
    },
    {
      name: "Arun Kumar",
      skills: "Catering, Waiter",
      experience: 2,
      location: "Hyderabad",
      rating: 4.7,
      available: true,
    },
    {
      name: "Suresh Kumar",
      skills: "Event Staff, Customer Service",
      experience: 1,
      location: "Hyderabad",
      rating: 4.5,
      available: false,
    },
  ];

  const rankedWorkers = workers
    .map((worker) => ({
      ...worker,
      score: calculateMatch(worker, job),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <h1>🤖 AI Worker Matching</h1>

          <p>
            Workers ranked according to your job requirements
          </p>
        </div>

        <Link
          to="/business-dashboard"
          className="logout-btn"
        >
          Back
        </Link>

      </div>

      <div className="job-section">

        <h2>{job.title}</h2>

        <p>
          📍 {job.location} &nbsp; • &nbsp;
          ₹{job.salary}/day &nbsp; • &nbsp;
          {job.jobType}
        </p>

        <p>
          <strong>Required Skills:</strong> {job.skills}
        </p>

        <p>
          <strong>Workers Required:</strong> {job.workers}
        </p>

        <br />

        <h2>Top AI Recommended Workers</h2>

        {rankedWorkers.map((worker, index) => (

          <div
            className="job-card"
            key={worker.name}
          >

            <div>

              <h3>
                #{index + 1} {worker.name}
              </h3>

              <p>
                Skills: {worker.skills}
              </p>

              <p>
                Experience: {worker.experience} Years •{" "}
                {worker.location}
              </p>

              <p>
                Rating: {worker.rating} ⭐
              </p>

              <p>
                Availability:{" "}
                {worker.available
                  ? "Available ✅"
                  : "Not Available ❌"}
              </p>

            </div>

            <div>

              <h2>{worker.score}%</h2>

              <button>
                Hire Worker
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AIMatching;