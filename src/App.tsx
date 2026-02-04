import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-black font-satoshi text-white selection:bg-white selection:text-black">
      <Header />
      <Hero />
    </div>
  );
}

export default App;
