import Header from "./components/Header";
import Hero from "./components/Hero";
import BackgroundMusic from "./components/BackgroundMusic";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="min-h-screen bg-black font-satoshi text-white selection:bg-white selection:text-black">
      <BackgroundMusic />
      <Header />
      <Hero />
      <Projects />
    </div>
  );
}

export default App;
