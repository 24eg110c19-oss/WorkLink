import { useState } from "react";
import { Link } from "react-router-dom";
import { DollarSign, CheckCircle2, Clock, ArrowUpRight, ShieldCheck, Download, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Payments() {
  const [lang, setLang] = useState("en");
  const [payments, setPayments] = useState([
    {
      id: "TXN-8821",
      worker: "Ravi Kumar",
      job: "Head Waiter - Paradise Banquet",
      hours: "8.5 hrs",
      amount: 1000,
      status: "PAID",
      date: "Today, 4:30 PM",
      method: "UPI (ravi@okhdfc)",
    },
    {
      id: "TXN-8822",
      worker: "Arun Kumar",
      job: "Catering Supervisor - Grand Palace",
      hours: "9.0 hrs",
      amount: 1200,
      status: "PAID",
      date: "Yesterday",
      method: "Bank Transfer (ICICI)",
    },
    {
      id: "TXN-8823",
      worker: "Mahesh Goud",
      job: "Emergency Standby Waiter - Taj Deccan",
      hours: "6.0 hrs",
      amount: 900,
      status: "PENDING",
      date: "Pending Approval",
      method: "UPI (mahesh@ybl)",
    },
  ]);

  const [releasingId, setReleasingId] = useState(null);

  const releasePayment = (id) => {
    setReleasingId(id);
    setTimeout(() => {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "PAID", date: "Just now" } : p
        )
      );
      setReleasingId(null);
    }, 1000);
  };

  const totalPaid = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>💳 Payments & Instant Wage Settlement</h1>
            <p>Automated payment tracking based on verified QR clock-in/out hours</p>
          </div>
          <Link to="/business-dashboard" className="logout-btn">
            Back to Dashboard
          </Link>
        </div>

        {/* Financial KPI Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Paid Out</h3>
            <h2 className="text-emerald-600">₹{totalPaid.toLocaleString()}</h2>
            <p>100% On-time settlements</p>
          </div>
          <div className="dashboard-card">
            <h3>Pending Wage Release</h3>
            <h2 className="text-amber-600">₹{pendingAmount.toLocaleString()}</h2>
            <p>{payments.filter((p) => p.status === "PENDING").length} worker pending approval</p>
          </div>
          <div className="dashboard-card">
            <h3>Escrow Protected</h3>
            <h2>100%</h2>
            <p>Instant UPI / IMPS direct transfer</p>
          </div>
          <div className="dashboard-card">
            <h3>Active Workers Paid</h3>
            <h2>{payments.length}</h2>
            <p>All verified KYC bank accounts</p>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="job-section">
          <div className="flex justify-between items-center mb-6">
            <h2>Worker Wage Settlement Ledger</h2>
            <span className="text-sm text-slate-500">Auto-calculated from QR Clock-In/Out logs</span>
          </div>

          <div className="table-responsive">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Worker Name</th>
                  <th>Job Shift</th>
                  <th>Verified Hours</th>
                  <th>Total Wage</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <code className="text-xs bg-slate-100 p-1 rounded font-mono">{p.id}</code>
                    </td>
                    <td>
                      <strong>{p.worker}</strong>
                    </td>
                    <td>{p.job}</td>
                    <td>
                      <span className="hours-pill">{p.hours}</span>
                    </td>
                    <td>
                      <strong className="text-base text-slate-900">₹{p.amount}</strong>
                    </td>
                    <td>{p.method}</td>
                    <td>
                      {p.status === "PAID" ? (
                        <span className="badge-paid">
                          <CheckCircle2 size={14} /> Paid
                        </span>
                      ) : (
                        <span className="badge-pending">
                          <Clock size={14} /> Pending
                        </span>
                      )}
                    </td>
                    <td>
                      {p.status === "PENDING" ? (
                        <button
                          onClick={() => releasePayment(p.id)}
                          disabled={releasingId === p.id}
                          className="release-pay-btn"
                        >
                          {releasingId === p.id ? "Processing UPI..." : "Release Payment"}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Settled ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
