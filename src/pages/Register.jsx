import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    skills: "",
    location: "",
    experienceYears: "0",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (form.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          password: form.password,
          phone: form.phone.trim(),
          skills: form.skills.trim(),
          location: form.location.trim(),
          experienceYears: Number(form.experienceYears) || 0,
        }),
      });

      const result = await response.text();

      if (!response.ok) {
        throw new Error(result || `Registration failed: ${response.status}`);
      }

      setMessage("Account created successfully! You can now log in.");

      setForm({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        skills: "",
        location: "",
        experienceYears: "0",
      });
    } catch (error) {
      console.error(error);
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the backend. Check that Spring Boot is running."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "11px",
    marginTop: "6px",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
  };

  const labelStyle = {
    display: "block",
    marginTop: "14px",
    fontWeight: "600",
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "24px",
      background: "#f1f5f9",
    }}>
      <form onSubmit={handleSubmit} style={{
        width: "100%",
        maxWidth: "430px",
        padding: "28px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 18px #00000012",
      }}>
        <h2 style={{ textAlign: "center" }}>Create WorkLink Account</h2>

        <label style={labelStyle}>Full Name *</label>
        <input style={inputStyle} name="fullName" value={form.fullName}
          onChange={handleChange} required autoComplete="name" />

        <label style={labelStyle}>Email *</label>
        <input style={inputStyle} type="email" name="email"
          value={form.email} onChange={handleChange}
          required autoComplete="email" />

        <label style={labelStyle}>Password *</label>
        <input style={inputStyle} type="password" name="password"
          value={form.password} onChange={handleChange}
          minLength={8} required autoComplete="new-password"
          placeholder="At least 8 characters" />

        <label style={labelStyle}>Confirm Password *</label>
        <input style={inputStyle} type="password" name="confirmPassword"
          value={form.confirmPassword} onChange={handleChange}
          minLength={8} required autoComplete="new-password"
          placeholder="Enter password again" />

        <label style={labelStyle}>Phone</label>
        <input style={inputStyle} type="tel" name="phone"
          value={form.phone} onChange={handleChange}
          autoComplete="tel" />

        <label style={labelStyle}>Skills</label>
        <input style={inputStyle} name="skills" value={form.skills}
          onChange={handleChange} placeholder="Cooking, serving, etc." />

        <label style={labelStyle}>Location</label>
        <input style={inputStyle} name="location" value={form.location}
          onChange={handleChange} placeholder="Your city" />

        <label style={labelStyle}>Experience (years)</label>
        <input style={inputStyle} type="number" name="experienceYears"
          value={form.experienceYears} onChange={handleChange}
          min="0" max="60" />

        <button type="submit" disabled={loading} style={{
          width: "100%",
          marginTop: "22px",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: loading ? "wait" : "pointer",
        }}>
          {loading ? "Creating account..." : "Register"}
        </button>

        {message && (
          <p role="status" style={{
            marginTop: "16px",
            overflowWrap: "anywhere",
          }}>{message}</p>
        )}
      </form>
    </div>
  );
}