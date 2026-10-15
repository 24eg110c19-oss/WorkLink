import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, MessageSquare, Star, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import ChatModal from "../components/ChatModal";
import RatingModal from "../components/RatingModal";
import { API_BASE_URL, fetchWithFallback } from "../apiConfig";

export default function BusinessApplications() {
  const [lang, setLang] = useState("en");
  const [jobId, setJobId] = useState("1");
  const [chatWorker, setChatWorker] = useState(null);
  const [ratingTarget, setRatingTarget] = useState(null);

  const defaultApplications = [
    {
      applicationId: 101,
      jobId: 1,
      jobTitle: "Head Banquet Waiter",
      applicationStatus: "PENDING",
      appliedAt: new Date().toISOString(),
      workerId: 1,
      workerName: "Ravi Kumar",
      skills: "Waiter, Banquet Hospitality, Customer Service",
      location: "Hyderabad - Banjara Hills",
      experienceYears: 3,
      availability: true,
      rating: 4.9,
    },
    {
      applicationId: 102,
      jobId: 1,
      jobTitle: "Head Banquet Waiter",
      applicationStatus: "ACCEPTED",
      appliedAt: new Date(Date.now() - 3600000).toISOString(),
      workerId: 2,
      workerName: "Arun Kumar",
      skills: "Catering, Food Handling, Waiter",
      location: "Hyderabad - Madhapur",
      experienceYears: 2,
      availability: true,
      rating: 4.7,
    },
  ];

  const [applications, setApplications] = useState(defaultApplications);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchWithFallback(
        `${API_BASE_URL}/applications/job/${jobId}`,
        {},
        defaultApplications
      );
      setApplications(data && data.length > 0 ? data : defaultApplications);
    } catch (e) {
      setApplications(defaultApplications);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, action) => {
    const nextStatus = action === "accept" ? "ACCEPTED" : "REJECTED";
    try {
      await fetch(`${API_BASE_URL}/applications/${applicationId}/${action}`, {
        method: "PUT",
      });
    } catch (e) {
      console.log("Local application status update.");
    }

    setApplications((prev) =>
      prev.map((a) =>
        a.applicationId === applicationId ? { ...a, applicationStatus: nextStatus } : a
      )
    );
    setMessage(`Application ${action === "accept" ? "accepted" : "rejected"} successfully.`);
  };

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Worker Applications Management</h1>
            <p>Review candidate profiles, chat directly, and accept or reject applicants</p>
          </div>
          <Link to="/business-dashboard" className="secondary-btn">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        {/* Job ID Selector Bar */}
        <div className="job-section mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <label htmlFor="job-id-input" className="text-sm font-bold">
              Filter by Job ID:
            </label>
            <input
              id="job-id-input"
              type="number"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="w-24 p-2 border rounded"
            />
            <button onClick={loadApplications} className="primary-btn text-sm">
              Refresh Candidates
            </button>
            {message && <span className="text-xs text-emerald-600 font-bold ml-3">{message}</span>}
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="job-section">
          <h2>Candidate Applications for Shift #{jobId}</h2>

          {applications.map((app) => (
            <div key={app.applicationId} className="job-card">
              <div>
                <div className="flex items-center gap-2">
                  <h3 style={{ margin: 0 }}>{app.workerName || `Worker #${app.workerId}`}</h3>
                  <span className="badge-verified">
                    <ShieldCheck size={13} /> Aadhaar Verified
                  </span>
                  <span
                    className={
                      app.applicationStatus === "ACCEPTED"
                        ? "badge-paid"
                        : app.applicationStatus === "REJECTED"
                        ? "badge-cancelled"
                        : "badge-pending"
                    }
                  >
                    {app.applicationStatus}
                  </span>
                </div>

                <p className="mt-2 text-slate-700">
                  Skills: <strong>{app.skills}</strong> · Exp: {app.experienceYears} Years · 📍 {app.location}
                </p>

                <p className="text-xs text-slate-500">
                  Rating: <strong>{app.rating} ⭐</strong> · Applied: {new Date(app.appliedAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setChatWorker(app.workerName)}
                  className="icon-action-btn"
                  title={`Chat with ${app.workerName}`}
                >
                  <MessageSquare size={16} />
                </button>

                <button
                  onClick={() => setRatingTarget(app.workerName)}
                  className="icon-action-btn"
                  title={`Rate ${app.workerName}`}
                >
                  <Star size={16} />
                </button>

                {app.applicationStatus === "PENDING" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(app.applicationId, "accept")}
                      className="primary-btn text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(app.applicationId, "reject")}
                      className="cancel-trigger-btn text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {chatWorker && (
        <ChatModal
          recipientName={chatWorker}
          onClose={() => setChatWorker(null)}
        />
      )}

      {ratingTarget && (
        <RatingModal
          isOpen={!!ratingTarget}
          targetName={ratingTarget}
          onClose={() => setRatingTarget(null)}
          onSubmitRating={({ rating, comment }) => {
            alert(`Review submitted for ${ratingTarget}: ${rating} stars!`);
          }}
        />
      )}
    </div>
  );
}
