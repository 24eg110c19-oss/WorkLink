import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Zap,
  MessageSquare,
  QrCode,
  DollarSign,
  ShieldCheck,
  Star,
  Users,
  Briefcase,
  CheckCircle,
  Plus
} from "lucide-react";
import Navbar from "../components/Navbar";
import ChatModal from "../components/ChatModal";
import AutoReplacementModal from "../components/AutoReplacementModal";
import RatingModal from "../components/RatingModal";

export default function BusinessDashboard() {
  const [lang, setLang] = useState("en");
  const [chatWorker, setChatWorker] = useState(null);
  const [ratingTarget, setRatingTarget] = useState(null);
  const [replacementModalOpen, setReplacementModalOpen] = useState(false);
  const [cancelledWorkerName, setCancelledWorkerName] = useState("Suresh Kumar");
  const [emergencySOSActive, setEmergencySOSActive] = useState(false);

  const [hiredWorkers, setHiredWorkers] = useState(["Ravi Kumar"]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      job: "Head Waiter",
      location: "Hyderabad - Banjara Hills",
      rating: 4.9,
      match: 95.8,
      experience: "3 Years",
      status: "HIRED",
      verified: true,
    },
    {
      id: 2,
      name: "Arun Kumar",
      job: "Catering Supervisor",
      location: "Hyderabad - Madhapur",
      rating: 4.7,
      match: 91.4,
      experience: "2 Years",
      status: "PENDING",
      verified: true,
    },
    {
      id: 3,
      name: "Suresh Kumar",
      job: "Kitchen Assistant",
      location: "Hyderabad - Secunderabad",
      rating: 4.5,
      match: 87.6,
      experience: "1 Year",
      status: "CANCELLED",
      verified: true,
    },
  ]);

  const hireWorker = (worker) => {
    setHiredWorkers((prev) => [...prev, worker.name]);
    setApplications((prev) =>
      prev.map((a) => (a.id === worker.id ? { ...a, status: "HIRED" } : a))
    );
  };

  const triggerCancellationAndReplace = (worker) => {
    setCancelledWorkerName(worker.name);
    setApplications((prev) =>
      prev.map((a) => (a.id === worker.id ? { ...a, status: "CANCELLED" } : a))
    );
    setReplacementModalOpen(true);
  };

  const handleReplacementSuccess = (replacementWorker) => {
    setApplications((prev) => [
      {
        id: Date.now(),
        name: replacementWorker.name,
        job: "Kitchen Assistant (Standby Replaced)",
        location: replacementWorker.distance,
        rating: replacementWorker.rating,
        match: replacementWorker.matchScore,
        experience: "3 Years",
        status: "HIRED",
        verified: true,
      },
      ...prev,
    ]);
    setHiredWorkers((prev) => [...prev, replacementWorker.name]);
  };

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <main className="dashboard">
        {/* Top Header */}
        <div className="dashboard-header">
          <div>
            <h1>Business Command Center</h1>
            <p>Manage your workforce, real-time hiring, attendance, and instant replacements</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEmergencySOSActive(!emergencySOSActive)}
              className={`sos-toggle-btn ${emergencySOSActive ? "active" : ""}`}
            >
              <Zap size={18} />
              {emergencySOSActive ? "Emergency SOS Active (Surge 1.5x)" : "Trigger Emergency Staff SOS"}
            </button>
            <Link to="/post-job" className="primary-btn">
              <Plus size={18} /> Post New Job
            </Link>
          </div>
        </div>

        {/* Emergency Banner when active */}
        {emergencySOSActive && (
          <div className="emergency-banner-pulse">
            <div className="flex items-center gap-3">
              <span className="beacon-dot"></span>
              <div>
                <strong>🚨 Emergency Hiring Beacon Active!</strong>
                <p style={{ margin: 0, fontSize: "13px" }}>
                  Broadcasting urgent opening to 48 verified workers within 5km radius. 1.5x wage multiplier applied.
                </p>
              </div>
            </div>
            <Link to="/ai-matching" className="primary-btn text-sm">
              View Instant Responders
            </Link>
          </div>
        )}

        {/* Quick Action Navigation Strip */}
        <div className="quick-actions-strip">
          <Link to="/attendance" className="quick-action-pill">
            <QrCode size={16} /> QR Attendance
          </Link>
          <Link to="/payments" className="quick-action-pill">
            <DollarSign size={16} /> Payments & Wage Settlement
          </Link>
          <Link to="/business-applications" className="quick-action-pill">
            <Users size={16} /> Application Reviews
          </Link>
          <Link to="/ai-matching" className="quick-action-pill">
            <Zap size={16} /> AI Match Engine
          </Link>
        </div>

        {/* Dashboard Metrics */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Active Job Openings</h3>
            <h2>4 Open</h2>
            <p>Waiters, Chefs & Event Staff</p>
          </div>
          <div className="dashboard-card">
            <h3>Applications Received</h3>
            <h2>{applications.length} Profiles</h2>
            <p>Intelligently ranked by AI</p>
          </div>
          <div className="dashboard-card">
            <h3>Workers On Duty</h3>
            <h2>{hiredWorkers.length} Active</h2>
            <p>Clocked in via QR Attendance</p>
          </div>
          <div className="dashboard-card">
            <h3>Employer Reliability</h3>
            <h2>4.9 ⭐</h2>
            <p>100% Instant Payout Rating</p>
          </div>
        </div>

        {/* Active Job Postings */}
        <div className="job-section mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2>Active Requirements Posted</h2>
            <Link to="/post-job" className="text-sm font-semibold text-blue-600">
              + Add another requirement
            </Link>
          </div>

          <div className="job-card">
            <div>
              <div className="flex items-center gap-2">
                <h3>Banquet Waiters & Servers</h3>
                <span className="badge-verified">Verified Venue</span>
              </div>
              <p>📍 Hyderabad - Gachibowli · ₹900/day · 4 Workers Needed</p>
              <p className="text-xs text-slate-500">Skills: Customer Service, Banquet Service, Tray Handling</p>
            </div>
            <div className="flex gap-2">
              <Link to="/ai-matching" className="secondary-btn text-sm">
                AI Match Workers
              </Link>
              <Link to="/business-applications" className="primary-btn text-sm">
                View Applicants (12)
              </Link>
            </div>
          </div>

          <div className="job-card">
            <div>
              <div className="flex items-center gap-2">
                <h3>Kitchen Assistant / Commis Chef</h3>
                <span className="badge-verified">Verified Venue</span>
              </div>
              <p>📍 Hyderabad - Madhapur · ₹1,100/day · 2 Workers Needed</p>
              <p className="text-xs text-slate-500">Skills: Food Prep, Knife Skills, Hygiene Standards</p>
            </div>
            <div className="flex gap-2">
              <Link to="/ai-matching" className="secondary-btn text-sm">
                AI Match Workers
              </Link>
              <Link to="/business-applications" className="primary-btn text-sm">
                View Applicants (8)
              </Link>
            </div>
          </div>
        </div>

        {/* Worker Applications & Last-Minute Replacement Panel */}
        <div className="job-section">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2>👥 Managed Workers & Application Pipeline</h2>
              <p className="text-xs text-slate-500">
                Direct in-app messaging, rating submission, and automatic standby replacement
              </p>
            </div>
            <button
              onClick={() => setReplacementModalOpen(true)}
              className="text-xs bg-amber-50 text-amber-700 border border-amber-300 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 hover:bg-amber-100"
            >
              <AlertTriangle size={14} /> Test Auto-Replacement
            </button>
          </div>

          {applications.map((worker) => {
            const isHired = worker.status === "HIRED";
            const isCancelled = worker.status === "CANCELLED";

            return (
              <div key={worker.id} className="job-card">
                <div>
                  <div className="flex items-center gap-2">
                    <h3>{worker.name}</h3>
                    {worker.verified && (
                      <span className="badge-verified">
                        <ShieldCheck size={12} /> KYC Verified
                      </span>
                    )}
                    {isCancelled && (
                      <span className="badge-cancelled">
                        Cancelled Last-Minute
                      </span>
                    )}
                    {isHired && (
                      <span className="badge-paid">
                        <CheckCircle size={12} /> Hired & Confirmed
                      </span>
                    )}
                  </div>
                  <p>Target Role: <strong>{worker.job}</strong></p>
                  <p className="text-xs text-slate-500">
                    📍 {worker.location} · Exp: {worker.experience} · Rating: {worker.rating} ⭐
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <span className="text-sm font-semibold text-slate-500">AI Match</span>
                    <h3 className="text-blue-600 m-0">{worker.match}%</h3>
                  </div>

                  {/* Chat button */}
                  <button
                    onClick={() => setChatWorker(worker.name)}
                    className="icon-action-btn"
                    title={`Chat with ${worker.name}`}
                  >
                    <MessageSquare size={16} />
                  </button>

                  {/* Rating button */}
                  {isHired && (
                    <button
                      onClick={() => setRatingTarget(worker.name)}
                      className="icon-action-btn"
                      title={`Submit rating for ${worker.name}`}
                    >
                      <Star size={16} />
                    </button>
                  )}

                  {/* Hire / Replace Actions */}
                  {isCancelled ? (
                    <button
                      onClick={() => {
                        setCancelledWorkerName(worker.name);
                        setReplacementModalOpen(true);
                      }}
                      className="replace-btn"
                    >
                      <AlertTriangle size={15} /> Auto-Replace
                    </button>
                  ) : (
                    <button
                      onClick={() => (isHired ? triggerCancellationAndReplace(worker) : hireWorker(worker))}
                      className={isHired ? "cancel-trigger-btn" : "primary-btn"}
                    >
                      {isHired ? "Simulate Cancel" : "Hire Worker"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* In-App Chat Modal */}
      {chatWorker && (
        <ChatModal
          recipientName={chatWorker}
          onClose={() => setChatWorker(null)}
        />
      )}

      {/* Auto Replacement Modal */}
      <AutoReplacementModal
        isOpen={replacementModalOpen}
        onClose={() => setReplacementModalOpen(false)}
        cancelledWorker={cancelledWorkerName}
        jobTitle="Kitchen Assistant"
        onReplaced={handleReplacementSuccess}
      />

      {/* Rating & Review Modal */}
      <RatingModal
        isOpen={!!ratingTarget}
        targetName={ratingTarget || ""}
        onClose={() => setRatingTarget(null)}
        onSubmitRating={({ rating, comment }) => {
          alert(`Review saved! ${ratingTarget} received ${rating} stars: "${comment}"`);
        }}
      />
    </div>
  );
}