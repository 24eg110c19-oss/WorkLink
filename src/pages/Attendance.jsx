import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";
import { QrCode, CheckCircle2, Clock, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Attendance() {
  const [lang, setLang] = useState("en");
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [shiftHours, setShiftHours] = useState(0);

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      worker: "Ravi Kumar",
      job: "Waiter - ABC Grand",
      date: "Today",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      totalHours: "8 hrs",
      status: "VERIFIED",
      earned: "₹800",
    },
    {
      id: 2,
      worker: "Arun Kumar",
      job: "Catering Staff - Paradise Hall",
      date: "Yesterday",
      clockIn: "10:00 AM",
      clockOut: "07:00 PM",
      totalHours: "9 hrs",
      status: "VERIFIED",
      earned: "₹950",
    },
  ]);

  const qrValue = JSON.stringify({
    system: "WorkLink-QR-Attendance",
    workerId: "W-1042",
    workerName: "Ravi Kumar",
    jobId: "J-501",
    location: "Hyderabad - Banjara Hills",
    timestamp: new Date().toISOString(),
  });

  const handleClockIn = () => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setClockedIn(true);
    setClockInTime(time);
    setClockOutTime(null);
  };

  const handleClockOut = () => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setClockOutTime(time);
    setClockedIn(false);
    setShiftHours(8);

    setAttendanceRecords((prev) => [
      {
        id: Date.now(),
        worker: "Ravi Kumar",
        job: "Waiter - ABC Grand",
        date: "Today",
        clockIn: clockInTime || "09:30 AM",
        clockOut: time,
        totalHours: "8 hrs",
        status: "VERIFIED",
        earned: "₹800",
      },
      ...prev,
    ]);
  };

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>📱 Smart QR Attendance & Geo-Verification</h1>
            <p>Touchless QR check-in & check-out with automatic wage calculation</p>
          </div>
          <Link to="/business-dashboard" className="logout-btn">
            Back to Dashboard
          </Link>
        </div>

        <div className="grid-2-col">
          {/* QR Generator & Scanner Card */}
          <div className="job-section text-center">
            <h2>Worker Check-In Terminal</h2>
            <p className="text-slate-600 mb-4">
              Scan this dynamic QR code at the business venue to record time and location.
            </p>

            <div className="qr-container">
              <QRCodeCanvas value={qrValue} size={220} level="H" includeMargin />
            </div>

            <div className="mt-4">
              <h3 style={{ margin: "8px 0" }}>Ravi Kumar</h3>
              <p style={{ margin: 0, color: "#64748b" }}>
                Role: <strong>Head Waiter</strong> · Venue: <strong>ABC Grand Banquet</strong>
              </p>
              <div className="flex justify-center items-center gap-2 mt-2 text-xs text-emerald-600 font-semibold">
                <MapPin size={14} /> GPS Geo-Fence: Within 50 meters of Venue Verified
              </div>
            </div>

            <div className="attendance-action-box">
              {!clockedIn && !clockOutTime && (
                <button onClick={handleClockIn} className="primary-btn w-full">
                  <Clock size={18} /> Scan QR & Clock-In
                </button>
              )}

              {clockedIn && (
                <div>
                  <div className="clock-active-badge">
                    <CheckCircle2 size={18} /> Clocked-In at {clockInTime}
                  </div>
                  <button onClick={handleClockOut} className="clockout-btn">
                    Scan QR & Clock-Out
                  </button>
                </div>
              )}

              {clockOutTime && !clockedIn && (
                <div className="shift-completed-card">
                  <CheckCircle2 size={32} className="text-emerald-500 mx-auto" />
                  <h4>Shift Complete!</h4>
                  <p>Clock-in: {clockInTime} · Clock-out: {clockOutTime}</p>
                  <p className="font-bold text-emerald-700">Wage Credited: ₹800 (8 Hours)</p>
                  <button onClick={handleClockIn} className="primary-btn mt-2">
                    Start Next Shift
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Attendance Log Table */}
          <div className="job-section">
            <h2>Recent Verified Attendance Logs</h2>
            <div className="attendance-history-list">
              {attendanceRecords.map((item) => (
                <div key={item.id} className="attendance-history-item">
                  <div>
                    <strong>{item.worker}</strong>
                    <p className="text-xs text-slate-500">{item.job} · {item.date}</p>
                    <div className="flex gap-3 text-xs text-slate-600 mt-1">
                      <span>In: <strong>{item.clockIn}</strong></span>
                      <span>Out: <strong>{item.clockOut}</strong></span>
                      <span>Duration: <strong>{item.totalHours}</strong></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="badge-verified">
                      <ShieldCheck size={13} /> {item.status}
                    </span>
                    <h3 className="text-emerald-600 mt-1" style={{ margin: "4px 0 0" }}>{item.earned}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link to="/payments" className="secondary-btn">
                View Payments & Payroll <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}