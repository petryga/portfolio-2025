import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import ParticlesBackground from "@/components/ParticlesBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />
      <Navigation />
      <Hero />
      <About />
      <Work />
      <Contact />
    </div>
  );
};

export default Index;
