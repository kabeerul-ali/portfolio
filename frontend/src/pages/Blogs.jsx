// src/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const BASE_URL = process.env.REACT_APP_HOST;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/blogs`)
      .then((res) => {
        // show only published blogs
        setBlogs(res.data.filter((blog) => blog.published));
      })
      .catch((err) => {
        console.error("❌ Failed to load blogs", err);
      });
  }, [BASE_URL]);

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Blog</h2>
      <div className="row g-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column projectbg">
                <h5 className="card-title fw-bold">{blog.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {blog.excerpt || blog.content?.slice(0, 100) + "..."}
                </p>
                <div className="mt-3">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
              <div className="card-footer projectbg border-1">
                {blog.tags?.length > 0 && (
                  <small className="text-muted">
                    {blog.tags.join(", ")}
                  </small>
                )}
              </div>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <p>No blogs available.</p>}
      </div>
    </section>
  );
};

export default BlogList;
