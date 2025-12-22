// src/admin/ProjectsAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectsAdmin = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:5000";

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemoLink: "",
    imageUrl: "",
    featured: false,
  });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/projects`);
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async () => {
    if (!file) return form.imageUrl || "";
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${BASE_URL}/api/cloudinary/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        // withCredentials is already true globally
      });

      return res.data.url;
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // upload image if any
    const uploadedImageUrl = await uploadImage();
    if (uploadedImageUrl === null && !form.imageUrl) return;

    const payload = {
      ...form,
      technologies: form.technologies ? form.technologies.split(",").map((t) => t.trim()) : [],
      imageUrl: uploadedImageUrl || form.imageUrl,
    };

    try {
      if (editId) {
        await axios.put(`${BASE_URL}/api/projects/${editId}`, payload);
      } else {
        await axios.post(`${BASE_URL}/api/projects`, payload);
      }
      fetchProjects();
      resetForm();
    } catch (err) {
      console.error("Save project failed:", err);
      alert(err?.response?.data?.message || "Failed to save project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: (project.technologies || []).join(", "),
      githubLink: project.githubLink || "",
      liveDemoLink: project.liveDemoLink || "",
      imageUrl: project.imageUrl || "",
      featured: !!project.featured,
    });
    setEditId(project._id);
    setFile(null);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      liveDemoLink: "",
      imageUrl: "",
      featured: false,
    });
    setFile(null);
    setEditId(null);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Manage Projects</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-5">
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
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

        <div className="mb-3">
          <label className="form-label">GitHub Link</label>
          <input type="url" name="githubLink" value={form.githubLink} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Live Demo Link</label>
          <input type="url" name="liveDemoLink" value={form.liveDemoLink} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Project Image</label>
          <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
          {form.imageUrl && (
            <img src={form.imageUrl} alt="Preview" className="mt-2 rounded" style={{ height: "100px", objectFit: "cover" }} />
          )}
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="form-check-input" id="featuredCheck" />
          <label htmlFor="featuredCheck" className="form-check-label">Featured Project</label>
        </div>

        <button type="submit" className="btn btn-primary me-2">{editId ? "Update Project" : "Add Project"}</button>
        {editId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
      </form>

      <div className="row">
        {projects.map((proj) => (
          <div key={proj._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              {proj.imageUrl && <img src={proj.imageUrl} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} alt={proj.title} />}
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold">{proj.title}</h5>
                <p className="text-muted flex-grow-1">{proj.description ? proj.description.slice(0, 80) + "..." : ""}</p>
                <small className="text-primary">{(proj.technologies || []).join(", ")}</small>
                <div className="mt-3">
                  <button onClick={() => handleEdit(proj)} className="btn btn-sm btn-outline-warning me-2">Edit</button>
                  <button onClick={() => handleDelete(proj._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p>No projects found.</p>}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
