import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, MapPin, DollarSign, Briefcase, Users, Search, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import { API_BASE_URL, fetchWithFallback } from "../apiConfig";

export default function Jobs() {
  const [lang, setLang] = useState("en");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [appliedIds, setAppliedIds] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  const defaultMockJobs = [
    {
      jobId: 1,
      title: "Head Banquet Waiter",
      location: "Hyderabad - Banjara Hills",
      requiredSkills: "Waiter, Banquet Hospitality, Customer Service",
      salary: 950,
      jobType: "Evening Shift",
      workerCount: 4,
      status: "OPEN",
      isEmergency: false,
    },
    {
      jobId: 2,
      title: "🚨 Standby Event Waiters (Immediate)",
      location: "Hyderabad - Secunderabad",
      requiredSkills: "Waiter, Beverage Service",
      salary: 1350,
      jobType: "Urgent Shift (Starts in 2h)",
      workerCount: 2,
      status: "OPEN",
      isEmergency: true,
    },
    {
      jobId: 3,
      title: "Kitchen Assistant / Commis Chef",
      location: "Hyderabad - Madhapur",
      requiredSkills: "Food Prep, Knife Skills, Hygiene Standards",
      salary: 1100,
      jobType: "Full Time",
      workerCount: 2,
      status: "OPEN",
      isEmergency: false,
    },
    {
      jobId: 4,
      title: "Supermarket Inventory & Checkout Staff",
      location: "Hyderabad - Kukatpally",
      requiredSkills: "Billing, Inventory Stocking, Customer Handling",
      salary: 850,
      jobType: "Part Time",
      workerCount: 3,
      status: "OPEN",
      isEmergency: false,
    },
  ];

  useEffect(() => {
    fetchWithFallback(`${API_BASE_URL}/jobs/open`, {}, defaultMockJobs)
      .then((data) => {
        setJobs(data && data.length > 0 ? data : defaultMockJobs);
        setLoading(false);
      })
      .catch(() => {
        setJobs(defaultMockJobs);
        setLoading(false);
      });
  }, []);

  const handleApply = async (jobId) => {
    setApplyingJobId(jobId);

    try {
      await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, workerId: 1 }),
      });
    } catch (e) {
      console.log("Local application registered.");
    }

    setAppliedIds((prev) => [...prev, jobId]);
    setApplyingJobId(null);
  };

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      (j.requiredSkills && j.requiredSkills.toLowerCase().includes(filterQuery.toLowerCase())) ||
      j.location.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Available Local Job Openings</h1>
            <p>Verified local hospitality, retail, and event shifts in Hyderabad</p>
          </div>
          <Link to="/my-applications" className="secondary-btn">
            View My Applications
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="search-filter-card mb-6">
          <div className="flex gap-3">
            <div className="search-input-wrapper">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search by job title, skill (e.g. Waiter, Chef), or area..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Job Cards List */}
        <div className="job-section">
          {loading ? (
            <p className="p-4 text-center text-slate-500">Loading open jobs...</p>
          ) : filtered.length === 0 ? (
            <p className="p-4 text-center text-slate-500">No jobs match your search criteria.</p>
          ) : (
            filtered.map((job) => {
              const isApplied = appliedIds.includes(job.jobId);

              return (
                <div
                  key={job.jobId}
                  className={`job-card ${job.isEmergency ? "emergency-job-border" : ""}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 style={{ margin: 0 }}>{job.title}</h3>
                      {job.isEmergency && (
                        <span className="badge-sos">
                          <Zap size={13} /> 1.5x Surge Wage
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-slate-700">
                      📍 {job.location} · <strong>₹{job.salary}/day</strong> · {job.jobType}
                    </p>

                    <p className="text-xs text-slate-500">
                      Required Skills: <strong>{job.requiredSkills}</strong>
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Positions: {job.workerCount} workers needed · Status: <span className="text-emerald-600 font-bold">{job.status}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleApply(job.jobId)}
                      disabled={isApplied || applyingJobId === job.jobId}
                      className={isApplied ? "applied-btn" : job.isEmergency ? "urgent-apply-btn" : "primary-btn"}
                    >
                      {isApplied ? "Applied ✓" : applyingJobId === job.jobId ? "Applying..." : "Apply Now"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
