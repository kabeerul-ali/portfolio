import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillsUser = () => {
  const BASE_URL = process.env.REACT_APP_HOST || "http://localhost:5000";
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/skills`);
        setSkills(res.data || []);
      } catch (err) {
        console.error("Failed to load skills", err);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {});

  // Map level to progress % and color
  const levelToProgress = {
    Beginner: { percent: 40, color: "#dc3545" }, // red
    Intermediate: { percent: 70, color: "#ffc107" }, // yellow
    Expert: { percent: 100, color: "#198754" }, // green
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-center">My Skills</h2>

      {Object.entries(groupedSkills).map(([category, skills]) => (
        <div key={category} className="mb-5">
          <h4 className="mb-3  border-bottom border-3  pb-1">
            {category}
          </h4>
          <div className="row">
            {skills.map(({ _id, name, level, icon }) => {
              const { percent, color } = levelToProgress[level] || levelToProgress.Intermediate;
              return (
                <div key={_id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card shadow-sm p-3 h-100 d-flex flex-column justify-content-center projectbg">
                    <div className="d-flex align-items-center mb-3">
                      {icon && (
                        icon.startsWith("http") ? (
                          <img
                            src={icon}
                            alt={name}
                            style={{ height: 30, width: 30, objectFit: "contain" }}
                            className="me-3"
                          />
                        ) : (
                          <i className={`${icon} me-3`} style={{ fontSize: 24 }} />
                        )
                      )}
                      <h5 className="mb-0">{name}</h5>
                    </div>
                    <div className="progress" style={{ height: "12px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percent}%`, backgroundColor: color }}
                        aria-valuenow={percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {level}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {skills.length === 0 && <p className="text-center">No skills found.</p>}
    </div>
  );
};

export default SkillsUser;
