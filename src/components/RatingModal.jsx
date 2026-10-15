import { useState } from "react";
import { Star, X, Check } from "lucide-react";

export default function RatingModal({ isOpen, onClose, targetName = "Ravi Kumar", onSubmitRating }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onSubmitRating) onSubmitRating({ rating, comment });
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="rating-modal">
        <div className="rating-header">
          <h3>Rate & Review {targetName}</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="rating-body">
          <p style={{ color: "#64748b" }}>
            Help keep the WorkLink community reliable and trustworthy.
          </p>

          <div className="stars-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className="star-btn"
              >
                <Star
                  size={36}
                  fill={star <= rating ? "#f59e0b" : "none"}
                  color={star <= rating ? "#f59e0b" : "#cbd5e1"}
                />
              </button>
            ))}
          </div>

          <p className="rating-score-text">{rating} out of 5 Stars</p>

          <label htmlFor="review-comment" className="block text-sm font-semibold mb-1">
            Performance Review & Feedback
          </label>
          <textarea
            id="review-comment"
            rows="3"
            placeholder="e.g. Highly punctual, great guest handling skills, professional attitude."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="review-textarea"
          />

          <button type="submit" disabled={submitted} className="submit-review-btn">
            {submitted ? "Submitting..." : "Submit Verified Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
