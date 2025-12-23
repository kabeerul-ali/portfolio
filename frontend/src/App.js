// // src/App.jsx
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import "./App.css";

// // Public pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Skills from "./pages/Skills";
// import Projects from "./pages/Projects";
// import Blogs from "./pages/Blogs";
// import Experience from "./pages/Experience";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";
// import Test from "./pages/Test";
// import BlogDetail from "./pages/BlogDetail";

// // Admin pages
// import Login from "./admin/Login";
// import Dashboard from "./admin/Dashboard";
// import BlogsAdmin from "./admin/BlogsAdmin";
// import ProjectsAdmin from "./admin/ProjectsAdmin";
// import SkillsAdmin from "./admin/SkillsAdmin";
// import ExperienceAdmin from "./admin/ExperienceAdmin";
// import ContactsAdmin from "./admin/ContactsAdmin";
// import UploadImage from "./admin/UploadImage";

// // Layout
// import Navbar from "./components/Navbar";
// // import Footer from "./components/Footer";

// // Route protection
// import PrivateRoute from "./routes/PrivateRoute";

// // Layout wrapper to control navbar visibility
// const Layout = ({ children }) => {
//   const location = useLocation();
//   const hideNavbar = location.pathname.startsWith("/admin");

//   return (
//     <>
//       {!hideNavbar && <Navbar />}
//       {children}
//     </>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/skills" element={<Skills />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/experiences" element={<Experience />} />
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/test" element={<Test />} />
//           <Route path="/blogs/:id" element={<BlogDetail />} />

//           {/* Admin Login */}
//           <Route path="/admin/login" element={<Login />} />

//           {/* Protected Admin Routes */}
//           <Route element={<PrivateRoute />}>
//             <Route path="/admin/dashboard" element={<Dashboard />} />
//             <Route path="/admin/projects" element={<ProjectsAdmin />} />
//             <Route path="/admin/blogs" element={<BlogsAdmin />} />
//             <Route path="/admin/skills" element={<SkillsAdmin />} />
//             <Route path="/admin/experiences" element={<ExperienceAdmin />} />
//             <Route path="/admin/messages" element={<ContactsAdmin />} />
//             <Route path="/admin/upload" element={<UploadImage />} />
//           </Route>

//           {/* 404 Page */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;

import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("API HOST:", process.env.REACT_APP_HOST);
  }, []);

  return (
    <div>
      App Running
    </div>
  );
}

export default App;
