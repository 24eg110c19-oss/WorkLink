import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="app">

      <nav className="navbar">
        <h1>WorkLink</h1>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <section className="hero">

        <div className="hero-text">
          <h2>Find the Right Worker.<br />Find the Right Job.</h2>

          <p>
            WorkLink uses intelligent matching to connect businesses
            with skilled workers based on skills, location,
            experience and availability.
          </p>

          <div className="buttons">
            <Link to="/jobs" className="primary-btn">
              Find Jobs
            </Link>

            <Link to="/register" className="secondary-btn">
              Join WorkLink
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h3>AI Worker Matching</h3>

          <div className="match">
            <div>
              <strong>Ravi Kumar</strong>
              <p>Waiter • Hyderabad</p>
            </div>
            <span>95%</span>
          </div>

          <div className="match">
            <div>
              <strong>Arun Kumar</strong>
              <p>Catering • Hyderabad</p>
            </div>
            <span>91%</span>
          </div>

          <div className="match">
            <div>
              <strong>Suresh</strong>
              <p>Event Staff • Hyderabad</p>
            </div>
            <span>86%</span>
          </div>
        </div>

      </section>

      <section className="features">

        <div className="feature">
          <h3>🤖 AI Matching</h3>
          <p>Find suitable workers based on multiple factors.</p>
        </div>

        <div className="feature">
          <h3>📍 Local Hiring</h3>
          <p>Connect businesses with workers nearby.</p>
        </div>

        <div className="feature">
          <h3>⚡ Quick Hiring</h3>
          <p>Fill temporary and permanent jobs faster.</p>
        </div>

        <div className="feature">
          <h3>⭐ Trusted Workers</h3>
          <p>Use ratings and verified profiles to hire confidently.</p>
        </div>

      </section>

    </div>
  );
}

export default Home;