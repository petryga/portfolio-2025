import { skillCategories } from "@/data/skills";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto backdrop-blur-sm bg-background/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-sm uppercase tracking-wide text-subtle mb-8 font-light">
          About
        </h2>
        <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed">
          <p>
            I grew from frontend into full-stack at an early-stage legal tech startup — schema to UI,
            backend logic to frontend polish, whatever a feature called for.
          </p>
          <p>
            Off the clock, I run a home server, build voice automations, and script away anything I have to do twice.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {skillCategories.map((category) => (
            <div key={category.category}>
              <h3 className="text-xs uppercase tracking-wide text-subtle mb-3 font-light">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono px-4 py-2 text-sm surface-subtle rounded-full border border-accent/30 text-foreground hover:text-accent hover:scale-105 transition-smooth"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default About;
