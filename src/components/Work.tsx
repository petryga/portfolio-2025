import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import goveyanceImg from "@/assets/9.jpeg";
import jobTrackerImg from "@/assets/10.jpg";
import readyWhenImg from "@/assets/6.jpeg";
import adminPortalImg from "@/assets/8.jpeg";
import expenseTrackerImg from "@/assets/3.jpeg";
import vaporwavePortfolioImg from "@/assets/7.jpeg";
import firstPortfolioImg from "@/assets/5.jpeg";
import blackAndWhitePortfolioImg from "@/assets/4.jpeg";

const projects = [
  {
    title: "Goveyance",
    description:
      "Platform for managing property transactions and legal documents.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    role: "Full Stack Developer",
    image: goveyanceImg,
    link: "https://goveyance.com/",
  },
  {
    title: "ReadyWhen",
    description: "Digital estate planning and management platform.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    role: "Full Stack Developer",
    image: readyWhenImg,
    link: "https://readywhen.com/",
  },
  {
    title: "Admin Portal",
    description: "Dashboard for managing users, roles, and organizations.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    role: "Full Stack Developer",
    image: adminPortalImg,
    link: "https://admin.app.readywhen.ca/",
  },
  {
    title: "Job Tracker",
    description: "Kanban board for tracking job applications and tasks.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    role: "Full Stack Developer",
    image: jobTrackerImg,
    link: "https://job-tracker-ibdv.onrender.com/",
  },
  {
    title: "Expense Tracker",
    description: "Tracks income, expenses, and visualizes data with charts.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    role: "Full Stack Developer",
    image: expenseTrackerImg,
    link: null,
  },
  {
    title: "Landing Page 2024",
    description: "Responsive landing page with smooth GSAP animations.",
    tech: ["React", "HTML/CSS", "GSAP"],
    role: "Frontend Developer",
    image: blackAndWhitePortfolioImg,
    link: "https://petryga.github.io/portfolio-2024/",
  },
  {
    title: "Landing Page 2021",
    description: "Responsive and optimized landing page.",
    tech: ["JavaScript", "HTML/CSS"],
    role: "Frontend Developer",
    image: vaporwavePortfolioImg,
    link: "https://petryga.github.io/portfolio-2021/",
  },
  {
    title: "Landing Page 2020",
    description: "Early portfolio",
    tech: ["JavaScript", "HTML/CSS"],
    role: "Frontend Developer",
    image: firstPortfolioImg,
    link: "https://petryga.github.io/portfolio-2020/",
  },
];

const Work = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-12 surface-subtle">
      <div className="max-w-6xl mx-auto backdrop-blur-sm bg-background/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-sm uppercase tracking-wide text-subtle mb-12 font-light">
          Selected Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8 ">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                project.link
                  ? "group cursor-pointer block"
                  : "group cursor-default block"
              }`}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-muted border border-border">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-smooth group-hover:scale-105"
                />
              </div>
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-xl font-medium group-hover:text-accent transition-smooth">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-subtle mt-2">
                    {project.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 font-light min-h-[50px]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 surface-subtle rounded-full text-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
