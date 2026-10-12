import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    skills: "",
    location: "",
    salary: "",
    jobType: "",
    workers: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("worklinkJob", JSON.stringify(job));

    navigate("/ai-matching");
  };

  return (
    <div className="auth-page">

      <div className="auth-box">

        <h2>Post a New Job</h2>

        <p>Find the right worker for your business</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Required Skills"
            value={job.skills}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary per Day"
            value={job.salary}
            onChange={handleChange}
            required
          />

          <select
            name="jobType"
            value={job.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Temporary">Temporary</option>
          </select>

          <input
            type="number"
            name="workers"
            placeholder="Number of Workers"
            value={job.workers}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Post Job & Find Workers
          </button>

        </form>

        <p>
          <button
            type="button"
            onClick={() => navigate("/business-dashboard")}
            style={{
              background: "none",
              color: "#2563eb",
              padding: 0,
              marginTop: "15px",
            }}
          >
            Back to Dashboard
          </button>
        </p>

      </div>

    </div>
  );
}

export default PostJob;