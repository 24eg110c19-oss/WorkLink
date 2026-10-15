import { useState } from "react";
import { AlertTriangle, CheckCircle, RefreshCw, Star, MapPin, X, Zap } from "lucide-react";

export default function AutoReplacementModal({
  isOpen,
  onClose,
  cancelledWorker = "Suresh Kumar",
  jobTitle = "Waiter",
  onReplaced,
}) {
  const [replacing, setReplacing] = useState(false);
  const [selectedReplacement, setSelectedReplacement] = useState(null);
  const [success, setSuccess] = useState(false);

  const standbyCandidates = [
    {
      id: 101,
      name: "Mahesh Goud",
      skills: "Waiter, Banquet Staff, English/Telugu",
      rating: 4.9,
      distance: "1.2 km away",
      availability: "Immediate Standby (ETA: 15 mins)",
      matchScore: 98,
      verified: true,
    },
    {
      id: 102,
      name: "Kiran Varma",
      skills: "Waiter, Food & Beverage Service",
      rating: 4.8,
      distance: "2.5 km away",
      availability: "Available Now (ETA: 25 mins)",
      matchScore: 94,
      verified: true,
    },
    {
      id: 103,
      name: "Praveen Rao",
      skills: "Event Catering, Waiter",
      rating: 4.7,
      distance: "3.1 km away",
      availability: "Standby (ETA: 35 mins)",
      matchScore: 91,
      verified: true,
    },
  ];

  const handleConfirmReplacement = (worker) => {
    setReplacing(true);
    setSelectedReplacement(worker);

    setTimeout(() => {
      setReplacing(false);
      setSuccess(true);
      if (onReplaced) {
        onReplaced(worker);
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="replace-modal">
        <div className="replace-header">
          <div className="flex items-center gap-2">
            <AlertTriangle size={24} className="text-amber-500" />
            <div>
              <h3 style={{ margin: 0 }}>Auto-Staff Replacement Mechanism</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                Instant AI standby matching for last-minute cancellations
              </p>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="replace-body">
          <div className="cancellation-alert-card">
            <strong>⚠️ Cancellation Notice:</strong> {cancelledWorker} cancelled shift for <em>{jobTitle}</em>.
            <br />
            WorkLink AI automatically detected 3 verified standby workers in your immediate perimeter.
          </div>

          {!success ? (
            <div className="standby-list">
              <h4>Top AI Standby Candidates:</h4>
              {standbyCandidates.map((candidate) => (
                <div key={candidate.id} className="standby-card">
                  <div className="standby-info">
                    <div className="flex items-center gap-2">
                      <strong className="text-lg">{candidate.name}</strong>
                      <span className="badge-match">{candidate.matchScore}% Match</span>
                      <span className="badge-verified">Verified KYC</span>
                    </div>
                    <p className="skills-line">Skills: {candidate.skills}</p>
                    <div className="meta-line">
                      <span><MapPin size={14} /> {candidate.distance}</span>
                      <span><Star size={14} className="text-amber-500" /> {candidate.rating} ⭐</span>
                      <span className="text-emerald-600 font-semibold">{candidate.availability}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfirmReplacement(candidate)}
                    disabled={replacing}
                    className="auto-assign-btn"
                  >
                    {replacing && selectedReplacement?.id === candidate.id ? (
                      <>
                        <RefreshCw size={16} className="spin" /> Confirming...
                      </>
                    ) : (
                      <>
                        <Zap size={16} /> Auto-Assign
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="replacement-success-card">
              <CheckCircle size={48} className="text-emerald-500 mx-auto" />
              <h3>Replacement Dispatched Successfully!</h3>
              <p>
                <strong>{selectedReplacement?.name}</strong> has accepted the shift assignment.
                ETA: 15 minutes. Contact details and live location tracking enabled.
              </p>
              <button onClick={onClose} className="primary-btn mt-4">
                Done & Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
