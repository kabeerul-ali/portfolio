// src/pages/Login.jsx (updated)
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "https://portfolio-backend4u.onrender.com";
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill both email and password.");
      return;
    }

    try {
      setLoading(true);
      // send credentials and allow cookies
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        form,
        { withCredentials: true } // crucial: allow browser to receive HttpOnly cookie
      );

      // backend returns user object (no token)
      const user = res?.data?.user;
      if (user) {
        // optionally store minimal user info for UI (not the token)
        localStorage.setItem("user", JSON.stringify(user));
        setLoading(false);
        navigate("/admin/dashboard", { replace: true });
      } else {
        setLoading(false);
        setError("Login failed: no user data returned.");
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Check credentials and try again.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="card-title mb-3 text-center fw-bold">Admin Login</h3>
              <p className="text-muted text-center mb-4">
                Secure area — sign in to manage your portfolio.
              </p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="admin@example.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="d-grid mt-4">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>

              <div className="text-center mt-3">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
