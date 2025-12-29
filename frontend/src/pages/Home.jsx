import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import bgImage from "/assets/bg.png"; // ✅ SAFE IMPORT

const messages = [
  "Home – Welcome to my portfolio! Explore all sections to learn about me, my skills, projects, experiences, blogs, and how to connect.",
  "About – Discover who I am, my professional journey, passions, and download my CV to know more about my background.",
  "Skills – Explore my technical and creative skills, complete with proficiency levels and years of experience in each area.",
  "Projects – Browse my personal and professional projects, showcasing my creativity, problem-solving, and development expertise.",
  "Experiences – View my career path, roles, achievements, and the valuable lessons I’ve gained along the way.",
  "Blogs – Read my daily blogs where I share learning experiences, tech insights, and ideas to inspire and help others.",
  "Contact – Get in touch to discuss collaborations, projects, hiring, feedback, or any creative opportunities.",
  "Admin Login – This page is for admins only to securely log in and manage the portfolio’s content."
];

const Home = () => {
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [messageText, setMessageText] = useState("");

  const timeoutsRef = useRef([]);
  const activeRef = useRef(true);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  const sleep = (ms) =>
    new Promise((resolve) => {
      const id = setTimeout(resolve, ms);
      timeoutsRef.current.push(id);
    });

  const typeText = (text, setter, speed = 50) =>
    new Promise((resolve) => {
      clearAllTimeouts();
      setter("");

      if (!text) {
        resolve();
        return;
      }

      let i = 0;

      const tick = () => {
        if (!activeRef.current) {
          resolve();
          return;
        }

        setter(text.slice(0, i + 1));
        i += 1;

        if (i < text.length) {
          const id = setTimeout(tick, speed);
          timeoutsRef.current.push(id);
        } else {
          resolve();
        }
      };

      const id0 = setTimeout(tick, speed);
      timeoutsRef.current.push(id0);
    });

  useEffect(() => {
    activeRef.current = true;

    const run = async () => {
      await sleep(4000);

      await typeText("Kabeerul Ali", setTitleText, 80);
      await sleep(300);
      await typeText("Full Stack Web Developer & Engineer", setSubtitleText, 50);
      await sleep(1000);

      let index = 0;
      while (activeRef.current) {
        await typeText(messages[index], setMessageText, 30);
        await sleep(5000);
        setMessageText("");
        await sleep(1000);
        index = (index + 1) % messages.length;
      }
    };

    run();

    return () => {
      activeRef.current = false;
      clearAllTimeouts();
    };
  }, []);

  return (
    <section
      className="home-container"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
          url(${bgImage})
        `,
      }}
    >
      <div className="home-overlay">
        <div className="home-left">
          <h1 className="home-title">{titleText}</h1>
          <p className="home-subtitle">{subtitleText}</p>
        </div>

        <div className="home-right">
          <p className="home-message">{messageText}</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
