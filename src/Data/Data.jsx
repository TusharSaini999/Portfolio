export const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Project", href: "project" },
    { name: "Experience", href: "experience" },
    { name: "Stack", href: "stack" },
    { name: "Credential", href: "credential" },
    { name: "Contact", href: "contact" },
];

export const heroData = {
    name: "TUSHAR SAINI",
    title: ["Software Engineer", "Full Stack Developer", "Tech Enthusiast"],
    description: "Building scalable digital experiences with a focus on performance, clean architecture, and modern engineering practices.",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    socialLinks: {
        github: "https://github.com/TusharSaini999/",
        linkedin: "https://www.linkedin.com/in/tushar-saini-105865373/",
        mail: "mailto:tusharsaini.in@gmail.com"
    },
    ctaText: "$ fetch resume",
    resumeLink: "Resume/resume.pdf",
    status: "online",
    imageTag: ["Frontend", "Query", "API"]
};

export const aboutData = {
    systemCall: "system.init(profile)",
    bio: "Currently pursuing a B.Tech in Computer Science and Engineering, I am a software engineer focused on building high-performance, scalable systems. My philosophy is simple: write clean, maintainable code, design with the user in mind, and continuously optimize for performance and reliability. I bridge the gap between complex system architecture and elegant, intuitive user experiences across platforms.",
    education: {
        degree: "B.Tech in CS",
        school: "Quantum University"
    },
    intershipStatus: {
        status: "Available",
        details: "Software Development Engineer (SDE) Internships"
    },
    currentLearning: "Java(DSA), Aritificial Intelligence",
    techStack: ["JavaScript", "React.js", "Tailwind CSS", "Express.js", "Node.js", "Git"],
    interests: ["OpenSource", "Web3", "AI"],
    stats: [
        { label: "Frontend Architecture", percentage: 92 },
        { label: "Backend Scalability", percentage: 78 },
        { label: "System Design", percentage: 70 },
        { label: "Cloud Deployment", percentage: 65 }
    ]
};

export const projectData = [
    {
        title: "QuickPost – AI-Powered Blogging Studio",
        category: "Full-Stack / AI",
        description:
            "A full-stack blogging platform enabling users to create, manage, and publish posts with AI-assisted content generation. Features secure authentication, full CRUD functionality, Redux Toolkit state management, and a modern responsive UI. Deployed using Vercel and Appwrite.",
        image:
            "Project/quickPost.png",
        tech: [
            "React",
            "Tailwind CSS",
            "Redux Toolkit",
            "TinyMCE",
            "Node.js",
            "Appwrite",
            "AI Integration",
        ],
        github: "https://github.com/TusharSaini999/QuickPost-Blogging-Studio",
        demo: "https://quickpostai.vercel.app/",
    },
    {
        title: "LawGenie – AI-Powered Legal Assistance Chatbot",
        category: "AI / NLP",
        description:
            "An AI-driven legal assistance chatbot providing accurate, context-aware answers related to Indian laws such as IPC and CrPC. Uses NLP and vector-based semantic search with FAISS, OpenAI LLM reasoning, and Redis-backed conversational memory for scalable and intelligent legal guidance.",
        image:
            "Project/lowGenie.png",
        tech: [
            "Python",
            "FastAPI",
            "FAISS",
            "Redis",
            "LangChain",
            "OpenAI API",
            "Google Embeddings",
        ],
        github: "#",
        demo: "#",
    },
    {
        title: "CampusEats – Smart Food Ordering Platform",
        category: "Full-Stack / Web",
        description:
            "A smart food ordering platform designed for college campuses. Students can browse menus, place orders, and track deliveries in real time. Includes a RAG-based AI chatbot powered by the Groq API for food recommendations and user assistance, along with secure authentication, CRUD operations, and live order updates.",
        image:
            "Project/campusEats.png",
        tech: [
            "React",
            "Tailwind CSS",
            "Express.js",
            "Node.js",
            "MySQL",
            "Leaflet.js",
            "Groq API",
            "REST APIs",
        ],
        github: "https://github.com/TusharSaini999/CampusEats",
        demo: "https://campuseats.netlify.app/",
    },
];


export const projectSection = {
    systemCall: "system.exec(projects)",
    title: "Featured",
    subtitle: "Projects.",
    para: "A collection of projects built with clean architecture, optimized performance, and user-first design principles.",
    linkText: "system.fetch(all_repositories)", //Explore More Projects
    linkUrl: "https://github.com/TusharSaini999?tab=repositories"
};


export const experienceSection = {
    title: "Professional",
    subtitle: "Experience.",
    systemCall: "system.exec(history)"
};
export const experienceData = [
    {
        company: "Expert IT Brains Private Limited",
        role: "Software Development Intern",
        location: "Kurukshetra, Haryana, India",
        duration: "July 2024 - August 2024",
        // Add your logo path here
        logo: "Experience/ExpertIt.png",
        description: [
            "Actively contributing to real-world web applications using modern development tools and frameworks.",
            "Designed and optimized responsive frontend components, integrated backend APIs, and resolved bugs.",
            "Collaborated with cross-functional teams using Git-based workflows and agile practices.",
            "Strengthened full-stack development skills and understanding of scalable software systems."
        ],
        techStack: [
            "Full-Stack Development",
            "Web Technologies",
            "Database Management",
            "Artificial Intelligence & Emerging Tech",
            "Version Control & Collaboration"
        ],
    },
];

export const skillSection = {
    systemCall: "system.exec(skills)",
    title: "Technical",
    subtitle: "Skills.",
    para: "A comprehensive toolkit focused on building scalable web applications and AI-integrated solutions."
};

export const skillsData = [
    {
        category: "Languages",
        icon: "Terminal",
        skills: ["Java (DSA)", "JavaScript", "Python", "C", "SQL (MySQL)"]
    },
    {
        category: "Frontend",
        icon: "Layers",
        skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3"]
    },
    {
        category: "Backend",
        icon: "Server",
        skills: [
            "Node.js",
            "Express.js",
            "REST APIs",
            "Appwrite"
        ]
    },
    {
        category: "Database",
        icon: "Database",
        skills: [
            "MySQL",
            "MongoDB",
            "Mongoose ODM",
            "Redis (Basic)"
        ]
    },
    {
        category: "AI / ML",
        icon: "Sparkles",
        skills: ["OpenAI API", "Gemini API", "RAG", "LangChain", "Vector DB", "FAISS"]
    },
    {
        category: "Tools & Cloud",
        icon: "Box",
        skills: ["VS Code", "Git", "Postman", "Vercel", "Render", "Firebase"]
    }
];

export const credentialsData = [
    {
        mainTitle: "Hackathons & Competitions",
        icon: "Trophy",
        themeColor: "from-purple-600 to-blue-500",
        subParts: [
            {
                label: "Global",
                items: [
                    {
                        title: "Google Solution Challenge",
                        detail: "Participant",
                        location: "Global",
                        year: "2025",
                        shortInfo: "Built a tech solution aligned with UN Sustainable Development Goals."
                    }
                ]
            },
            {
                label: "National",
                items: [
                    {
                        title: "Graph-E-Thon",
                        detail: "Participant",
                        location: "National",
                        year: "2024",
                        shortInfo: "Competed in a national hackathon focused on graph-based problem solving."
                    },
                    {
                        title: "Bharatiya Antariksh Hackathon (ISRO)",
                        detail: "Participant",
                        location: "National",
                        year: "2025",
                        shortInfo: "Proposed an AI chatbot using Knowledge Graphs via idea and PPT submission."
                    }
                ]
            },
            {
                label: "State",
                items: [
                    {
                        title: "HackIndia Hackathon",
                        detail: "Finalist (Top 6)",
                        location: "State",
                        year: "2025",
                        shortInfo: "Top 6 finalist in a state-level Web3 & AI hackathon."
                    }
                ]
            },
            {
                label: "College",
                items: [
                    {
                        title: "AI Model Making Competition",
                        detail: "Winner",
                        location: "Institutional",
                        year: "2024",
                        shortInfo: "Won first place for building an efficient AI model."
                    },
                    {
                        title: "Codefest Hackathon",
                        detail: "Runner-Up",
                        location: "Institutional",
                        year: "2024",
                        shortInfo: "Secured runner-up by delivering a functional solution under time limits."
                    }
                ]
            }
        ]
    },
    {
        mainTitle: "Professional Certifications",
        icon: "Medal",
        themeColor: "from-blue-600 to-cyan-500",
        subParts: [
            {
                label: "Professional",
                items: [
                    {
                        title: "Database Foundations",
                        detail: "Certified",
                        location: "Verified",
                        year: "2024",
                        shortInfo: "Strong foundation in relational databases and SQL."
                    },
                    {
                        title: "Database Design",
                        detail: "Certified",
                        location: "Verified",
                        year: "2024",
                        shortInfo: "Expertise in schema design and normalization."
                    }
                ]
            }
        ]
    }
];

export const credentialSection = {
    systemCall: "system.verify(credentials)",
    title: "Recognized",
    subtitle: "Credentials."
}

export const contactSection = {
    systemCall: "system.route(message)",
    title: "Let’s",
    subtitle: "Connect",
    para: "Open to job opportunities and open-source collaborations. Let’s build something impactful together."
};


export const contactData = [
    { label: "Official Mail", value: "tusharsaini.in@gmail.com", icon: "Mail" },
    { label: "Mobile", value: "+91 9368283874", icon: "Phone" },
    { label: "Based In", value: "Haridwar, Uttarakhand, India", icon: "MapPin" }
];

export const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/tushar-saini-105865373/", icon: "Linkedin" },
    { name: "GitHub", url: "https://github.com/TusharSaini999", icon: "Github" },
    { name: "Mail", url: "mailto:tusharsaini.in@gmail.com", icon: "Mail" }
];


export const formLabels = {
    nameLabel: "Full Name",
    namePlaceholder: "Name",
    emailLabel: "Work Email",
    emailPlaceholder: "name@company.com",
    messageLabel: "Proposal / Opportunity",
    messagePlaceholder: "Briefly describe the role or project...",
    buttonText: "Drop a Message",
    successTitle: "Signal Received!",
    successSubtitle: "I'll get back to your inquiry shortly.",
    errorTitle: "Request Failed",
    errorSubtitle: "Technical issue. Try again later.",
    socialHeading: "Communication Channels"
};