import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="max-w-4xl w-full">
        <div className="space-y-6 animate-fade-in backdrop-blur-sm bg-background/30 p-8 md:p-12 rounded-lg">
          <p className="text-subtle text-sm md:text-base font-light tracking-wide uppercase">
            Alexandra Petryga · Full Stack Software Engineer
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            Building thoughtful
            <br />
            <span className="font-medium">digital experiences</span>
          </h1>
          <p className="text-lg md:text-xl text-subtle max-w-2xl font-light leading-relaxed animate-fade-in-delay">
            Working with React, Node.js, and the tools that tie them together, I
            enjoy shaping ideas into systems that move effortlessly from
            database to browser.
          </p>
          <div className="pt-4 animate-fade-in-delay">
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth group"
            >
              <span className="font-medium">View my work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
