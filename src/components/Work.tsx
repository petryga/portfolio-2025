import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import goveyanceImg from "@/assets/9.jpeg";
import jobTrackerImg from "@/assets/10.jpg";
import readyWhenImg from "@/assets/6.jpeg";
import expenseTrackerImg from "@/assets/3.jpeg";
import vaporwavePortfolioImg from "@/assets/7.jpeg";
import firstPortfolioImg from "@/assets/5.jpeg";
import blackAndWhitePortfolioImg from "@/assets/4.jpeg";

const projects = [
  {
    title: "GoVeyance",
    description:
      "Legal tech for real estate transactions: software BC and Ontario law firms and notaries use to close property sales. Designed and built Ontario's real-time financial calculation engine and closing-payout system from scratch, using an extensible, type-driven architecture; also built BC's tax-aware Account Library and the Payout Investors module for GoVeyance's industry-first private-lending workflow.",
    tech: ["React", "TypeScript", "AWS Lambda", "PostgreSQL", "Sequelize"],
    image: goveyanceImg,
    link: "https://goveyance.com/",
  },
  {
    title: "ReadyWhen",
    description: "Wills & inheritance planning platform with client + notary portals and a secure document vault. Built 40+ forms within its JSON Schema-driven form system. React/TS frontend, serverless Node backend.",
    tech: ["React", "TypeScript", "JSON Schema", "Node.js", "PostgreSQL"],
    image: readyWhenImg,
    link: "https://readywhen.com/",
  },
  {
    title: "Admin Portal",
    description: "Internal back-office tool for company staff — built out forms for the admin frontend, backed by serverless REST APIs.",
    tech: ["React", "TypeScript", "REST APIs"],
    link: "https://admin.app.readywhen.ca/",
  },
  {
    title: "Support Portal",
    description:
      "Internal back-office tool for customer support staff managing law firm and notary accounts. Owned default data seeding on company creation — schema migrations and seeding logic auto-provisioning checklists, templates, and fees, with BC/Ontario separation.",
    tech: ["React", "TypeScript", "Node.js", "AWS Lambda", "PostgreSQL"],
  },
  {
    title: "Expense Tracker",
    description: 'Built for myself after the budgeting app I used got discontinued. Tracks income, expenses, recurring transactions, and category budgets, with a net-worth tracker, monthly/yearly expense comparisons, and a cash-flow Sankey diagram. Originally ran locally only — added auth, hosting, and a demo user with seeded data that resets on login — to publish it publicly. CI runs lint, typecheck, and 220+ unit tests across both apps on every push, and applies every migration and seeder to a throwaway Postgres container to catch anything that would break a deploy.',
    tech: ["React", "TypeScript", "Node.js", "Sequelize", "PostgreSQL", "Docker"],
    image: expenseTrackerImg,
    link: "https://expense-tracker-fe-nu.vercel.app/",
  },
  {
    title: "Kanban board",
    description: "I made this Kanban board with optimistic drag-and-drop for tracking job applications / todo lists / custom entries before I found out that Notion already had it all. Redux Toolkit for state, reordering persisted to MongoDB.",
    tech: ["React", "TypeScript", "Redux Toolkit", "Node.js", "MongoDB"],
    image: jobTrackerImg,
    link: "https://job-tracker-ibdv.onrender.com/",
  },
  {
    title: "Landing Page 2024",
    description: "GSAP scroll-driven animations — my GSAP obsession year.",
    tech: ["React", "HTML/CSS", "GSAP"],
    image: blackAndWhitePortfolioImg,
    link: "https://petryga.github.io/portfolio-2024/",
  },
  {
    title: "Landing Page 2021",
    description: "Vanilla JS/CSS, zero frameworks, custom animations. From my vaporwave era.",
    tech: ["JavaScript", "HTML/CSS"],
    image: vaporwavePortfolioImg,
    link: "https://petryga.github.io/portfolio-2021/",
  },
  {
    title: "Landing Page 2020",
    description: "First shipped project — hand-rolled HTML/CSS/JS.",
    tech: ["JavaScript", "HTML/CSS"],
    image: firstPortfolioImg,
    link: "https://petryga.github.io/portfolio-2020/",
  },
];

const scripts = [
  {
    title: "Home Assistant Voice Pipeline",
    description:
      "Self-hosted voice home assistant — customized ESPHome firmware config for a ReSpeaker Lite satellite, Whisper STT (Wyoming), Piper TTS, Ollama (qwen3:4b) as the conversation agent. Voice automations for climate, lighting, navigation, and weather/AQI.",
    tech: ["ESPHome", "Whisper", "Piper TTS", "Ollama", "YAML"],
  },
  {
    title: "Job Search Claude Code Agent",
    description:
      "Claude Code agent with structured context — per-job folders, CLAUDE.md instructions, JSON profile schema for scoring roles against my preferences.",
    tech: ["Claude Code", "Bash", "JSON"],
  },
  {
    title: "Music Library Automation",
    description:
      "Bash pipelines for batch downloading, file organization, dedup, and playlist matching across a multi-thousand-track library.",
    tech: ["Bash", "yt-dlp", 'sldl'],
  },
  {
    title: "macOS Focus-Mode Script",
    description:
      "Bash + AppleScript focus trigger — closes distracting apps, opens VS Code + Notion via deep link, enforces website & application allowlists.",
    tech: ["Bash", "AppleScript", "macOS"],
  },
  {
    title: "Waste Sorting Classifier",
    description:
      "fastai vision model that classifies a photo into material type, then maps it to the right disposal bin (recyclable / compost / landfill) with a confidence threshold for uncertain guesses. FastAPI backend serving predictions to a small web frontend.",
    tech: ["Python", "FastAPI", "fastai"],
  },
];

const Work = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-12 surface-subtle">
      <div className="max-w-6xl mx-auto backdrop-blur-sm bg-background/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-sm uppercase tracking-wide text-subtle mb-12 font-mono">
          Selected Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 ">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${project.link
                ? "group cursor-pointer block h-full flex flex-col"
                : "group cursor-default block h-full flex flex-col"
                }`}
            >
              <div className="relative overflow-hidden rounded-t-lg aspect-video bg-muted border border-border border-b-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-smooth group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-subtle">
                    <Lock className="w-6 h-6" strokeWidth={1.5} />
                    <span className="font-mono text-xs">Internal tool — no public preview</span>
                  </div>
                )}
              </div>
              <Card className="border-accent/30 bg-card shadow-none flex-1 flex flex-col rounded-t-none rounded-b-lg">
                <CardHeader>
                  <CardTitle className="font-mono text-lg font-medium leading-normal tracking-normal group-hover:text-accent transition-smooth">
                    {project.title}
                  </CardTitle>

                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-base text-muted-foreground mb-8 font-light leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2 py-0.5 surface-subtle rounded-full border border-accent/30 text-subtle"
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

        <h2 className="text-sm uppercase tracking-wide text-subtle mb-8 mt-16 font-mono">
          Scripts, Automation & Experiments
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {scripts.map((script) => (
            <div
              key={script.title}
              className="terminal-card rounded-lg p-6 h-full flex flex-col"
            >
              <h3 className="terminal-prompt font-mono text-lg font-medium mb-0">
                {script.title}
              </h3>
              <p className="text-base text-muted-foreground font-light mt-6 mb-8 leading-relaxed flex-1">
                {script.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {script.tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 surface-subtle rounded-full border border-accent/30 text-subtle"
                  >
                    {tech}
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

export default Work;
