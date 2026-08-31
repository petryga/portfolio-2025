import { Suspense, lazy } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

// The particle field is decorative and pulls in the tsparticles engine (~120 kB),
// so it is split into its own chunk and loaded after the page content.
const ParticlesBackground = lazy(() => import("@/components/ParticlesBackground"));

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Suspense fallback={null}>
        <ParticlesBackground />
      </Suspense>
      <Navigation />
      <Hero />
      <About />
      <Work />
      <Contact />
    </div>
  );
};

export default Index;
