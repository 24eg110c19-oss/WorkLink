import { useState } from "react";
import { MessageSquare, Send, X, ShieldCheck } from "lucide-react";

export default function ChatModal({ recipientName = "Ravi Kumar", onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: "🔒 Chat is end-to-end encrypted for WorkLink verified users.",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "business",
      text: `Hello ${recipientName}, can you report for the evening banquet shift today by 5:30 PM?`,
      time: "10:02 AM",
    },
    {
      id: 3,
      sender: "worker",
      text: "Yes sir! I am available and nearby in Madhapur. I have my formal uniform ready.",
      time: "10:04 AM",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "business",
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");

    // Automated worker response after 1 second for live demo
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "worker",
          text: "Thank you for the update! Looking forward to working with you.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-blue-600" />
            <div>
              <h3 style={{ margin: 0 }}>{recipientName}</h3>
              <span className="chat-status">● Active now · Verified Worker</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-bubble-row ${
                m.sender === "business"
                  ? "sent"
                  : m.sender === "system"
                  ? "system"
                  : "received"
              }`}
            >
              <div className="chat-bubble">
                <p>{m.text}</p>
                <span className="chat-time">{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="chat-input-bar">
          <input
            type="text"
            placeholder={`Type a message to ${recipientName}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
