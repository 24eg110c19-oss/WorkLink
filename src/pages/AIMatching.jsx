import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, MapPin, Star, CheckCircle, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";
import ChatModal from "../components/ChatModal";

function calculateMatch(worker, job) {
  let score = 0;

  const requiredSkills = (job.skills || "")
    .toLowerCase()
    .split(",")
    .map((skill) => skill.trim());

  const workerSkills = (worker.skills || "")
    .toLowerCase()
    .split(",")
    .map((skill) => skill.trim());

  const skillMatched = requiredSkills.some((skill) =>
    workerSkills.some((ws) => ws.includes(skill) || skill.includes(ws))
  );

  if (skillMatched) score += 45;

  if (worker.location.toLowerCase().includes((job.location || "").toLowerCase()) ||
      (job.location || "").toLowerCase().includes(worker.location.toLowerCase())) {
    score += 25;
  }

  if (worker.available) {
    score += 15;
  }

  score += Math.min(worker.experience * 1.5, 7.5);
  score += Math.min(worker.rating * 1.5, 7.5);

  return Math.min(score, 99.4).toFixed(1);
}

export default function AIMatching() {
  const [lang, setLang] = useState("en");
  const [chatWorker, setChatWorker] = useState(null);
  const [hiredWorkers, setHiredWorkers] = useState([]);

  const savedJob = localStorage.getItem("worklinkJob");

  const job = savedJob
    ? JSON.parse(savedJob)
    : {
        title: "Head Banquet Waiter",
        skills: "Waiter, Banquet Hospitality, Customer Service",
        location: "Hyderabad",
        salary: "900",
        jobType: "Evening Shift",
        workers: "3",
      };

  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      skills: "Waiter, Customer Service, Banquet Hospitality",
      experience: 3,
      location: "Hyderabad",
      rating: 4.9,
      available: true,
      verified: true,
    },
    {
      id: 2,
      name: "Arun Kumar",
      skills: "Catering, Waiter, Food Delivery",
      experience: 2,
      location: "Hyderabad",
      rating: 4.7,
      available: true,
      verified: true,
    },
    {
      id: 3,
      name: "Mahesh Goud",
      skills: "Event Staff, Customer Service, Beverage Serving",
      experience: 4,
      location: "Hyderabad",
      rating: 4.8,
      available: true,
      verified: true,
    },
    {
      id: 4,
      name: "Suresh Kumar",
      skills: "Kitchen Assistant, Food Prep",
      experience: 1,
      location: "Hyderabad",
      rating: 4.5,
      available: false,
      verified: false,
    },
  ]);

  const rankedWorkers = workers
    .map((worker) => ({
      ...worker,
      score: calculateMatch(worker, job),
    }))
    .sort((a, b) => b.score - a.score);

  const handleHire = (name) => {
    setHiredWorkers((prev) => [...prev, name]);
  };

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>🤖 Intelligent AI Worker Matching Engine</h1>
            <p>Multi-factor ranking analyzing skills overlap, distance, verified ratings, and real-time availability</p>
          </div>

          <Link to="/business-dashboard" className="logout-btn">
            Back to Dashboard
          </Link>
        </div>

        {/* Selected Job Requirements Summary */}
        <div className="job-section mb-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs uppercase font-bold text-blue-600">Active Matching Target</span>
              <h2 style={{ margin: "4px 0" }}>{job.title}</h2>
              <p className="text-sm text-slate-600">
                📍 {job.location} &nbsp; • &nbsp; ₹{job.salary}/day &nbsp; • &nbsp; {job.jobType} &nbsp; • &nbsp; {job.workers} Workers Needed
              </p>
            </div>
            <Link to="/post-job" className="secondary-btn text-xs">
              Change Criteria
            </Link>
          </div>
          <div className="mt-2 text-xs bg-blue-50 text-blue-800 p-2.5 rounded-lg">
            <strong>Required Skills Filter:</strong> {job.skills}
          </div>
        </div>

        {/* Ranked Workers */}
        <div className="job-section">
          <h2>Top AI Recommended Verified Workers</h2>

          {rankedWorkers.map((worker, index) => {
            const isHired = hiredWorkers.includes(worker.name);

            return (
              <div className="job-card" key={worker.id}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rank-badge">#{index + 1}</span>
                    <h3 style={{ margin: 0 }}>{worker.name}</h3>
                    {worker.verified && (
                      <span className="badge-verified">
                        <ShieldCheck size={13} /> Aadhaar Verified
                      </span>
                    )}
                  </div>

                  <p className="mt-2">
                    Skills: <strong>{worker.skills}</strong>
                  </p>

                  <p className="text-xs text-slate-500">
                    Experience: {worker.experience} Years • 📍 {worker.location} • Rating: {worker.rating} ⭐
                  </p>

                  <p className="text-xs mt-1">
                    Availability:{" "}
                    {worker.available ? (
                      <span className="text-emerald-600 font-bold">Immediate ✅</span>
                    ) : (
                      <span className="text-rose-500 font-bold">On Active Shift ❌</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <span className="text-xs text-slate-500 font-semibold">AI Match Score</span>
                    <h2 className="text-blue-600 m-0">{worker.score}%</h2>
                  </div>

                  <button
                    onClick={() => setChatWorker(worker.name)}
                    className="icon-action-btn"
                    title={`Message ${worker.name}`}
                  >
                    <MessageSquare size={16} />
                  </button>

                  <button
                    onClick={() => handleHire(worker.name)}
                    disabled={isHired || !worker.available}
                    className={isHired ? "applied-btn" : "primary-btn"}
                  >
                    {isHired ? "Hired ✓" : "Hire Worker"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {chatWorker && (
        <ChatModal
          recipientName={chatWorker}
          onClose={() => setChatWorker(null)}
        />
      )}
    </div>
  );
}
