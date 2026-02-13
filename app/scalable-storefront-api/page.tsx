"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ScalableStorefrontAPI() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      title: "Real-Time Inventory",
      description: "Automatic inventory updates as orders come in"
    },
    {
      title: "Scalable Architecture",
      description: "Built to handle millions of requests per day"
    },
    {
      title: "PostgreSQL Backend",
      description: "Reliable and performant relational database"
    },
    {
      title: "API-First Design",
      description: "RESTful endpoints for seamless integration"
    }
  ];

  const tech = ["Next.js", "PostgreSQL", "Supabase", "TypeScript", "Tailwind CSS"];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Back Button */}
      <div className="pt-20 px-6 max-w-6xl mx-auto">
        <Link href="/" className="text-yellow-500 hover:text-yellow-400 transition font-semibold flex items-center gap-2 mb-12">
          <span>←</span> Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Scalable Storefront API
            </h1>
            <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
              A production-ready e-commerce API built with Next.js and Supabase. Designed to handle high-traffic retail operations with real-time inventory management.
            </p>
            <div className="flex gap-4 flex-wrap">
              {tech.map((item) => (
                <span key={item} className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-sm font-semibold hover:border-yellow-500/50 transition">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl border border-neutral-800 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-neutral-400">API Architecture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-4 border-b border-neutral-800 mb-12 overflow-x-auto">
          {['overview', 'features', 'architecture'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition capitalize border-b-2 ${
                activeTab === tab
                  ? 'border-yellow-500 text-yellow-500'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
              <p className="text-neutral-300 leading-relaxed mb-6">
                The Scalable Storefront API is a comprehensive backend solution designed for modern e-commerce platforms. It provides endpoints for product management, inventory tracking, and order processing with built-in scalability.
              </p>
              <p className="text-neutral-300 leading-relaxed">
                The platform uses Supabase as a managed PostgreSQL backend, ensuring reliability and automatic scaling. Real-time inventory updates prevent overselling, while RESTful API design ensures seamless integration with any frontend.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-3 text-yellow-500">Performance</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Response times under 100ms with optimized database queries and caching strategies.</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-3 text-orange-500">Reliability</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">99.9% uptime guarantee with automatic failover and backup systems.</p>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl hover:border-yellow-500/50 transition">
                  <h3 className="text-xl font-bold mb-2 text-yellow-500">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">System Architecture</h2>
            <div className="space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                <h3 className="text-lg font-bold mb-3 text-yellow-500">Frontend Layer</h3>
                <p className="text-neutral-400 mb-4">Next.js 16 with React 19 provides a responsive client experience with server-side rendering capabilities.</p>
                <div className="flex gap-2 flex-wrap">
                  {['Next.js 16', 'React 19', 'TypeScript'].map((tech) => (
                    <span key={tech} className="bg-neutral-800 px-3 py-1 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                <h3 className="text-lg font-bold mb-3 text-orange-500">API Layer</h3>
                <p className="text-neutral-400 mb-4">RESTful API built with Next.js API Routes, providing endpoints for products, inventory, and orders.</p>
                <div className="flex gap-2 flex-wrap">
                  {['REST API', 'API Routes', 'Authentication'].map((tech) => (
                    <span key={tech} className="bg-neutral-800 px-3 py-1 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                <h3 className="text-lg font-bold mb-3 text-yellow-500">Database Layer</h3>
                <p className="text-neutral-400 mb-4">PostgreSQL via Supabase with optimized schema for e-commerce operations and real-time capabilities.</p>
                <div className="flex gap-2 flex-wrap">
                  {['PostgreSQL', 'Supabase', 'Real-time Sync'].map((tech) => (
                    <span key={tech} className="bg-neutral-800 px-3 py-1 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Try the Demo */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">Experience the Demo</h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Explore a fully functional storefront powered by this API. Add products to your cart, see real-time inventory updates, and experience the seamless checkout flow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects/storefront" className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition">
              🛒 Try the Storefront Demo
            </Link>
            <Link href="/" className="inline-block bg-neutral-900 border border-neutral-800 text-white px-8 py-3 rounded-xl font-bold hover:border-yellow-500/50 transition">
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
