import React, { useEffect, useState } from "react";
import axios from "axios";

const ExperienceAdmin = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:5000";

  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    description: "",
    technologies: "",
    startDate: "",
    endDate: "",
    location: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/experiences`);
      setExperiences(res.data || []);
    } catch (err) {
      console.error("Failed to fetch experiences", err);
    }
  };

  useEffect(() => {
    fetchExperiences();
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

    // Validation for required fields
    if (!form.company.trim() || !form.role.trim() || !form.startDate) {
      alert("Please fill in required fields: Company, Role, Start Date");
      return;
    }

    const payload = {
      ...form,
      technologies: form.technologies
        ? form.technologies.split(",").map((t) => t.trim())
        : [],
      endDate: form.endDate === "" ? null : form.endDate,
    };

    try {
      if (editId) {
        await axios.put(`${BASE_URL}/api/experiences/${editId}`, payload);
      } else {
        await axios.post(`${BASE_URL}/api/experiences`, payload);
      }
      fetchExperiences();
      resetForm();
    } catch (err) {
      console.error("Save experience failed:", err);
      alert(err?.response?.data?.message || "Failed to save experience");
    }
  };

  const handleEdit = (exp) => {
    setForm({
      company: exp.company || "",
      role: exp.role || "",
      description: exp.description || "",
      technologies: (exp.technologies || []).join(", "),
      startDate: exp.startDate ? exp.startDate.slice(0, 10) : "",
      endDate: exp.endDate ? exp.endDate.slice(0, 10) : "",
      location: exp.location || "",
    });
    setEditId(exp._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/experiences/${id}`);
      fetchExperiences();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setForm({
      company: "",
      role: "",
      description: "",
      technologies: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    setEditId(null);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Manage Experiences</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-5">
        <div className="mb-3">
          <label className="form-label">Company *</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role *</label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Technologies (comma separated)</label>
          <input
            type="text"
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label">End Date (leave blank if Present)</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {editId ? "Update Experience" : "Add Experience"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <div className="row">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div key={exp._id} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{exp.role} @ {exp.company}</h5>
                  <p className="text-muted mb-1">
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                  </p>
                  {exp.location && <small className="text-muted mb-2">{exp.location}</small>}
                  <p className="mb-2">{exp.description}</p>
                  {exp.technologies?.length > 0 && (
                    <small className="text-primary mb-3">
                      Technologies: {exp.technologies.join(", ")}
                    </small>
                  )}
                  <div className="mt-auto">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="btn btn-sm btn-outline-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No experiences found.</p>
        )}
      </div>
    </div>
  );
};

export default ExperienceAdmin;
