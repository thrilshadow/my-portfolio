"use client";

// 1. Define the "Shape" of a project using TypeScript
type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
};

// 2. Create your data list (Easy to add more projects here!)
const projects: Project[] = [
  {
    title: "Scalable Storefront API",
    description: "Built with Next.js and Supabase. Features real-time inventory.",
    tags: ["Next.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "SaaS Dashboard",
    description: "Real-time data visualization dashboard for tracking metrics.",
    tags: ["TypeScript", "Chart.js"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "AI Content Architect",
    description: "An intelligent platform that uses LLMs to generate SEO-optimized blog posts from simple prompts.",
    tags: ["OpenAI API", "Next.js", "Server Actions"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6">
      {/* ... Hero and Marquee code stays the same ... */}

      <section className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Featured Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 3. The "Map" - This loops through your projects array */}
          {projects.map((project, index) => (
            <div key={index} className="group bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-yellow-500/50 transition duration-500 shadow-2xl">
              <div className="h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-500 transition">{project.title}</h3>
                <p className="text-neutral-400 mb-6">{project.description}</p>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-neutral-800 px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* ... Contact Form and Footer ... */}
    </main>
  );
}
