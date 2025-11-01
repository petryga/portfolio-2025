import { useState, useEffect } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
        <a
          href="#"
          className="text-sm font-medium tracking-wide hover:text-accent transition-smooth"
        >
          Alexandra Petryga
        </a>

        <div className="flex gap-8 text-sm font-light">
          <a href="#about" className="hover:text-accent transition-smooth">
            About
          </a>
          <a href="#work" className="hover:text-accent transition-smooth">
            Work
          </a>
          <a href="#contact" className="hover:text-accent transition-smooth">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
