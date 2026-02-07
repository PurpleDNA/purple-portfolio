import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BackgroundMusic from "./components/BackgroundMusic";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import ProjectDetails from "./components/ProjectDetails";
// noice

const Home = () => (
  <div className="pt-20">
    <Hero />
    <Projects />
    <Profile />
    <Contact />
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black font-satoshi text-white selection:bg-white selection:text-black">
        <BackgroundMusic />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
