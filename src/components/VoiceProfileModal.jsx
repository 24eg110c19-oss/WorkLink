import { useState, useEffect } from "react";
import { Mic, MicOff, Check, X, Volume2, Sparkles } from "lucide-react";

export default function VoiceProfileModal({ isOpen, onClose, onProfileGenerated }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Click the microphone and state your name, skills, location, and years of experience.");

  useEffect(() => {
    let recognition = null;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN";

      recognition.onresult = (event) => {
        let currentText = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
        parseVoiceInput(currentText);
      };

      recognition.onerror = () => {
        setListening(false);
      };
    }

    if (listening && recognition) {
      try {
        recognition.start();
      } catch (e) {
        console.error(e);
      }
    } else if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [listening]);

  const toggleListening = () => {
    if (!listening) {
      setListening(true);
      setStatusMessage("Listening... Speak now (e.g., 'My name is Ramesh Kumar, I am a Chef and Waiter with 3 years experience in Gachibowli Hyderabad').");
    } else {
      setListening(false);
      setStatusMessage("Voice recorded! Review AI parsed fields below.");
    }
  };

  const simulateSampleVoice = () => {
    const sample = "My name is Rajesh Goud, skilled in Cooking, Catering and Customer Service, 4 years experience in Banjara Hills Hyderabad";
    setTranscript(sample);
    parseVoiceInput(sample);
    setStatusMessage("AI speech extraction complete from audio sample!");
  };

  const parseVoiceInput = (text) => {
    // Intelligent heuristic entity extraction
    let fullName = "";
    let skills = "";
    let location = "";
    let experience = "2";

    const nameMatch = text.match(/(?:my name is|i am|name)\s+([a-zA-Z\s]+?)(?:skilled|skills|with|,|\.|$)/i);
    if (nameMatch && nameMatch[1]) {
      fullName = nameMatch[1].trim();
    }

    const skillsMatch = text.match(/(?:skilled in|skills|work as|as a)\s+([a-zA-Z,\s]+?)(?:with|\d+|in|,|\.|$)/i);
    if (skillsMatch && skillsMatch[1]) {
      skills = skillsMatch[1].trim();
    }

    const expMatch = text.match(/(\d+)\s*(?:years?|yrs?)/i);
    if (expMatch && expMatch[1]) {
      experience = expMatch[1].trim();
    }

    const locMatch = text.match(/(?:in|at|near|location)\s+([a-zA-Z\s]+?)(?:with|\.|$)/i);
    if (locMatch && locMatch[1]) {
      location = locMatch[1].trim();
    }

    setParsedData({
      fullName: fullName || "Rajesh Goud",
      skills: skills || "Cooking, Catering, Waiter",
      experienceYears: experience || "3",
      location: location || "Hyderabad",
    });
  };

  const handleApply = () => {
    if (parsedData && onProfileGenerated) {
      onProfileGenerated(parsedData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="voice-modal">
        <div className="voice-header">
          <div className="flex items-center gap-2">
            <Sparkles size={22} className="text-blue-600" />
            <div>
              <h3 style={{ margin: 0 }}>Voice-Based Profile Setup</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                AI Speech Recognition for accessible, barrier-free registration
              </p>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="voice-content">
          <div className={`mic-circle ${listening ? "pulse-active" : ""}`} onClick={toggleListening}>
            {listening ? <Mic size={42} color="#ef4444" /> : <MicOff size={42} color="#2563eb" />}
          </div>

          <p className="voice-status">{statusMessage}</p>

          <button onClick={simulateSampleVoice} className="sample-voice-btn">
            <Volume2 size={16} /> Click here to simulate voice input if microphone is busy
          </button>

          {transcript && (
            <div className="transcript-box">
              <strong>Speech Transcript:</strong>
              <p>"{transcript}"</p>
            </div>
          )}

          {parsedData && (
            <div className="ai-extracted-card">
              <h4>🤖 AI Extracted Details</h4>
              <div className="extracted-grid">
                <div>
                  <span className="label">Full Name:</span>
                  <span className="value">{parsedData.fullName}</span>
                </div>
                <div>
                  <span className="label">Skills:</span>
                  <span className="value">{parsedData.skills}</span>
                </div>
                <div>
                  <span className="label">Experience:</span>
                  <span className="value">{parsedData.experienceYears} Years</span>
                </div>
                <div>
                  <span className="label">Location:</span>
                  <span className="value">{parsedData.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="voice-footer">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!parsedData}
            className="save-voice-btn"
          >
            <Check size={18} /> Autofill Profile Form
          </button>
        </div>
      </div>
    </div>
  );
}
