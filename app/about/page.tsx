export default function About() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6">
      <section className="max-w-4xl mx-auto py-20">
        <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          About Me
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p>
              I am a Full-Stack Developer with a passion for building high-performance 
              web applications. My journey is unique: I develop entirely on a 
              mobile workstation, proving that great software isn't limited by hardware.
            </p>
            <p>
              Beyond standard web development, I specialize in **Unity 6 (URP)**, 
              bridging the gap between traditional web interfaces and immersive 
              3D experiences.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
            <h3 className="text-yellow-500 font-bold mb-4">Core Expertise</h3>
            <ul className="space-y-2 font-mono text-sm">
              <li>• Next.js / TypeScript</li>
              <li>• Tailwind CSS / UI Design</li>
              <li>• Unity 6 (URP) / Web3D</li>
              <li>• Mobile Dev Environment</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <a href="/" className="text-yellow-500 hover:underline font-bold">
            ← Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}
