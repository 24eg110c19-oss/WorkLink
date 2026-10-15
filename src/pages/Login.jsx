import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, ShieldCheck, User, Building } from "lucide-react";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../apiConfig";

export default function Login() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");
  const [email, setEmail] = useState("business@worklink.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Invalid credentials.");
      }

      const role = result?.role || (email.includes("business") ? "BUSINESS" : "WORKER");
      localStorage.setItem("worklinkRole", role);
      if (result?.token) localStorage.setItem("worklinkToken", result.token);

      navigate(role === "BUSINESS" ? "/business-dashboard" : "/worker-dashboard");
    } catch (err) {
      // Fallback demo login
      const fallbackRole = email.includes("worker") ? "WORKER" : "BUSINESS";
      localStorage.setItem("worklinkRole", fallbackRole);
      navigate(fallbackRole === "BUSINESS" ? "/business-dashboard" : "/worker-dashboard");
    } finally {
      setLoading(false);
    }
  };

  const setDemoWorker = () => {
    setEmail("worker@worklink.com");
    setPassword("password123");
  };

  const setDemoBusiness = () => {
    setEmail("business@worklink.com");
    setPassword("password123");
  };

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <div className="auth-page py-10">
        <div className="auth-box max-w-md w-full">
          <div className="text-center mb-6">
            <h2 style={{ margin: "0 0 6px" }}>Welcome Back to WorkLink</h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
              Sign in to manage jobs, attendance, and local workforce matching
            </p>
          </div>

          {/* Quick Demo Credentials Banner */}
          <div className="demo-credentials-banner mb-4">
            <span className="text-xs font-bold text-slate-600 block mb-1">Quick 1-Click Demo Login:</span>
            <div className="flex gap-2">
              <button type="button" onClick={setDemoBusiness} className="demo-btn">
                <Building size={14} /> As Business
              </button>
              <button type="button" onClick={setDemoWorker} className="demo-btn">
                <User size={14} /> As Worker
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <label className="input-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-xs text-rose-600 font-semibold mb-2">{error}</p>}

            <button type="submit" disabled={loading} className="primary-btn w-full mt-2">
              {loading ? "Authenticating..." : "Sign In to WorkLink"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-bold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}