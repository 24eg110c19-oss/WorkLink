import { Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Jobs from "./pages/Jobs.jsx";
import WorkerDashboard from "./pages/WorkerDashboard.jsx";
import BusinessDashboard from "./pages/BusinessDashboard.jsx";
import PostJob from "./pages/PostJob.jsx";
import AIMatching from "./pages/AIMatching.jsx";
import Attendance from "./pages/Attendance.jsx";
import MyApplications from "./pages/MyApplications.jsx";
import BusinessApplications from "./pages/BusinessApplications.jsx";
import Payments from "./pages/Payments.jsx";

function App() {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboards */}
      <Route path="/worker-dashboard" element={<WorkerDashboard />} />
      <Route path="/business-dashboard" element={<BusinessDashboard />} />

      {/* Jobs */}
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/post-job" element={<PostJob />} />

      {/* Worker applications */}
      <Route path="/my-applications" element={<MyApplications />} />

      {/* Business application management */}
      <Route path="/business-applications" element={<BusinessApplications />} />

      {/* AI matching, attendance, payments */}
      <Route path="/ai-matching" element={<AIMatching />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/payments" element={<Payments />} />
    </Routes>
  );
}

export default App;