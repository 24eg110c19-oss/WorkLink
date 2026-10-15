import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, XCircle, QrCode } from "lucide-react";
import Navbar from "../components/Navbar";
import { API_BASE_URL, fetchWithFallback } from "../apiConfig";

export default function MyApplications() {
  const [lang, setLang] = useState("en");

  const defaultApplications = [
    {
      applicationId: 201,
      jobTitle: "Head Banquet Waiter",
      location: "Hyderabad - Banjara Hills",
      requiredSkills: "Waiter, Banquet Hospitality",
      salary: 950,
      jobType: "Evening Shift",
      workersNeeded: 4,
      appliedAt: new Date().toISOString(),
      applicationStatus: "ACCEPTED",
    },
    {
      applicationId: 202,
      jobTitle: "Buffet Catering Assistant",
      location: "Hyderabad - Madhapur",
      requiredSkills: "Food Handling, Waiter",
      salary: 900,
      jobType: "Part Time",
      workersNeeded: 2,
      appliedAt: new Date(Date.now() - 86400000).toISOString(),
      applicationStatus: "PENDING",
    },
  ];

  const [applications, setApplications] = useState(defaultApplications);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWithFallback(`${API_BASE_URL}/applications/worker/1`, {}, defaultApplications)
      .then((data) => {
        setApplications(data && data.length > 0 ? data : defaultApplications);
      })
      .catch(() => {
        setApplications(defaultApplications);
      });
  }, []);

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>My Applied Shifts & Pipeline</h1>
            <p>Track acceptance status, reporting instructions, and QR check-in readiness</p>
          </div>
          <Link to="/worker-dashboard" className="secondary-btn">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        <div className="job-section">
          <h2>Application Status Overview</h2>

          {applications.map((app) => (
            <div key={app.applicationId} className="job-card">
              <div>
                <div className="flex items-center gap-2">
                  <h3 style={{ margin: 0 }}>{app.jobTitle}</h3>
                  <span
                    className={
                      app.applicationStatus === "ACCEPTED"
                        ? "badge-paid"
                        : app.applicationStatus === "REJECTED"
                        ? "badge-cancelled"
                        : "badge-pending"
                    }
                  >
                    {app.applicationStatus === "ACCEPTED" ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={13} /> Accepted
                      </span>
                    ) : app.applicationStatus === "REJECTED" ? (
                      <span className="flex items-center gap-1">
                        <XCircle size={13} /> Rejected
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> Under Review
                      </span>
                    )}
                  </span>
                </div>

                <p className="mt-2 text-slate-700">
                  📍 {app.location} · <strong>₹{app.salary}/day</strong> · Shift: {app.jobType}
                </p>

                <p className="text-xs text-slate-500">
                  Required: {app.requiredSkills} · Applied: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                {app.applicationStatus === "ACCEPTED" && (
                  <Link to="/attendance" className="primary-btn text-xs">
                    <QrCode size={14} /> Open QR Check-In
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
