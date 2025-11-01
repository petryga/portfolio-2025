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
            I’m a software engineer who enjoys working across the full stack —
            from crafting clean, intuitive interfaces to building reliable and
            maintainable backend systems.
          </p>
          <p className="text-subtle">
            I care about writing code that’s clear, purposeful, and easy to work
            with over time. <br /> My goal is to create practical solutions that
            serve both the product and the people who build and use it.
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
                    className="px-4 py-2 text-sm surface-subtle rounded-full text-foreground hover:text-accent hover:scale-105 transition-smooth"
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
