import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

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

  // refs to manage timers & lifecycle
  const timeoutsRef = useRef([]);
  const activeRef = useRef(true);

  // clear pending timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  // sleep helper that also records timeout IDs for cleanup
  const sleep = (ms) =>
    new Promise((resolve) => {
      const id = setTimeout(() => resolve(), ms);
      timeoutsRef.current.push(id);
    });

  /**
   * typeText:
   * - deterministic: sets the substring directly (no reliance on previous state).
   * - clears existing timeouts before starting to avoid overlap.
   * - records all timeouts so cleanup is possible.
   */
  const typeText = (text, setter, speed = 50) =>
    new Promise((resolve) => {
      clearAllTimeouts();
      setter(""); // ensure starting from empty

      if (!text) {
        resolve();
        return;
      }

      let i = 0;
      // show first char quickly (after one tick)
      const tick = () => {
        if (!activeRef.current) {
          resolve();
          return;
        }

        // set deterministic substring (no double-append)
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
      // initial delay (4s as you initially requested)
      await sleep(4000);
      if (!activeRef.current) return;

      // Title & subtitle typing
      await typeText("Kabeerul Ali", setTitleText, 80);
      if (!activeRef.current) return;
      await sleep(300);
      await typeText("Full Stack Web Developer & Engineer", setSubtitleText, 50);
      if (!activeRef.current) return;
      await sleep(1000);

      // Message loop (infinite)
      let index = 0;
      while (activeRef.current) {
        await typeText(messages[index], setMessageText, 30);
        if (!activeRef.current) break;

        // Hold full message for 5s
        await sleep(5000);
        if (!activeRef.current) break;

        // Clear message then wait 1s before next
        setMessageText("");
        await sleep(1000);
        index = (index + 1) % messages.length;
      }
    };

    run();

    return () => {
      // cleanup on unmount
      activeRef.current = false;
      clearAllTimeouts();
    };
    // run only once on mount
  }, []);

  return (
    <section className="home-container">
      <video className="home-video" autoPlay loop muted playsInline>
        <source src="/assets/animation.mp4" type="video/mp4" />
      </video>

      <div className="home-overlay">
        {/* Left side: title & subtitle */}
        <div className="home-left">
          <h1 className="home-title">{titleText}</h1>
          <p className="home-subtitle">{subtitleText}</p>
        </div>

        {/* Right side: messages */}
        <div className="home-right">
          <p className="home-message">{messageText}</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
