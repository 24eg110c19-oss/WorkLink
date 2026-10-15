import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Star,
  Zap,
  Mic,
  QrCode,
  DollarSign,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Briefcase
} from "lucide-react";
import Navbar from "../components/Navbar";
import VoiceProfileModal from "../components/VoiceProfileModal";
import ChatModal from "../components/ChatModal";

export default function WorkerDashboard() {
  const [lang, setLang] = useState("en");
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [chatBusiness, setChatBusiness] = useState(null);

  const [workerProfile, setWorkerProfile] = useState({
    name: "Ravi Kumar",
    skills: "Head Waiter, Banquet Hospitality, Customer Service",
    experience: 3,
    location: "Hyderabad - Banjara Hills",
    rating: 4.9,
    verified: true,
  });

  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem("worklinkApplications");
    return saved ? JSON.parse(saved) : [{ id: 1, title: "Banquet Waiter", business: "ABC Grand", salary: 900 }];
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Head Banquet Waiter",
      business: "ABC Grand Hotel",
      location: "Hyderabad - Banjara Hills",
      salary: 950,
      type: "Evening Shift (5 PM - 11 PM)",
      match: 97.5,
      isEmergency: false,
    },
    {
      id: 2,
      title: "🚨 URGENT: 2 Standby Servers Needed",
      business: "Paradise Convention Center",
      location: "Hyderabad - Secunderabad",
      salary: 1350,
      type: "Immediate Shift (Starts in 1.5 hrs)",
      match: 95.0,
      isEmergency: true,
    },
    {
      id: 3,
      title: "Buffet Catering Assistant",
      business: "Royal Caterers",
      location: "Hyderabad - Madhapur",
      salary: 900,
      type: "Full Day (10 AM - 7 PM)",
      match: 91.2,
      isEmergency: false,
    },
  ]);

  const applyJob = (job) => {
    if (appliedJobs.some((item) => item.id === job.id)) return;
    const updated = [...appliedJobs, job];
    setAppliedJobs(updated);
    localStorage.setItem("worklinkApplications", JSON.stringify(updated));
    alert(`Application submitted to ${job.business} for ${job.title}!`);
  };

  const handleVoiceProfileUpdate = (parsedData) => {
    setWorkerProfile((prev) => ({
      ...prev,
      name: parsedData.fullName || prev.name,
      skills: parsedData.skills || prev.skills,
      experience: Number(parsedData.experienceYears) || prev.experience,
      location: parsedData.location || prev.location,
    }));
    alert("Profile successfully updated via AI Voice input!");
  };

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <main className="dashboard">
        {/* Worker Profile Header Card */}
        <div className="worker-profile-hero">
          <div className="flex items-center gap-4">
            <div className="avatar-circle">
              {workerProfile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2>{workerProfile.name}</h2>
                <span className="badge-verified">
                  <ShieldCheck size={14} /> Aadhaar & Skill Verified
                </span>
              </div>
              <p className="text-slate-600 m-0">
                Skills: <strong>{workerProfile.skills}</strong>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                📍 {workerProfile.location} · {workerProfile.experience} Years Exp · 4.9 ⭐ (42 Verified Shifts)
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setVoiceModalOpen(true)}
              className="voice-launch-btn"
            >
              <Mic size={18} /> Voice Profile Setup
            </button>
            <Link to="/attendance" className="primary-btn">
              <QrCode size={18} /> Clock In via QR
            </Link>
          </div>
        </div>

        {/* Dashboard Metric Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Jobs Matching You</h3>
            <h2>{jobs.length}</h2>
            <p>Filtered by skills & distance</p>
          </div>
          <div className="dashboard-card">
            <h3>Applied Shifts</h3>
            <h2>{appliedJobs.length}</h2>
            <p>Confirmed & in progress</p>
          </div>
          <div className="dashboard-card">
            <h3>Worker Rating</h3>
            <h2>4.9 ⭐</h2>
            <p>Top 5% Rated in Hyderabad</p>
          </div>
          <div className="dashboard-card">
            <h3>Earnings This Week</h3>
            <h2 className="text-emerald-600">₹6,800</h2>
            <Link to="/payments" className="text-xs text-blue-600 font-semibold">
              View Wage Settlements →
            </Link>
          </div>
        </div>

        {/* AI Recommended Jobs Feed */}
        <div className="job-section">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2>🤖 AI Matched Jobs & Urgent Requirements</h2>
              <p className="text-xs text-slate-500">
                Sorted by AI matching score, verified employers, and proximity to your location
              </p>
            </div>
            <Link to="/jobs" className="text-sm font-semibold text-blue-600">
              Browse All Jobs →
            </Link>
          </div>

          {jobs.map((job) => {
            const alreadyApplied = appliedJobs.some((item) => item.id === job.id);

            return (
              <div
                key={job.id}
                className={`job-card ${job.isEmergency ? "emergency-job-border" : ""}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3>{job.title}</h3>
                    {job.isEmergency && (
                      <span className="badge-sos">
                        <Zap size={13} /> 1.5x Surge Wage
                      </span>
                    )}
                  </div>
                  <p>
                    <strong>{job.business}</strong> · 📍 {job.location}
                  </p>
                  <p className="text-xs text-slate-500">
                    Shift: {job.type} · Daily Wage: <strong>₹{job.salary}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <span className="text-xs text-slate-500">AI Match</span>
                    <h3 className="text-emerald-600 m-0">{job.match}%</h3>
                  </div>

                  <button
                    onClick={() => setChatBusiness(job.business)}
                    className="icon-action-btn"
                    title="Message Employer"
                  >
                    <MessageSquare size={16} />
                  </button>

                  <button
                    onClick={() => applyJob(job)}
                    disabled={alreadyApplied}
                    className={alreadyApplied ? "applied-btn" : job.isEmergency ? "urgent-apply-btn" : "primary-btn"}
                  >
                    {alreadyApplied ? "Applied ✓" : job.isEmergency ? "Quick Accept Shift" : "Apply"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Voice Profile Creation Modal */}
      <VoiceProfileModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onProfileGenerated={handleVoiceProfileUpdate}
      />

      {/* In-App Chat Modal */}
      {chatBusiness && (
        <ChatModal
          recipientName={chatBusiness}
          onClose={() => setChatBusiness(null)}
        />
      )}
    </div>
  );
}