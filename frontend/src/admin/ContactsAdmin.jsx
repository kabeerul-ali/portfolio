// src/admin/ContactAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactAdmin = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:5000";
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BASE_URL}/api/contact`, { withCredentials: true });
      setMessages(res.data);
    } catch (err) {
      setError("Failed to load messages.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`${BASE_URL}/api/contact/${id}/read`, {}, { withCredentials: true });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
      );
    } catch (err) {
      alert("Failed to mark as read");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/contact/${id}`, { withCredentials: true });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      alert("Failed to delete message");
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Contact Messages</h2>

      {loading && <p>Loading messages...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && messages.length === 0 && <p>No messages found.</p>}

      <div className="list-group">
        {messages.map(({ _id, name, email, message, read, createdAt }) => (
          <div
            key={_id}
            className={`list-group-item list-group-item-action flex-column align-items-start ${
              read ? "bg-light" : "bg-white"
            }`}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className={`mb-1 ${read ? "text-muted" : "fw-bold"}`}>{name}</h5>
              <small>{new Date(createdAt).toLocaleString()}</small>
            </div>
            <p className="mb-1">{message.length > 100 ? message.slice(0, 100) + "..." : message}</p>
            <small className="text-muted">{email}</small>
            <div className="mt-2">
              {!read && (
                <button
                  onClick={() => handleMarkAsRead(_id)}
                  className="btn btn-sm btn-outline-success me-2"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => handleDelete(_id)}
                className="btn btn-sm btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactAdmin;
