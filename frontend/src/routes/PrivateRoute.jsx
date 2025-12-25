// src/routes/PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    axios
      .get("/api/auth/me", {
        withCredentials: true, // 🔥 CRITICAL FIX
      })
      .then((res) => {
        if (!mounted) return;
        if (res.status === 200 && res.data?.user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        if (mounted) setChecking(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
