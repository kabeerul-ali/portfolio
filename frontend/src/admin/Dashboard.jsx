import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout"); // backend clears cookie
      localStorage.removeItem("user"); // optional if you still keep user info locally
      navigate("/admin/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Admin Dashboard</h2>
      <div className="row g-4">
        {/* Projects */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h5 className="fw-bold">Manage Projects</h5>
              <p className="text-muted small mb-3">
                Add, edit, and delete portfolio projects.
              </p>
              <Link to="/admin/projects" className="btn btn-primary">
                Go to Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h5 className="fw-bold">Manage Skills</h5>
              <p className="text-muted small mb-3">
                Keep your skillset up-to-date.
              </p>
              <Link to="/admin/skills" className="btn btn-primary">
                Go to Skills
              </Link>
            </div>
          </div>
        </div>

        {/* Experiences */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h5 className="fw-bold">Manage Experiences</h5>
              <p className="text-muted small mb-3">
                Update work history and roles.
              </p>
              <Link to="/admin/experiences" className="btn btn-primary">
                Go to Experiences
              </Link>
            </div>
          </div>
        </div>

        {/* Blogs */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h5 className="fw-bold">Manage Blogs</h5>
              <p className="text-muted small mb-3">
                Write and update blog articles.
              </p>
              <Link to="/admin/blogs" className="btn btn-primary">
                Go to Blogs
              </Link>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h5 className="fw-bold">Messages</h5>
              <p className="text-muted small mb-3">
                View contact form submissions.
              </p>
              <Link to="/admin/messages" className="btn btn-primary">
                Go to Messages
              </Link>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <h5 className="fw-bold">Logout</h5>
              <p className="text-muted small mb-3">
                End your admin session securely.
              </p>
              <button
                className="btn btn-danger"
                onClick={handleLogout} // ✅ correctly calls function
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
