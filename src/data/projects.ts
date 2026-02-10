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
  link?: string;
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
    classifications: "Beta",
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
      "/assets/centrium/landing.png",
      "/assets/centrium/connect-wallet.png",
      "/assets/centrium/connected.png",
      "/assets/centrium/home.png",
      "/assets/centrium/search.png",
      "/assets/centrium/notifications.png",
      "/assets/centrium/create-modal.png",
      "/assets/centrium/create-post.png",
      "/assets/centrium/create-guide.png",
      "/assets/centrium/profile.png",
      "/assets/centrium/dark-mode.png",
    ],
    link: "https://centrium-w3.vercel.app/",
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
      "A comprehensive business management platform designed for a bread manufacturing business. Its primary goal is to digitize and streamline the tracking of production, sales, customer debts, and operational expenses to enable data-driven decision-making.",
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
      "/assets/top-special/1home.png",
      "/assets/top-special/2recents.png",
      "/assets/top-special/3all-productions.png",
      "/assets/top-special/4all-customers.png",
      "/assets/top-special/5sales.png",
      "/assets/top-special/6customer-dashboard.png",
      "/assets/top-special/7production-dashboard.png",
      "/assets/top-special/8production-dashboard.png",
      "/assets/top-special/9add-customer.png",
      "/assets/top-special/10settings.png",
      "/assets/top-special/11darkmode.png",
    ],
    link: "",
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
      " A startup directory platform where users can discover, share, and pitch startup ideas, featuring user profiles and a content management system. ",
    industry: "FinTech, VC",
    technology: ["React", "Sanity", "Tailwind"],
    role: "Fullstack Developer",
    classifications: "Production",
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
      "/assets/purple-combinator/login.png",
      "/assets/purple-combinator/hero.png",
      "/assets/purple-combinator/startups.png",
      "/assets/purple-combinator/startup-page.png",
      "/assets/purple-combinator/pitch-details.png",
      "/assets/purple-combinator/profile.png",
      "/assets/purple-combinator/your-profile.png",
    ],
    link: "https://yc-directory-82ol.vercel.app/",
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
      "Fantasy Premier League (FPL) mini-league tracker. Displays gameweek standings with net points (total points minus transfer costs) for a private league.",
    industry: "Sports Tech, Analytics",
    technology: ["TypeScript", "React", "Tanstack"],
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
      "/assets/fpl-pulse/home.png",
      "/assets/fpl-pulse/list.png",
      "/assets/fpl-pulse/gameweek.png",
      "/assets/fpl-pulse/minus.png",
    ],
    link: "https://fpl-xi.vercel.app/",
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
      "n8n automation pipeline that scrapes and analyzes private healthcare businesses for website improvement opportunities. Scheduled to run daily, automatically compiling qualified leads into a structured Excel report.",
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
      "/assets/n8n-leads-generator/leads.png",
    ],
    link: "",
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
    link: "https://www.agudapartners.ca",
  },
];
