import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("❌ Failed to load projects", err))
      .finally(() => setLoading(false));
  }, [BASE_URL]);

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

      <div className="row g-4">
        {projects.map((project) => (
          <div key={project._id} className="col-md-6 col-lg-4">
            <div
              className="card h-100 shadow-sm border-0"
              style={{ minHeight: "380px" }}   // ⬅ decreased card size
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="card-img-top"
                  style={{
                    height: "160px",          // ⬅ smaller image
                    objectFit: "cover",
                  }}
                />
              )}

              <div className="card-body d-flex flex-column projectbg">
                <h5 className="card-title fw-bold">{project.title}</h5>

                {/* Fixed description height */}
                <p
                  className="card-text text-muted"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.description}
                </p>

                {/* Buttons in same line */}
                <div className="mt-auto d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/projects/${project._id}`)}
                  >
                    Read More
                  </button>

                  {project.liveDemoLink && (
                    <a
                      href={project.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
