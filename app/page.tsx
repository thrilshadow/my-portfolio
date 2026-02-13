import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl border border-yellow-500/20 bg-yellow-500/5 p-12 rounded-3xl shadow-2xl">
        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
          Thrilshadow Dev
        </h1>
        <p className="text-neutral-400 text-2xl mb-10 max-w-2xl">
          Full-Stack Freelance Solutions. High-performance apps built for the modern web.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-500 text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition transform hover:scale-105">
            View Portfolio
          </button>
          <button className="border border-neutral-700 px-8 py-4 rounded-full font-bold hover:bg-neutral-900 transition">
            Start a Project
          </button>
        </div>
      </div>
    </main>
  );
}

