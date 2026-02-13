import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // Required for fast page switching

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thrilshadow | Freelance Developer",
  description: "Full-stack developer specializing in Next.js and Unity 6.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-950 text-white`}>
        {/* FLOATING NAVBAR */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
          <div className="flex gap-8 px-8 py-3 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full shadow-2xl">
            <Link href="/" className="hover:text-yellow-500 transition font-medium">Home</Link>
            <Link href="/about" className="hover:text-yellow-500 transition font-medium">About</Link>
            <a href="/demo" className="hover:text-yellow-500 transition font-medium">Demo</a>
          </div>
        </nav>

        {/* This renders your Home or About page content */}
        <div className="pt-20"> 
          {children}
        </div>
        <footer className="border-t border-neutral-900 bg-neutral-950 py-12 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
    
    {/* Brand / Copyright */}
    <div className="text-center md:text-left">
      <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Thrilshadow
      </h3>
      <p className="text-neutral-500 text-sm mt-2">
        © 2026 Freelance Developer. Built from a mobile device.
      </p>
    </div>

    {/* Social Links */}
    <div className="flex gap-6">
      <a href="https://github.com/Thrilshadow" target="_blank" className="text-neutral-400 hover:text-yellow-500 transition font-medium">
        GitHub
      </a>
      <a href="#" className="text-neutral-400 hover:text-yellow-500 transition font-medium">
        LinkedIn
      </a>
      <a href="https://twitter.com" target="_blank" className="text-neutral-400 hover:text-yellow-500 transition font-medium">
        Twitter
      </a>
    </div>

    {/* Quick Navigation */}
    <div className="flex gap-6 text-sm text-neutral-500">
      <Link href="/" className="hover:text-white transition">Home</Link>
      <Link href="/about" className="hover:text-white transition">About</Link>
      <Link href="/demo" className="text-yellow-500 hover:text-yellow-400 transition font-bold">Demo</Link>
    </div>


    
  </div>
</footer>

      </body>
    </html>
  );
}
