import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

function Attendance() {
  const [attendance, setAttendance] = useState(false);

  const workerData = "WorkLink-Worker-Ravi-Kumar-2026";

  const markAttendance = () => {
    setAttendance(true);
  };

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <div>
          <h1>📱 QR Attendance</h1>
          <p>Worker attendance management</p>
        </div>

        <Link
          to="/business-dashboard"
          className="logout-btn"
        >
          Back
        </Link>

      </div>

      <div className="job-section">

        <h2>Worker Check-In</h2>

        <p>
          Scan the QR code to record worker attendance.
        </p>

        <br />

        <div style={{ textAlign: "center" }}>

          <QRCodeCanvas
            value={workerData}
            size={220}
          />

          <h3 style={{ marginTop: "20px" }}>
            Ravi Kumar
          </h3>

          <p>
            Waiter • ABC Restaurant
          </p>

          <br />

          {!attendance ? (
            <button onClick={markAttendance}>
              Mark Attendance
            </button>
          ) : (
            <h2>
              ✅ Attendance Marked
            </h2>
          )}

        </div>

      </div>

    </div>
  );
}

export default Attendance;