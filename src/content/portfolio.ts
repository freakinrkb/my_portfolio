/**
 * SINGLE SOURCE OF TRUTH for all personal content.
 * Filled from Raunak Bhardwaj's resume. Project URLs intentionally `#`
 * until real repo/live links are provided. No invented data.
 */

export type SocialLink = {
  label: string;
  href: string;
  username: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  architecture: string;
  challenges: string;
  learnings: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

export const profile = {
  name: "Raunak Bhardwaj",
  title: "Computer Science Graduate | Payments Backend & Full-Stack Developer",
  tagline: "Payments backend & full-stack developer — Spring Boot, Node.js, REST APIs, SQL.",
  bio: "Computer Science graduate with 2 years of experience in software validation, defect analysis, debugging, and process-driven quality workflows. Hands-on building backend and full-stack applications with Java, Spring Boot, Node.js, Express.js, REST APIs, SQL, and database integration — including payment-processing workflows with order creation, signature verification, and transaction handling.",
  email: "ra7nak@gmail.com",
  location: "India",
  availability: "Open to opportunities",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/freakinrkb", username: "@freakinrkb" },
  { label: "LinkedIn", href: "https://linkedin.com/in/freakinrkb", username: "/in/freakinrkb" },
  { label: "LeetCode", href: "https://leetcode.com/ra7nak", username: "/ra7nak · 1900+" },
  { label: "Codeforces", href: "https://codeforces.com/profile/freakinrkb", username: "/freakinrkb · 1500+" },
  { label: "CodeChef", href: "https://codechef.com/users/ra7nak", username: "/ra7nak" },
  { label: "GeeksforGeeks", href: "https://geeksforgeeks.org/user/ra7nak", username: "/ra7nak" },
];

export const techStack: string[] = [
  "Java",
  "Spring Boot",
  "Node.js",
  "Express.js",
  "REST APIs",
  "MySQL",
  "PostgreSQL",
  "Docker",
];

export const projects: Project[] = [
  {
    slug: "razorpay-payment-gateway-backend",
    title: "Razorpay Payment Gateway Backend",
    tagline: "Payment backend with order creation, signature verification & callback handling.",
    description:
      "Payment backend integrating Razorpay APIs to create orders, verify payment signatures, and process payment callbacks. Designed REST APIs for payment initiation, transaction verification, and order management with Spring Boot and JPA/Hibernate.",
    tags: ["Backend", "Payments", "REST API"],
    technologies: ["Spring Boot", "Razorpay API", "MySQL", "JPA", "Docker", "Maven", "Git"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
    architecture:
      "Spring Boot REST layer (payment initiation, verification, order management) over JPA/Hibernate with MySQL; Razorpay order API + webhook/callback intake; Dockerized service built with Maven.",
    challenges:
      "Validating end-to-end payment workflows and debugging request-response failures across order creation, signature verification, and callbacks (tested with Postman).",
    learnings:
      "Consistent validation and exception handling for payment failures keeps API responses predictable and transaction workflows reliable.",
  },
  {
    slug: "investment-tracker-full-stack",
    title: "Investment Tracker — Full-Stack Application",
    tagline: "Portfolio monitoring and profit/loss analysis with REST-backed data flow.",
    description:
      "Full-stack investment tracking application for portfolio monitoring and profit/loss analysis. Frontend–backend communication over REST APIs with database-backed workflows for storing and retrieving application data.",
    tags: ["Full-Stack", "Web App", "REST API"],
    technologies: ["Node.js", "Express.js", "REST APIs", "Database Integration"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
    architecture:
      "Express.js REST backend mediating frontend and database-backed workflows; application data flow managed through REST endpoints.",
    challenges:
      "Debugging and optimizing application workflows to improve performance and reliability across the frontend–backend data flow.",
    learnings:
      "Clear REST boundaries and database-backed workflows make portfolio tracking features easier to extend and debug.",
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Invisible Technologies",
    role: "Freelance Data Evaluation Associate",
    period: "May 2024 – Apr 2026",
    location: "Remote",
    highlights: [
      "Performed functional validation and quality evaluation of AI-powered applications by reproducing defects, analyzing failures, and identifying root causes.",
      "Documented evaluation findings, tracked defects, and verified software behavior against requirements and quality guidelines.",
      "Reviewed recurring error patterns and provided structured feedback to support reliability and output-quality improvements.",
    ],
  },
];

export const skills: Record<string, string[]> = {
  Programming: ["Java", "JavaScript", "C++", "SQL"],
  "Payments & Backend": [
    "Payment API Integration",
    "Transaction Workflows",
    "REST APIs",
    "Spring Boot",
    "Node.js / Express.js",
    "JPA / Hibernate",
    "Spring Security",
  ],
  "Databases & Tools": ["MySQL", "PostgreSQL", "MongoDB", "Git", "Docker", "Postman", "Linux"],
  "Quality & Reliability": [
    "Debugging",
    "API Testing",
    "Root Cause Analysis",
    "Software Validation",
    "Defect Analysis",
    "Exception Handling",
  ],
};

export const achievements: { title: string; detail: string }[] = [
  {
    title: "Backend Development with Spring Boot — Coding Shuttle",
    detail: "Completed certification in backend development with Spring Boot.",
  },
  {
    title: "GATE CSE 2026 Qualified",
    detail: "Foundations in Data Structures, Algorithms, OS, DBMS, Computer Networks, Software Engineering.",
  },
  {
    title: "500+ algorithmic problems solved",
    detail: "Across LeetCode and Codeforces — analytical thinking, debugging, problem-solving.",
  },
  {
    title: "1900+ LeetCode · 1500+ Codeforces",
    detail: "Consistent competitive programming practice.",
  },
];

export const education: EducationItem[] = [
  {
    school: "Chandigarh University",
    degree: "B.E. in Computer Science",
    period: "2021 – 2025",
    detail: "CGPA: 7.74",
  },
  {
    school: "Vikas Vidyalaya",
    degree: "Senior Secondary (Class XII)",
    period: "2020",
    detail: "86%",
  },
  {
    school: "D.A.V Public School",
    degree: "Secondary (Class X)",
    period: "2018",
    detail: "88%",
  },
];

/** No testimonials in resume — section renders only when non-empty. */
export const testimonials: { quote: string; author: string; role: string }[] = [];
