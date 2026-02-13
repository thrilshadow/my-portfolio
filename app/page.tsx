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

<section className="max-w-3xl mx-auto py-20 px-4">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
      Let's Work Together
    </h2>
    <p className="text-neutral-400">Have a project in mind? Fill out the form below.</p>
  </div>

  <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-3xl shadow-xl">
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-500 mb-2">Name</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className="w-full p-4 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-yellow-500 transition" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-500 mb-2">Email</label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            className="w-full p-4 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-yellow-500 transition" 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-500 mb-2">Message</label>
        <textarea 
          placeholder="Tell me about your project..." 
          rows={5} 
          className="w-full p-4 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:border-yellow-500 transition"
        ></textarea>
      </div>

      <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold hover:bg-yellow-400 transition transform active:scale-95">
        Send Inquiry
      </button>
    </form>
  </div>
</section>

