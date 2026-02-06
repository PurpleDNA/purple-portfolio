import Header from "./components/Header";
import Hero from "./components/Hero";
import BackgroundMusic from "./components/BackgroundMusic";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-black font-satoshi text-white selection:bg-white selection:text-black">
      <BackgroundMusic />
      <Header />
      <div className="pt-20">
        <Hero />
        <Projects />
        <Profile />
        <Contact />
      </div>
    </div>
  );
}

export default App;
