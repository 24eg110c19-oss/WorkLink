import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  ShieldCheck,
  QrCode,
  Mic,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Star,
  Users,
  Building,
  CheckCircle2
} from "lucide-react";
import Navbar from "./components/Navbar";
import { translations } from "./translations";

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations.en;

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-sos">
              <Zap size={14} /> AI-Powered Local Workforce Platform
            </span>
          </div>

          <h2>{t.tagline}</h2>

          <p>{t.subtagline}</p>

          <div className="buttons">
            <Link to="/jobs" className="primary-btn">
              {t.findJobs} <ArrowRight size={16} />
            </Link>
            <Link to="/post-job" className="secondary-btn">
              {t.postJob}
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-8 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} className="text-emerald-500" /> Aadhaar Verified
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} className="text-emerald-500" /> QR Attendance
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} className="text-emerald-500" /> Daily UPI Wage
            </span>
          </div>
        </div>

        {/* Live Matching Visual Widget */}
        <div className="hero-card">
          <div className="flex justify-between items-center mb-3">
            <h3 style={{ margin: 0 }}>⚡ Live AI Matching</h3>
            <span className="badge-match">Real-time</span>
          </div>

          <div className="match">
            <div>
              <div className="flex items-center gap-2">
                <strong>Ravi Kumar</strong>
                <span className="badge-verified">Verified</span>
              </div>
              <p>Head Waiter • Banjara Hills, Hyderabad</p>
            </div>
            <span>98%</span>
          </div>

          <div className="match">
            <div>
              <div className="flex items-center gap-2">
                <strong>Arun Kumar</strong>
                <span className="badge-verified">Verified</span>
              </div>
              <p>Catering Supervisor • Madhapur</p>
            </div>
            <span>94%</span>
          </div>

          <div className="match">
            <div>
              <div className="flex items-center gap-2">
                <strong>Mahesh Goud</strong>
                <span className="badge-verified">Verified</span>
              </div>
              <p>Banquet Staff • Gachibowli</p>
            </div>
            <span>91%</span>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-emerald-600 font-semibold">● 142 Active Shifts Nearby</span>
            <Link to="/ai-matching" className="text-blue-600 font-bold hover:underline">
              Test Match Engine →
            </Link>
          </div>
        </div>
      </section>

      {/* Core Platform Features Grid */}
      <section className="features-grid-section">
        <div className="section-title text-center">
          <h2>Everything Businesses & Local Workers Need</h2>
          <p>Built for restaurants, banquet halls, hotels, supermarkets, and event organizers.</p>
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-icon bg-blue-100 text-blue-600">
              <Zap size={24} />
            </div>
            <h3>Intelligent AI Matching</h3>
            <p>
              Analyzes skills, past employer ratings, geographic proximity, and live schedule availability to recommend the best candidates.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon bg-amber-100 text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <h3>Emergency Staff SOS</h3>
            <p>
              Need staff in 2 hours? Broadcast urgent requirements with 1.5x surge pay and automatic standby worker matching.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon bg-purple-100 text-purple-600">
              <Mic size={24} />
            </div>
            <h3>Voice-Based Profile Setup</h3>
            <p>
              Barrier-free audio onboarding in Telugu, Hindi, or English so skilled workers can speak to create complete profiles.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon bg-emerald-100 text-emerald-600">
              <QrCode size={24} />
            </div>
            <h3>QR-Based Attendance</h3>
            <p>
              Touchless check-in and check-out with GPS geo-fencing to guarantee accurate work hour tracking and zero proxy attendance.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon bg-teal-100 text-teal-600">
              <DollarSign size={24} />
            </div>
            <h3>Instant Payouts & Payroll</h3>
            <p>
              Direct UPI and IMPS wage settlements at shift completion with transparent ledger tracking and zero hidden deductions.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon bg-indigo-100 text-indigo-600">
              <ShieldCheck size={24} />
            </div>
            <h3>KYC & Verified Trust</h3>
            <p>
              Aadhaar-verified worker profiles and GSTIN-verified businesses with bidirectional ratings and reviews.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <footer className="footer-cta">
        <div className="footer-cta-content">
          <h2>Ready to Transform Local Workforce Hiring?</h2>
          <p>Join thousands of businesses and skilled professionals on WorkLink today.</p>
          <div className="flex gap-4 justify-center mt-6">
            <Link to="/register" className="primary-btn">
              Create Free Account
            </Link>
            <Link to="/login" className="secondary-btn bg-white">
              Login to WorkLink
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}