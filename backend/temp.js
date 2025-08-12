require("dotenv").config();
const mongoose = require("mongoose");
const Skill = require("./models/Skill"); // Adjust path if needed

const skills = [
  {
    name: "HTML",
    category: "Frontend",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    category: "Frontend",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    category: "Frontend",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "MongoDB",
    category: "Database",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Express",
    category: "Backend",
    level: "Expert",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
  },
  {
    name: "React",
    category: "Frontend",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    category: "Backend",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Data Structures & Algorithms",
    category: "Concepts",
    level: "Expert",
    icon: "https://cdn-icons-png.flaticon.com/512/3291/3291698.png",
  },
  {
    name: "Java",
    category: "Backend",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Python",
    category: "Backend",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C",
    category: "Backend",
    level: "Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "OOP",
    category: "Concepts",
    level: "Expert",
    icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
  },
  {
    name: "Design & Analysis of Algorithms",
    category: "Concepts",
    level: "Expert",
    icon: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
  },
];

async function insertSkills() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear all existing skills first
    await Skill.deleteMany({});
    console.log("Cleared existing skills");

    // Insert all new skills
    await Skill.insertMany(skills);
    console.log("Inserted all skills successfully");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting skills:", err);
    mongoose.connection.close();
  }
}

insertSkills();
