import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_HOST;

  // Fetch projects
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error("❌ Failed to load projects", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [BASE_URL]);

  // 🔄 Laggy loading spinner
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

  return (
    <section className="container py-5">
      <h2 className="fw-bold mb-4 text-center">My Projects</h2>

      {/* Project Cards */}
      <div className="row g-4">
        {projects.map((project) => (
          <div key={project._id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column projectbg">
                <h5 className="card-title fw-bold">{project.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {project.description}
                </p>
                <div className="mt-3">
                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark btn-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <div className="card-footer border-0 projectbg">
                {project.technologies?.length > 0 && (
                  <small className="text-muted">
                    {project.technologies.join(", ")}
                  </small>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
