import { Mail, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="pt-24 pb-8 px-6 md:px-12">
      <div className="max-w-4xl mx-auto backdrop-blur-sm bg-background/30 p-8 md:p-12 rounded-lg">
        <div className="space-y-8 mt-16">
          <p className="text-2xl md:text-3xl font-light leading-relaxed">
            Open to full stack roles.
            <span className="text-accent block mt-4">Let's build something together.</span>
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <a
              href="mailto:hello@petryga.com"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth group"
            >
              <Mail className="w-5 h-5 text-accent" />
              <span className="font-mono font-medium">Email</span>
            </a>
            <a
              href="https://github.com/petryga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth group"
            >
              <Github className="w-5 h-5 text-accent" />
              <span className="font-mono font-medium">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/petryga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-smooth group"
            >
              <Linkedin className="w-5 h-5 text-accent" />
              <span className="font-mono font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-32 pt-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-subtle">
          <p>2026  ·  Alexandra Petryga. With <span className="text-accent">♥</span> from the East Bay</p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
