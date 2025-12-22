// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_HOST;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("❌ Failed to load blog", err));
  }, [BASE_URL, id]);

  if (!blog) {
    return (
      <div className="container py-5">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <Link to="/blogs" className="btn btn-outline-secondary mb-3">
        ← Back to Blogs
      </Link>
      <h1 className="fw-bold mb-3">{blog.title}</h1>
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      )}
      <div className="text-muted mb-3">
        {blog.tags?.length > 0 && `Tags: ${blog.tags.join(", ")}`}
      </div>
      <p style={{ whiteSpace: "pre-line" }}>{blog.content}</p>
    </section>
  );
};

export default BlogDetail;
