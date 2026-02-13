"use client";
import React, { useState, useEffect } from 'react';

export default function DemoSite() {
  const [isDark, setIsDark] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Total Revenue", value: "$45,231", change: "+12.5%" },
    { label: "Active Users", value: "2,341", change: "+3.2%" },
    { label: "Conversion Rate", value: "4.8%", change: "-0.4%" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-neutral-950 text-white' : 'bg-slate-50 text-slate-900'} flex`}>
      
      {/* SIDEBAR - Desktop Only */}
      <aside className={`w-20 ${isDark ? 'bg-neutral-900' : 'bg-slate-900'} flex flex-col items-center py-8 gap-8 hidden sm:flex border-r ${isDark ? 'border-neutral-800' : 'border-slate-200'}`}>
        <div className="w-10 h-10 bg-yellow-500 rounded-lg shadow-lg"></div>
        <button 
          onClick={() => setIsDark(!isDark)} 
          className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-xl transition-all active:scale-90"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 flex flex-col gap-10 max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm">Responsive Demo Site</p>
          </div>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="sm:hidden bg-slate-800 text-white p-2 rounded-lg text-sm"
          >
            {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </header>

        {/* 1. STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 border rounded-3xl shadow-sm ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'}`}>
              <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className={`text-xs font-bold mb-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. REVENUE GRAPH SECTION - FIXED ALIGNMENT */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Revenue Growth</h3>
            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-xs">+24%</span>
          </div>
          
          <div className="h-40 w-full relative">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <path
                d="M0 35 Q 15 5, 30 25 T 50 15 T 70 30 T 100 10"
                fill="none"
                stroke={isDark ? "#EAB308" : "#0F172A"} 
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-mono">
              <span>MON</span>
              <span>WED</span>
              <span>FRI</span>
              <span>SUN</span>
            </div>
          </div>
        </div>

        {/* 3. QUICK ACTIONS */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Add User', 'Reports', 'Logs', 'Settings'].map((action) => (
              <button 
                key={action} 
                className={`p-4 rounded-2xl border text-sm font-semibold transition active:scale-95 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200'}`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* 4. KANBAN BOARD */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold">Project Management</h3>
          <div className="flex flex-col md:flex-row gap-6">
            {['To Do', 'In Progress', 'Done'].map((col) => (
              <div key={col} className={`flex-1 p-4 rounded-3xl ${isDark ? 'bg-neutral-900' : 'bg-slate-200/50'}`}>
                <span className="text-xs font-bold uppercase tracking-widest opacity-50 px-2 block mb-4">{col}</span>
                <div className={`p-4 rounded-2xl shadow-sm border mb-3 ${isDark ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                  <p className="text-sm font-medium">Example Task</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* MODAL POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className={`max-w-md w-full p-8 rounded-3xl shadow-2xl ${isDark ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-white text-slate-900'}`}>
            <h2 className="text-2xl font-black mb-4">Demo Preview</h2>
            <p className="opacity-60 mb-8 leading-relaxed">This shows I can build complex dashboards with theme switching and data visualization.</p>
            <button 
              onClick={() => setShowPopup(false)} 
              className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold hover:bg-yellow-400 transition"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
