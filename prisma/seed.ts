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
  // Only insert projects that don't already exist (by title)
  const projects = [
    // ── Featured (order 1-6) ──────────────────────────
    {
      title: "Hoppr",
      description:
        "A mobile-first web app for discovering bars, events, promotions, and VIP passes in Finland. Features a unified discover feed with time filters, real-time chat via Socket.io, event management with multi-venue support, QR code passes, and user profiles with activity history.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Render", "Styled Components", "Socket.io"],
      liveUrl: "https://barhop-project.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/barhop-project",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1762840883/Screenshot_2025-11-11_at_7.55.51_lilrkp.png",
      featured: true,
      order: 1,
    },
    {
      title: "Hoppr Business",
      description:
        "Professional bar management platform with dual portals for platform administrators and bar staff. Features bar CRUD with CSV import, AI-powered content creation for promotions and events, QR code scanning, analytics dashboards, staff management, and a content compliance engine.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Render", "Vercel", "Styled Components", "Recharts"],
      liveUrl: "https://hoppr-business.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/hoppr-business",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1762841963/Screenshot_2025-11-11_at_8.18.19_qpmhdn.png",
      featured: true,
      order: 2,
    },
    {
      title: "Finnish Buddy",
      description:
        "AI-powered language learning platform for mastering Finnish from A1 to advanced levels. Features AI-generated lessons covering vocabulary, grammar, and conversational skills with personalized learning paths powered by DeepSeek AI, progress tracking, and interactive exercises.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth.js", "DeepSeek AI", "Styled Components"],
      liveUrl: "https://finnish-buddy.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/finnish-buddy",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1778839263/Screenshot_2026-05-15_at_12.54.26_k7xk9y.png",
      featured: true,
      order: 3,
    },
    {
      title: "JOBLYS AI",
      description:
        "AI-powered platform that helps job seekers find suitable job opportunities by analyzing their skills and experience. Features intelligent job matching, personalized recommendations, and a streamlined application process.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Styled Components"],
      liveUrl: "https://joblys-project-six.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/joblys-project",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1700513263/Screenshot_2023-11-20_at_22.46.01_zttgwx.png",
      featured: true,
      order: 4,
    },
    {
      title: "eazyCV",
      description:
        "Streamline your job application process with eazyCV, the ultimate platform for creating tailored CVs and cover letters. Features AI-powered document generation, multiple templates, and an intuitive builder interface.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Styled Components"],
      liveUrl: "https://app.eazycv.ai/en",
      githubUrl: "https://github.com/iamtigermaximus/joblys-project",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1729782784/Screenshot_2024-10-24_at_18.09.36_ldclh8.png",
      featured: true,
      order: 5,
    },
    {
      title: "Kabayan Konek",
      description:
        "Kabayan Konek is a platform that connects Filipinos in Finland. It serves as a community hub for events, networking, and shared resources, helping the Filipino diaspora stay connected and informed about local opportunities.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Supabase", "Styled Components", "NextAuth.js"],
      liveUrl: "https://www.kabayankonek.com",
      githubUrl: "https://github.com/iamtigermaximus/kabayan-konek",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1739354077/Screenshot_2025-02-12_at_11.48.38_rjkyui.png",
      featured: true,
      order: 6,
    },

    // ── Non-featured (order 7+) ────────────────────────
    {
      title: "HuntLog",
      description:
        "Job application tracking platform with AI-powered cover letter generation. Features complete CRUD for applications, status tracking, interview scheduling, and personalized cover letter generation using DeepSeek AI.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth.js", "DeepSeek AI", "Styled Components"],
      liveUrl: "https://huntlog-tau.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/huntlog",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1778839290/Screenshot_2026-05-15_at_12.57.41_lag5xf.png",
      featured: false,
      order: 7,
    },
    {
      title: "Opi Suomea",
      description:
        "Opi Suomea is a simplified Finnish language reference website. Perfect for beginners and intermediate learners, it provides essential grammar explanations, vocabulary collections, and practical language resources for learning Finnish.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Render", "Styled Components"],
      liveUrl: "https://opi-suomea.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/finnish-language-app",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1762840714/Screenshot_2025-11-11_at_7.53.30_xasot0.png",
      featured: false,
      order: 8,
    },
    {
      title: "E-Commerce Web Store — .NET",
      description:
        "Full-stack e-commerce web store built with React, TypeScript, and .NET. Features product catalog browsing, shopping cart functionality, user authentication, and a PostgreSQL database backend managed through a RESTful API.",
      techStack: ["React", "TypeScript", "Redux Toolkit", ".NET", "PostgreSQL", "C#", "Material UI", "Styled Components"],
      liveUrl: "https://ecommerce-react-postgresql-dotnet.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/ecommerce-react-postgresql-dotnet",
      imageUrl: null,
      featured: false,
      order: 9,
    },
    {
      title: "Employee Management App",
      description:
        "The Employee Management App streamlines HR tasks by providing an organized interface for managing employee records, departments, and reporting structures. Built with a React frontend and .NET/C# backend with PostgreSQL.",
      techStack: ["React", "TypeScript", "Styled Components", ".NET", "C#", "PostgreSQL"],
      liveUrl: "https://employee-management-frontend.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/Employee-Management-Frontend",
      imageUrl: null,
      featured: false,
      order: 10,
    },
    {
      title: "E-Commerce Web Store",
      description:
        "An e-commerce web store featuring a modern shopping experience with product listings, cart management, and checkout flow. Built with React, TypeScript, Redux Toolkit for state management, and Material UI for the component library.",
      techStack: ["React", "TypeScript", "Redux Toolkit", "Material UI", "HTML", "CSS"],
      liveUrl: "https://ecommerce-webstore-ivory.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/ecommerce-webstore",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1684953733/fqzzc5oonew2xoz1vzdp.png",
      featured: false,
      order: 11,
    },
    {
      title: "Bike Finland",
      description:
        "Bike Finland is a full-stack application that helps users locate bike stations and cycling routes across Finland. Features search, filtering by city, station details with real-time availability data, and a responsive map-based interface.",
      techStack: ["Next.js", "TypeScript", "React", "Styled Components", "HTML", "CSS", "MongoDB", "Node.js"],
      liveUrl: "https://bike-finland.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/bike_finland",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664531660/nw1yhzozgskcou3tktsz.png",
      featured: false,
      order: 12,
    },
    {
      title: "Sneakers Webstore",
      description:
        "An e-commerce sneakers web shop built with TypeScript and React. Features a clean, modern UI with product browsing, filtering by brand and category, and a responsive shopping experience styled with Styled Components.",
      techStack: ["TypeScript", "React", "Styled Components", "HTML", "CSS"],
      liveUrl: "https://sneakers-webstore.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/sneakers-webstore",
      imageUrl: null,
      featured: false,
      order: 13,
    },
    {
      title: "SMG Photography Website",
      description:
        "SMG Photography is a sample website that displays the works, services, and portfolio of a professional photographer. Features a gallery showcase, service listings, contact form, and a clean visual aesthetic built with Next.js and TypeScript.",
      techStack: ["Next.js", "TypeScript", "React", "Styled Components", "HTML", "CSS"],
      liveUrl: "https://photographer-website-react-typescript.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/photographer-portfolio-sample",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664531852/ayimas6cwtd4mcnfg6on.png",
      featured: false,
      order: 14,
    },
    {
      title: "New Portfolio Website",
      description:
        "A new portfolio website that displays information and a collection of personal projects. Features a clean, modern design with project showcases, about section, skills display, and contact functionality built with React and Node.js.",
      techStack: ["React", "Styled Components", "React Icons", "HTML", "CSS", "Node.js", "MongoDB"],
      liveUrl: "https://siegy-gamboa-portfolio.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/new-portfolio-website",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1669651086/swscq5zcx2h2d29pxcxb.png",
      featured: false,
      order: 15,
    },
    {
      title: "Jonathan Doe Acting Coach Website",
      description:
        "Jonathan Doe Acting Coach and Workshops is a sample website that displays the services and workshop offerings of a professional acting coach. Features class schedules, testimonials, and a responsive image carousel.",
      techStack: ["React", "Styled Components", "React Icons", "React Responsive Carousel", "HTML", "CSS"],
      liveUrl: "https://acting-coach-website.vercel.app/",
      githubUrl: "https://github.com/iamtigermaximus/acting-coach-website",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1669092033/xna12hbe4okqmrqclowi.png",
      featured: false,
      order: 16,
    },
    {
      title: "SMG Constructions Website",
      description:
        "SMG Constructions is a mock-up website of a construction company. It displays the company's services, completed projects, client testimonials, and contact information in a professional, industry-appropriate layout.",
      techStack: ["React", "Styled Components", "HTML", "CSS"],
      liveUrl: "https://smg-constructions-react.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/smg-constructions-website",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664504245/cq6ndofmc0vtie5tab2t.png",
      featured: false,
      order: 17,
    },
    {
      title: "GrabEat Food Delivery App",
      description:
        "A food delivery application built with React and styled with Styled Components. Features restaurant browsing, menu exploration, order placement, and a responsive mobile-friendly interface for a seamless food ordering experience.",
      techStack: ["React", "React Router", "Styled Components", "HTML", "CSS", "REST API"],
      liveUrl: "https://grab-eat-food-delivery.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/grab-eat-food-delivery",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664504093/gc0osppu2lzuaax5ayq3.png",
      featured: false,
      order: 18,
    },
    {
      title: "StarShop E-Commerce Website",
      description:
        "StarShop is an e-commerce website inspired by leading online fashion stores in Europe. Features a full product catalog, category browsing, shopping cart with JSON Server backend, and a polished retail shopping experience.",
      techStack: ["React", "React Router", "Bootstrap", "JSON Server", "HTML", "CSS", "REST API"],
      liveUrl: "https://starshop-ecommerce-website.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/e-commerce-website-react",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664503923/pew5xgwkwaizwi7uft05.png",
      featured: false,
      order: 19,
    },
    {
      title: "Hooked Movie Search App",
      description:
        "Hooked is a movie search app that lets you search for films, browse by category, and view detailed information including ratings, cast, and plot summaries. Built to help users discover new movies and find where to watch them.",
      techStack: ["React", "React Router", "Bootstrap", "HTML", "CSS", "REST API"],
      liveUrl: "https://tigercode-hooked2021.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/hooked2021",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664503787/tpvlzuhvydxlgamsa1wu.png",
      featured: false,
      order: 20,
    },
    {
      title: "Corona Tracker App",
      description:
        "Corona Tracker is a prevalence app that provides up-to-date COVID-19 case statistics worldwide. Features country-level data, interactive charts, daily and cumulative case tracking, and a clean dashboard for monitoring pandemic trends.",
      techStack: ["React", "React Router", "Bootstrap", "HTML", "CSS", "REST API"],
      liveUrl: "https://tigercode-coronatracker2021.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/coronatracker2021",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664503666/xtrtwign8po9zwivdqnf.png",
      featured: false,
      order: 21,
    },
    {
      title: "Moma Restaurant Website",
      description:
        "Moma provides basic information about a restaurant's menu, the kind of cuisine served, operating hours, and location. A clean, informative website that gives customers everything they need to decide on their next dining experience.",
      techStack: ["React", "React Router", "Bootstrap", "HTML", "CSS", "REST API"],
      liveUrl: "https://tigercode-restaurant-website.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/restaurant-website",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664503561/ij3zlzrdesssww0dzd7d.png",
      featured: false,
      order: 22,
    },
    {
      title: "Portfolio Website (2021)",
      description:
        "I built this portfolio website to showcase a collection of personal projects and development work. It serves as a central hub for my professional online presence, highlighting skills, project experience, and contact information.",
      techStack: ["React", "React Router", "Bootstrap", "HTML", "CSS", "REST API"],
      liveUrl: "https://tigerportfolio2021.netlify.app/",
      githubUrl: "https://github.com/iamtigermaximus/2021portfolio2021",
      imageUrl: "https://res.cloudinary.com/dgkjr3qbc/image/upload/v1664503443/l6hqdsqvvavoobtkbieb.png",
      featured: false,
      order: 23,
    },
  ];

  let projectsCreated = 0;
  for (const project of projects) {
    const existing = await prisma.project.findFirst({ where: { title: project.title } });
    if (!existing) {
      await prisma.project.create({ data: project });
      projectsCreated++;
    }
  }
  console.log(`✅ ${projectsCreated} projects seeded (${projects.length - projectsCreated} already existed)`);

  // ── Skills ──────────────────────────────────────────
  // Only seed skills if the table is empty (protects existing data)
  if ((await prisma.skill.count()) === 0) {
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
  } else {
    console.log("⏭️  Skills: data already exists — skipped");
  }

  // ── Certificates ────────────────────────────────────
  // Only seed certificates if the table is empty (protects existing data)
  if ((await prisma.certificate.count()) === 0) {
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
  } else {
    console.log("⏭️  Certificates: data already exists — skipped");
  }

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
