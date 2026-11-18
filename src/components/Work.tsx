import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Lock } from "lucide-react";
import goveyanceImg from "@/assets/9.webp";
import jobTrackerImg from "@/assets/10.webp";
import readyWhenImg from "@/assets/6.webp";
// The previous screenshot (monthly chart) is src/assets/3.webp, kept to switch back to.
import expenseTrackerImg from "@/assets/expense-tracker-ai-review.webp";
import vaporwavePortfolioImg from "@/assets/7.webp";
import firstPortfolioImg from "@/assets/5.webp";
import blackAndWhitePortfolioImg from "@/assets/4.webp";

const projects = [
  {
    title: "GoVeyance",
    description:
      "Legal tech for real estate transactions: software BC and Ontario law firms and notaries use to close property sales. Designed and built the closing funds calculation engine from scratch, launch-critical for the company's expansion into Ontario: a typed, config-driven design that document generation reused and later features plugged into. Also built the law-firm billing behind every client bill (BC's tax-aware Account Library) and the Payout Investors module for GoVeyance's industry-first private-lending workflow.",
    tech: ["React", "TypeScript", "AWS Lambda", "PostgreSQL", "Sequelize"],
    image: goveyanceImg,
    link: "https://goveyance.com/",
  },
  {
    title: "ReadyWhen",
    description: "Wills & inheritance planning platform with client + notary portals and a secure document vault. Built 40+ forms within its JSON Schema-driven form system, plus forms for the internal admin portal staff use, backed by serverless REST APIs. React/TS frontend, serverless Node backend.",
    tech: ["React", "TypeScript", "JSON Schema", "Node.js", "PostgreSQL"],
    image: readyWhenImg,
    link: "https://readywhen.com/",
  },
  {
    title: "Expense Tracker",
    description:
      "Built for myself after my budgeting app was discontinued, then turned into my AI project. A Python (FastAPI) service suggests a category for each imported card transaction with Claude and structured output: 76% accurate against a 60% rules baseline. For Amazon orders it retrieves my own similar past purchases (local embeddings, pgvector), which added about 12 points in a three-arm eval. An in-app assistant answers spending questions through tool calls to my MCP server, with read-only tools and step and time limits, and passes its 12-question eval every run. The public demo shows precomputed suggestions; the model runs locally. Also: auth, a demo account that resets on login, Sentry, and CI across four repos.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Python", "FastAPI", "Claude API", "pgvector", "MCP"],
    image: expenseTrackerImg,
    link: "https://expense-tracker-fe-nu.vercel.app/",
    code: "https://github.com/petryga/expense-tracker-AI",
  },
  {
    title: "Kanban board",
    description: "I made this Kanban board with optimistic drag-and-drop for tracking job applications / todo lists / custom entries before I found out that Notion already had it all. Redux Toolkit for state, reordering persisted to MongoDB.",
    tech: ["React", "TypeScript", "Redux Toolkit", "Node.js", "MongoDB"],
    image: jobTrackerImg,
    link: "https://job-tracker-ibdv.onrender.com/",
    code: "https://github.com/petryga/job-tracker",
  },
  {
    title: "Support Portal",
    description:
      "Internal back-office tool for customer support staff managing law firm and notary accounts. Owned default data seeding on company creation — schema migrations and seeding logic auto-provisioning checklists, templates, and fees, with BC/Ontario separation.",
    tech: ["React", "TypeScript", "Node.js", "AWS Lambda", "PostgreSQL"],
  },
  {
    title: "Landing Page 2024",
    description: "GSAP scroll-driven animations — my GSAP obsession year.",
    tech: ["React", "HTML/CSS", "GSAP"],
    image: blackAndWhitePortfolioImg,
    link: "https://petryga.github.io/portfolio-2024/",
    code: "https://github.com/petryga/portfolio-2024",
  },
  {
    title: "Landing Page 2021",
    description: "Vanilla JS/CSS, zero frameworks, custom animations. From my vaporwave era.",
    tech: ["JavaScript", "HTML/CSS"],
    image: vaporwavePortfolioImg,
    link: "https://petryga.github.io/portfolio-2021/",
    code: "https://github.com/petryga/portfolio-2021",
  },
  {
    title: "Landing Page 2020",
    description: "First shipped project — hand-rolled HTML/CSS/JS.",
    tech: ["JavaScript", "HTML/CSS"],
    image: firstPortfolioImg,
    link: "https://petryga.github.io/portfolio-2020/",
    code: "https://github.com/petryga/portfolio-2020",
  },
];

const scripts = [
  {
    title: "GAIA Benchmark Agent",
    description:
      "Final project for the Hugging Face Agents Course — a smolagents CodeAgent answering GAIA benchmark questions. Graded by exact string match, so formatting the answer mattered as much as finding it. Tavily search and page-reading tools, Gemini Flash behind LiteLLM.",
    tech: ["smolagents", "Python", "Gemini", "Tavily", "Gradio"],
  },
  {
    title: "Waste Sorting Classifier",
    description:
      "fastai vision model that classifies a photo into material type, then maps it to the right disposal bin (recyclable / compost / landfill) with a confidence threshold for uncertain guesses. FastAPI backend serving predictions to a small web frontend.",
    tech: ["Python", "FastAPI", "fastai"],
  },
  {
    title: "Home Assistant Voice Pipeline",
    description:
      "Self-hosted voice home assistant — customized ESPHome firmware config for a ReSpeaker Lite satellite, Whisper STT (Wyoming), Piper TTS, Ollama (qwen3:4b) as the conversation agent. Voice automations for climate, lighting, navigation, and weather/AQI.",
    tech: ["ESPHome", "Whisper", "Piper TTS", "Ollama", "YAML"],
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
];

const Work = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-12 surface-subtle">
      <div className="max-w-6xl mx-auto backdrop-blur-sm bg-background/30 p-8 md:p-12 rounded-lg">
        <h2 className="text-sm uppercase tracking-wide text-subtle mb-12 font-mono">
          Selected Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 ">
          {projects.map((project, index) => {
            const inner = (
              <>
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
                    {project.code && (
                      <a
                        href={project.code}
                        data-umami-event="project-code-click"
                        data-umami-event-project={project.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 mb-4 inline-flex w-fit items-center gap-1.5 font-mono text-xs text-subtle hover:text-accent transition-smooth"
                      >
                        <Github className="w-3.5 h-3.5" strokeWidth={1.5} />
                        Code on GitHub
                      </a>
                    )}
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
              </>
            );
            const shared = "project group block h-full flex flex-col";
            // A card with a code link can't be one big link (links can't nest):
            // the demo link is stretched over the card, the code link sits above it.
            if (project.link && project.code) {
              return (
                <div key={index} className={`${shared} relative cursor-pointer`}>
                  {inner}
                  <a
                    href={project.link}
                    aria-label={`${project.title} live demo`}
                    data-umami-event="project-click"
                    data-umami-event-project={project.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-0 rounded-lg"
                  />
                </div>
              );
            }
            return project.link ? (
              <a
                key={index}
                href={project.link}
                data-umami-event="project-click"
                data-umami-event-project={project.title}
                target="_blank"
                rel="noopener noreferrer"
                className={`${shared} cursor-pointer`}
              >
                {inner}
              </a>
            ) : (
              <div key={index} className={`${shared} cursor-default`}>
                {inner}
              </div>
            );
          })}
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
