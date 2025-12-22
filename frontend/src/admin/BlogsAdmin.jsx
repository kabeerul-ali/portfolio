// src/admin/BlogsAdmin.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogsAdmin = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:5000";

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    coverImage: "",
    published: false,
  });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blogs`);
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async () => {
    if (!file) return form.coverImage || "";
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${BASE_URL}/api/cloudinary/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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

    const uploadedImageUrl = await uploadImage();
    if (uploadedImageUrl === null && !form.coverImage) return;

    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
      coverImage: uploadedImageUrl || form.coverImage,
    };

    try {
      if (editId) {
        await axios.put(`${BASE_URL}/api/blogs/${editId}`, payload);
      } else {
        await axios.post(`${BASE_URL}/api/blogs`, payload);
      }
      fetchBlogs();
      resetForm();
    } catch (err) {
      console.error("Save blog failed:", err);
      alert(err?.response?.data?.message || "Failed to save blog");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed");
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      tags: (blog.tags || []).join(", "),
      coverImage: blog.coverImage || "",
      published: !!blog.published,
    });
    setEditId(blog._id);
    setFile(null);
  };

  const resetForm = () => {
    setForm({
      title: "",
      excerpt: "",
      content: "",
      tags: "",
      coverImage: "",
      published: false,
    });
    setFile(null);
    setEditId(null);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Manage Blogs</h2>

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
          <label className="form-label">Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            className="form-control"
            rows="2"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="form-control"
            rows="6"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image</label>
          <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
          {form.coverImage && (
            <img src={form.coverImage} alt="Preview" className="mt-2 rounded" style={{ height: "100px", objectFit: "cover" }} />
          )}
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={handleChange}
            className="form-check-input"
            id="publishedCheck"
          />
          <label htmlFor="publishedCheck" className="form-check-label">Published</label>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {editId ? "Update Blog" : "Add Blog"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                  alt={blog.title}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold">{blog.title}</h5>
                <p className="text-muted flex-grow-1">{blog.excerpt || ""}</p>
                <small className="text-primary">{(blog.tags || []).join(", ")}</small>
                <div className="mt-3">
                  <button onClick={() => handleEdit(blog)} className="btn btn-sm btn-outline-warning me-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </div>
              </div>
              <div className="card-footer bg-white border-0">
                <small className={blog.published ? "text-success" : "text-danger"}>
                  {blog.published ? "Published" : "Draft"}
                </small>
              </div>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <p>No blogs found.</p>}
      </div>
    </div>
  );
};

export default BlogsAdmin;
