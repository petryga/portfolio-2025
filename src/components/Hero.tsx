import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="max-w-4xl w-full">
        <div className="space-y-6 animate-fade-in backdrop-blur-sm bg-background/30 p-8 md:p-12 rounded-lg">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight">
            I ship features
            <br />
            <span className="font-medium text-accent">that move money</span>
          </h1>
          <p className="text-lg md:text-xl text-subtle font-light animate-fade-in-delay">
            5+ years of full stack work where correctness actually matters —
            real-time financial calculations, complex API integrations,
            and document automation.
          </p>
          <div className="pt-4 flex items-center gap-6 animate-fade-in-delay">
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth group"
            >
              <span className="font-mono font-medium">View my work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
