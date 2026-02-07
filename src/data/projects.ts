export interface ProjectDetail {
  id: string;
  name: string;
  organization: string;
  skill: string;
  year: string;
  image: string;
  title: string;
  description: string;
  industry: string;
  technology: string[];
  role: string;
  classifications: string;
  challenges: string[];
  solutions: string[];
  images: string[];
}

export const projects: ProjectDetail[] = [
  {
    id: "centrium-sabertooth",
    name: "Centrium - ",
    organization: "Sabertooth",
    skill: "Frontend",
    year: "2024",
    image: "/assets/projects/centrium.png",
    title: "Centrium - Sabertooth",
    description:
      "A smart contract—powered social media content hub for publishing blogs, articles, and posts focused on Web3 topics, built on the Binance Smart Chain network.",
    industry: "Web3, Social, Blockchain",
    technology: ["React", "Web3js", "Tanstack"],
    role: "Frontend Developer",
    classifications: "Released",
    challenges: [
      "Scattered Web3 Content",
      "No streamlined way to find instructions for Web3 activities",
      "Complex Platforms with steep learning curves",
    ],
    solutions: [
      "Aggregated Web3 Content in one place",
      "Integrated step-by-step guides for Web3 tasks",
      "Simplified UI/UX for easier onboardings",
    ],
    images: [
      "/assets/projects/centrium.png",
      "/assets/projects/centrium.png",
      "/assets/projects/centrium.png",
    ],
  },
  {
    id: "top-special-ops",
    name: "TopSpecial Ops - ",
    organization: "Bakery",
    skill: "Fullstack",
    year: "2025",
    image: "/assets/projects/top-special.png",
    title: "TopSpecial Ops - Bakery",
    description:
      "An advanced operations management system for a high-volume bakery, streamlining production and delivery workflows.",
    industry: "Food Tech, Logistics",
    technology: ["Next.js", "Node.js", "PostgreSQL"],
    role: "Lead Fullstack Developer",
    classifications: "Production",
    challenges: [
      "Real-time inventory tracking",
      "Route optimization for multi-stop deliveries",
      "Legacy system integration",
    ],
    solutions: [
      "Custom inventory management module",
      "Google Maps API integration for routing",
      "RESTful API bridge for legacy data",
    ],
    images: [
      "/assets/projects/top-special.png",
      "/assets/projects/top-special.png",
      "/assets/projects/top-special.png",
    ],
  },
  {
    id: "purple-combinator",
    name: "Purple Combinator - ",
    organization: "Startup Platform",
    skill: "Fullstack",
    year: "2024",
    image: "/assets/projects/purple-combinator.png",
    title: "Purple Combinator",
    description:
      "An investment ecosystem connecting early-stage startups with strategic investors and resources.",
    industry: "FinTech, VC",
    technology: ["React", "Supabase", "Tailwind"],
    role: "Senior Developer",
    classifications: "Beta",
    challenges: [
      "Complex user permission levels",
      "Secure document sharing for due diligence",
      "Real-time deal flow updates",
    ],
    solutions: [
      "RBAC implemented via Supabase Auth",
      "Encrypted storage for sensitive files",
      "WebSocket-based notification system",
    ],
    images: [
      "/assets/projects/purple-combinator.png",
      "/assets/projects/purple-combinator.png",
      "/assets/projects/purple-combinator.png",
    ],
  },
  {
    id: "fpl-pulse",
    name: "FPL Pulse - ",
    organization: "Startup Platform",
    skill: "Frontend",
    year: "2025",
    image: "/assets/projects/fpl-pulse.png",
    title: "FPL Pulse",
    description:
      "A data-driven analytics dashboard for Fantasy Premier League managers to optimize their team selection.",
    industry: "Sports Tech, Analytics",
    technology: ["TypeScript", "React", "Chart.js"],
    role: "Frontend Engineer",
    classifications: "Released",
    challenges: [
      "Processing large datasets from FPL API",
      "Visualizing player performance trends",
      "Mobile-first responsive design",
    ],
    solutions: [
      "Optimized data transformations using Web Workers",
      "Custom interactive charts and heatmaps",
      "Grid-based responsive layout",
    ],
    images: [
      "/assets/projects/fpl-pulse.png",
      "/assets/projects/fpl-pulse.png",
      "/assets/projects/fpl-pulse.png",
    ],
  },
  {
    id: "n8n-lead-generation",
    name: "N8N Lead Generation",
    organization: "",
    skill: "Automation",
    year: "2026",
    image: "/assets/projects/n8n-leads.png",
    title: "N8N Lead Generation",
    description:
      "Automated workflow system for capturing, qualifying, and distributing leads across various CRM platforms.",
    industry: "Marketing, Automation",
    technology: ["n8n", "OpenAI", "Zapier"],
    role: "Automation Architect",
    classifications: "Internal Tool",
    challenges: [
      "Lead scoring using AI",
      "Syncing data between disparate tools",
      "Scalability of webhooks",
    ],
    solutions: [
      "LLM-based lead categorization",
      "Centralized n8n workflow engine",
      "Queue-based webhook handling",
    ],
    images: [
      "/assets/projects/n8n-leads.png",
      "/assets/projects/n8n-leads.png",
      "/assets/projects/n8n-leads.png",
    ],
  },
  {
    id: "aguda-partners",
    name: "Aguda Partners ",
    organization: "Website",
    skill: "Frontend",
    year: "2025",
    image: "/assets/projects/aguda.png",
    title: "Aguda Partners Website",
    description:
      "A premium corporate website for a strategic advisory firm, emphasizing trust and professional excellence.",
    industry: "Professional Services",
    technology: ["React", "Framer Motion", "CSS Modules"],
    role: "Frontend Developer",
    classifications: "Live",
    challenges: [
      "High-fidelity animations",
      "Multi-language support",
      "Performance optimization for core web vitals",
    ],
    solutions: [
      "Custom Framer Motion transitions",
      "i18next integration",
      "Next-gen image formats and lazy loading",
    ],
    images: [
      "/assets/projects/aguda.png",
      "/assets/projects/aguda.png",
      "/assets/projects/aguda.png",
    ],
  },
];
