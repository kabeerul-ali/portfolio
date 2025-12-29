import React from "react";

const About = () => {
  return (
    <section className="container py-5 about">
      <div className="row align-items-center">
        {/* Image Section */}
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img
            src="/assets/profile.png"
            alt="Profile"
            className="img-fluid rounded-circle shadow"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </div>

        {/* Text Content */}
        <div className="col-md-7 mt-4">
          <h2 className="fw-bold aboutdes mb-3">About Me</h2>
          <p className="aboutdes">
            I'm a passionate full-stack developer with expertise in React, Node.js, MongoDB,
            and cloud integrations. I love building custom solutions that solve real problems and
            scale efficiently.
          </p>
          <p className="aboutdes">
            My goal is to create secure, performant web applications that offer seamless user experiences
            and easy content management through custom admin panels.
          </p>

         

          {/* Contact Info */}
          <div className="mt-4">
            <h5 className="fw-bold">Contact Information</h5>
            <p className="mb-1">
              <i className="bi bi-envelope me-2"></i>
              <a href="mailto:kabeerulali@gmail.com" className="text-decoration-none">
                kabeerulali@gmail.com
              </a>
            </p>
            <p className="mb-1">
              <i className="bi bi-linkedin me-2"></i>
              <a
                href="https://www.linkedin.com/in/kabeerul-ali-04b03a2b7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                LinkedIn
              </a>
            </p>
            <p className="mb-0">
              <i className="bi bi-github me-2"></i>
              <a
                href="https://github.com/kabeerul-ali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                GitHub
              </a>
            </p>
          </div>
           {/* Download CV */}
          <a
            href="/assets/Kabeerul-CV.pdf"
            className="btn btn-outline-primary mt-3"
            download
          >
            <i className="bi bi-download me-2"></i>Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
