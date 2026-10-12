import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./pages/Login.jsx";
import Attendance from "./pages/Attendance.jsx";
import Register from "./pages/Register.jsx";
import WorkerDashboard from "./pages/WorkerDashboard.jsx";
import BusinessDashboard from "./pages/BusinessDashboard.jsx";
import PostJob from "./pages/PostJob.jsx";
import AIMatching from "./pages/AIMatching.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/worker-dashboard" element={<WorkerDashboard />} />
      <Route path="/business-dashboard" element={<BusinessDashboard />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/ai-matching" element={<AIMatching />} />
      <Route path="/attendance" element={<Attendance />} />
    </Routes>
  );
}

export default App;