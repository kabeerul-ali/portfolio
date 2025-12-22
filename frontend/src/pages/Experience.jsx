import React, { useEffect, useState } from "react";
import axios from "axios";

const ExperienceUser = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:5000";

  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/experiences`);
        setExperiences(res.data || []);
      } catch (err) {
        console.error("Failed to fetch experiences", err);
      }
    };
    fetchExperiences();
  }, [BASE_URL]);

  return (
    <section className="container py-5">
      <h2 className="mb-4 text-center fw-bold">My Experience</h2>

      {experiences.length === 0 && <p>No experience data available.</p>}

      <div className="timeline">
        {experiences.map((exp) => (
          <div key={exp._id} className="timeline-item mb-5 p-4 shadow rounded projectbg">
            <h4 className="fw-bold">{exp.role} <span className="text-muted fw-normal">at {exp.company}</span></h4>
            <p className="text-muted">
              {new Date(exp.startDate).toLocaleDateString(undefined, { year: "numeric", month: "short" })} -{" "}
              {exp.endDate
                ? new Date(exp.endDate).toLocaleDateString(undefined, { year: "numeric", month: "short" })
                : "Present"}
            </p>
            {exp.location && <p className="fst-italic">{exp.location}</p>}
            {exp.description && <p>{exp.description}</p>}
            {exp.technologies && exp.technologies.length > 0 && (
              <p>
                <strong>Technologies:</strong> {exp.technologies.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .timeline {
          border-left: 3px solid #007bff;
          margin-left: 20px;
          padding-left: 20px;
        }
        .timeline-item {
          position: relative;
        }
        .timeline-item::before {
          content: "";
          position: absolute;
          left: -12px;
          top: 15px;
          width: 15px;
          height: 15px;
          background: #007bff;
          border-radius: 50%;
          border: 3px solid white;
        }
      `}</style>
    </section>
  );
};

export default ExperienceUser;
