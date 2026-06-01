import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── Admin User ──────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log(`✅ Admin user: ${user.email} / password: admin123`);

  // ── Projects ────────────────────────────────────────
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform built with Next.js, featuring product listings, cart management, Stripe payments, and an admin dashboard for inventory management. Handles 10k+ monthly visitors with 99.9% uptime.",
      techStack: ["Next.js", "TypeScript", "Prisma", "Stripe", "PostgreSQL", "Tailwind"],
      liveUrl: "https://example-shop.vercel.app",
      githubUrl: "https://github.com/username/ecommerce",
      featured: true,
      order: 1,
    },
    {
      title: "Real-Time Chat Application",
      description:
        "A real-time messaging app with WebSocket support, typing indicators, read receipts, and file sharing. Supports group chats, direct messages, and message search functionality.",
      techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      liveUrl: "https://chat-app.example.com",
      githubUrl: "https://github.com/username/realtime-chat",
      featured: true,
      order: 2,
    },
    {
      title: "Task Management Dashboard",
      description:
        "A Kanban-style project management tool with drag-and-drop boards, task assignments, due dates, and team collaboration features. Includes real-time updates and notification system.",
      techStack: ["React", "TypeScript", "GraphQL", "PostgreSQL", "Docker"],
      liveUrl: null,
      githubUrl: "https://github.com/username/taskflow",
      featured: false,
      order: 3,
    },
    {
      title: "Weather Forecast App",
      description:
        "A progressive web app for detailed weather forecasts with interactive maps, severe weather alerts, and location-based notifications. Uses OpenWeatherMap API for data.",
      techStack: ["React", "PWA", "OpenWeatherMap API", "Chart.js", "CSS Modules"],
      liveUrl: "https://weather.example.com",
      githubUrl: "https://github.com/username/weather-pwa",
      featured: false,
      order: 4,
    },
    {
      title: "REST API Microservices",
      description:
        "A set of microservices for user management, authentication, and content delivery. Built with Express, featuring rate limiting, caching, comprehensive logging, and API documentation via Swagger.",
      techStack: ["Node.js", "Express", "Redis", "Docker", "Swagger", "Jest"],
      liveUrl: null,
      githubUrl: "https://github.com/username/microservices-api",
      featured: false,
      order: 5,
    },
    {
      title: "Portfolio CMS",
      description:
        "A headless CMS for managing portfolio content with a clean admin interface, markdown support, image optimization, and automated deployments. Built for developers who want full control.",
      techStack: ["Next.js", "TypeScript", "Prisma", "Cloudinary", "PostgreSQL"],
      liveUrl: null,
      githubUrl: "https://github.com/username/portfolio-cms",
      featured: false,
      order: 6,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ ${projects.length} projects seeded`);

  // ── Skills ──────────────────────────────────────────
  const skills = [
    // Frontend
    { name: "React", category: "Frontend", proficiencyLevel: 95, iconName: "code", order: 1 },
    { name: "Next.js", category: "Frontend", proficiencyLevel: 92, iconName: "code", order: 2 },
    { name: "TypeScript", category: "Frontend", proficiencyLevel: 90, iconName: "code", order: 3 },
    { name: "Vue.js", category: "Frontend", proficiencyLevel: 75, iconName: "code", order: 4 },
    { name: "HTML/CSS", category: "Frontend", proficiencyLevel: 95, iconName: "palette", order: 5 },
    { name: "Tailwind CSS", category: "Frontend", proficiencyLevel: 88, iconName: "palette", order: 6 },
    // Backend
    { name: "Node.js", category: "Backend", proficiencyLevel: 93, iconName: "database", order: 7 },
    { name: "Express", category: "Backend", proficiencyLevel: 90, iconName: "database", order: 8 },
    { name: "Python", category: "Backend", proficiencyLevel: 70, iconName: "database", order: 9 },
    { name: "GraphQL", category: "Backend", proficiencyLevel: 78, iconName: "database", order: 10 },
    { name: "PostgreSQL", category: "Backend", proficiencyLevel: 85, iconName: "database", order: 11 },
    { name: "MongoDB", category: "Backend", proficiencyLevel: 82, iconName: "database", order: 12 },
    // DevOps
    { name: "Docker", category: "DevOps", proficiencyLevel: 80, iconName: "cloud", order: 13 },
    { name: "AWS", category: "DevOps", proficiencyLevel: 72, iconName: "cloud", order: 14 },
    { name: "CI/CD", category: "DevOps", proficiencyLevel: 85, iconName: "cloud", order: 15 },
    // Tools
    { name: "Git", category: "Tools", proficiencyLevel: 93, iconName: "wrench", order: 16 },
    { name: "Figma", category: "Tools", proficiencyLevel: 65, iconName: "palette", order: 17 },
    { name: "VS Code", category: "Tools", proficiencyLevel: 95, iconName: "wrench", order: 18 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`✅ ${skills.length} skills seeded`);

  // ── Certificates ────────────────────────────────────
  const certificates = [
    {
      courseName: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      issueDate: new Date("2024-10-15"),
      credentialUrl: "https://credential.example.com/aws-saa",
      skillsLearned: ["AWS", "Cloud Architecture", "Serverless", "Security"],
    },
    {
      courseName: "Meta Frontend Developer",
      issuer: "Meta (Coursera)",
      issueDate: new Date("2024-06-20"),
      credentialUrl: "https://credential.example.com/meta-frontend",
      skillsLearned: ["React", "JavaScript", "UI/UX", "Testing"],
    },
    {
      courseName: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      issueDate: new Date("2025-02-08"),
      credentialUrl: "https://credential.example.com/gcp-dev",
      skillsLearned: ["GCP", "Kubernetes", "Cloud Run", "Monitoring"],
    },
  ];

  for (const cert of certificates) {
    await prisma.certificate.create({ data: cert });
  }
  console.log(`✅ ${certificates.length} certificates seeded`);

  // ── Sample Messages ─────────────────────────────────
  const messages = [
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      message:
        "Hi! I saw your portfolio and I'm really impressed by your work on the e-commerce platform. Would you be interested in discussing a potential freelance project? We're looking for a developer to build a custom booking system.",
      isRead: false,
    },
    {
      name: "Mike Chen",
      email: "mike.chen@techcorp.com",
      message:
        "Hey, we have an opening for a senior full-stack developer at TechCorp and your portfolio caught our attention. Your experience with Next.js and TypeScript aligns perfectly with our tech stack. Would love to schedule a call!",
      isRead: false,
    },
  ];

  for (const msg of messages) {
    await prisma.message.create({ data: msg });
  }
  console.log(`✅ ${messages.length} sample messages seeded`);

  console.log("\n🎉 Seed complete!");
  console.log("──────────────────────────────────────");
  console.log("Admin login:");
  console.log("  Email:    admin@example.com");
  console.log("  Password: admin123");
  console.log("  URL:      http://localhost:3000/dashboard-secret");
  console.log("──────────────────────────────────────\n");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
