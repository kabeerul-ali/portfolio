import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_HOST;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error("❌ Failed to load project", err))
      .finally(() => setLoading(false));
  }, [BASE_URL, id]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!project) {
    return <p className="text-center mt-5">Project not found</p>;
  }

  return (
    <section className="container py-5">
      {/* Back Button */}
    <button
  onClick={() => navigate(-1)}
  style={{
    backgroundColor: "#0d6efd", // Bootstrap primary blue
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: 500,
  }}
  className="mb-4"
>
  ← Back
</button>


      {/* Image */}
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="img-fluid rounded shadow-sm mb-4"
          style={{ maxHeight: "420px", objectFit: "cover", width: "100%" }}
        />
      )}

      {/* Content */}
      <h2 className="fw-bold mb-3">{project.title}</h2>

      <p className="text-muted mb-4">{project.description}</p>

      {project.technologies?.length > 0 && (
        <p className="mb-3">
          <strong>Technologies:</strong>{" "}
          {project.technologies.join(", ")}
        </p>
      )}

      <div className="mt-4">
        {project.liveDemoLink && (
          <a
            href={project.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary me-2"
          >
            Live Demo
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark"
          >
            GitHub
          </a>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
