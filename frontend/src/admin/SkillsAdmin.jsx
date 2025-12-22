// src/admin/SkillsAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillsAdmin = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:5000";

  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    level: "Intermediate",
    icon: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/skills`);
      setSkills(res.data || []);
    } catch (err) {
      console.error("Failed to fetch skills", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${BASE_URL}/api/skills/${editId}`, form);
      } else {
        await axios.post(`${BASE_URL}/api/skills`, form);
      }
      fetchSkills();
      resetForm();
    } catch (err) {
      console.error("Save skill failed:", err);
      alert(err?.response?.data?.message || "Failed to save skill");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  const handleEdit = (skill) => {
    setForm({
      name: skill.name || "",
      category: skill.category || "",
      level: skill.level || "Intermediate",
      icon: skill.icon || "",
    });
    setEditId(skill._id);
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      level: "Intermediate",
      icon: "",
    });
    setEditId(null);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Manage Skills</h2>

      {/* Skill Form */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-5">
        <div className="mb-3">
          <label className="form-label">Skill Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Tools">Tools</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Level</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Icon URL or Class</label>
          <input
            type="text"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. https://example.com/icon.png or FaReact"
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {editId ? "Update Skill" : "Add Skill"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* Skills List */}
      <div className="row">
        {skills.map((skill) => (
          <div key={skill._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 text-center p-3">
              {skill.icon && (
                skill.icon.startsWith("http") ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    style={{ height: "40px", objectFit: "contain" }}
                    className="mx-auto mb-2"
                  />
                ) : (
                  <div className="mb-2">
                    <i className={skill.icon} style={{ fontSize: "2rem" }}></i>
                  </div>
                )
              )}
              <h6 className="fw-bold">{skill.name}</h6>
              <small className="text-muted">{skill.category} • {skill.level}</small>
              <div className="mt-3">
                <button onClick={() => handleEdit(skill)} className="btn btn-sm btn-outline-warning me-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(skill._id)} className="btn btn-sm btn-outline-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {skills.length === 0 && <p>No skills found.</p>}
      </div>
    </div>
  );
};

export default SkillsAdmin;
