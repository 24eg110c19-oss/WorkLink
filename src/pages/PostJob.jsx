import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Briefcase, Plus, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../apiConfig";

export default function PostJob() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");

  const [job, setJob] = useState({
    title: "",
    skills: "",
    location: "",
    salary: "",
    jobType: "Full Time",
    workers: "2",
    startDate: new Date().toISOString().split("T")[0],
    shiftTime: "Morning (9 AM - 6 PM)",
    description: "",
    isEmergency: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJob({
      ...job,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Persist locally for immediate demo & AI matching
    localStorage.setItem("worklinkJob", JSON.stringify(job));

    // Try posting to Spring Boot backend if available
    try {
      await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: 1,
          title: job.title,
          requiredSkills: job.skills,
          location: job.location,
          salary: parseFloat(job.salary) || 800,
          jobType: job.jobType,
          workerCount: parseInt(job.workers, 10) || 1,
          status: "OPEN",
        }),
      });
    } catch (err) {
      console.log("Backend offline or local demo mode, proceeding with AI matching.");
    } finally {
      setLoading(false);
      navigate("/ai-matching");
    }
  };

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <div className="auth-page py-8">
        <div className="auth-box max-w-xl w-full">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/business-dashboard" className="text-slate-500 hover:text-blue-600">
              <ArrowLeft size={18} />
            </Link>
            <h2 style={{ margin: 0 }}>Post Staff Requirement</h2>
          </div>

          <p>Create job requirements to automatically trigger intelligent AI worker matching</p>

          <form onSubmit={handleSubmit}>
            {/* Emergency Staff Requirement Toggle */}
            <div className="emergency-checkbox-container">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isEmergency"
                  checked={job.isEmergency}
                  onChange={handleChange}
                  className="w-5 h-5 accent-red-600 cursor-pointer"
                />
                <div>
                  <strong className="text-red-600 flex items-center gap-1">
                    <Zap size={16} /> Mark as Emergency Requirement (SOS Surge 1.5x)
                  </strong>
                  <span className="text-xs text-slate-500 block">
                    Fast-tracks matching & alerts verified workers within 5km for immediate reporting.
                  </span>
                </div>
              </label>
            </div>

            <label className="block text-xs font-semibold text-slate-700 mt-3 mb-1">
              Job Title / Role *
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Head Banquet Waiter, Kitchen Commis, Supermarket Cashier"
              value={job.title}
              onChange={handleChange}
              required
            />

            <label className="block text-xs font-semibold text-slate-700 mt-2 mb-1">
              Required Skills (comma separated) *
            </label>
            <input
              type="text"
              name="skills"
              placeholder="e.g. Waiter, Customer Service, Beverage Handling"
              value={job.skills}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mt-2 mb-1">
                  Location / Area *
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Banjara Hills, Hyderabad"
                  value={job.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mt-2 mb-1">
                  Daily Wage (₹/day) *
                </label>
                <input
                  type="number"
                  name="salary"
                  placeholder="800"
                  value={job.salary}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mt-2 mb-1">
                  Job Type *
                </label>
                <select
                  name="jobType"
                  value={job.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="Temporary Shift">Temporary Shift (1-3 Days)</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Weekend Urgent">Weekend Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mt-2 mb-1">
                  Workers Needed *
                </label>
                <input
                  type="number"
                  name="workers"
                  placeholder="2"
                  min="1"
                  value={job.workers}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mt-2 mb-1">
                  Shift Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={job.startDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mt-2 mb-1">
                  Shift Timing
                </label>
                <input
                  type="text"
                  name="shiftTime"
                  placeholder="e.g. 10:00 AM - 7:00 PM"
                  value={job.shiftTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="primary-btn w-full mt-4">
              {loading ? "Matching Workers..." : "Post Job & Run AI Matching"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
