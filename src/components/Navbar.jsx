import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle,
  Globe,
  ShieldCheck,
  Zap,
  MessageSquare,
  DollarSign,
  User,
  LogOut,
  QrCode
} from "lucide-react";
import { translations } from "../translations";

export default function Navbar({ lang = "en", setLang }) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [userRole, setUserRole] = useState(() => localStorage.getItem("worklinkRole") || "BUSINESS");
  const t = translations[lang] || translations.en;

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "🚨 Emergency Staff Needed Nearby!",
      message: "Paradise Restaurant urgently needs 2 Waiters. 1.5x Surge ₹1,200/day. Immediate reporting.",
      time: "5 mins ago",
      type: "emergency",
      read: false,
    },
    {
      id: 2,
      title: "Application Accepted!",
      message: "Grand Palace Hotel accepted your application for Banquet Staff.",
      time: "25 mins ago",
      type: "success",
      read: false,
    },
    {
      id: 3,
      title: "Payment Received: ₹1,000",
      message: "Daily wage settlement completed for Royal Caterers shift.",
      time: "1 hour ago",
      type: "payment",
      read: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("worklinkToken");
    localStorage.removeItem("worklinkRole");
    navigate("/login");
  };

  return (
    <header className="navbar-custom">
      <div className="nav-container">
        {/* Brand */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <Zap size={22} className="brand-bolt" />
          </div>
          <div>
            <span className="brand-name">{t.brand}</span>
            <span className="brand-badge">AI Powered</span>
          </div>
        </Link>

        {/* Verification Pill */}
        <div className="verification-pill">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>{userRole === "BUSINESS" ? t.verifiedBusiness : t.verifiedWorker}</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <Link to="/">{t.brand}</Link>
          <Link to="/jobs">{t.findJobs}</Link>
          <Link to="/ai-matching">{t.aiMatching}</Link>
          <Link to="/attendance">
            <span className="flex items-center gap-1">
              <QrCode size={15} /> {t.attendance}
            </span>
          </Link>
          <Link to="/business-dashboard">{t.businessDashboard}</Link>
          <Link to="/worker-dashboard">{t.workerDashboard}</Link>
        </nav>

        {/* Right Tools: Language, Notifications, Logout */}
        <div className="nav-tools">
          {/* Language Switcher */}
          <div className="lang-switcher">
            <Globe size={16} />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="lang-select"
              title="Select Language"
            >
              <option value="en">English (EN)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="hi">हिंदी (Hindi)</option>
            </select>
          </div>

          {/* Notifications Dropdown */}
          <div className="notification-wrapper">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="notification-btn"
              title="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>{t.notifications}</h4>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="mark-read-btn">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="notification-list">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`notification-item ${!n.read ? "unread" : ""}`}
                    >
                      <div className="notification-item-title">
                        <strong>{n.title}</strong>
                        <span className="notification-time">{n.time}</span>
                      </div>
                      <p>{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role / Logout */}
          <button
            onClick={() => {
              const nextRole = userRole === "BUSINESS" ? "WORKER" : "BUSINESS";
              setUserRole(nextRole);
              localStorage.setItem("worklinkRole", nextRole);
              navigate(nextRole === "BUSINESS" ? "/business-dashboard" : "/worker-dashboard");
            }}
            className="role-toggle-btn"
            title="Toggle between Business and Worker preview"
          >
            Role: <strong>{userRole}</strong>
          </button>

          <button onClick={handleLogout} className="logout-icon-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
