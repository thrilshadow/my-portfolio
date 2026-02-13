"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Types
type Customer = {
  id: number;
  name: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Inactive' | 'Trial';
  joinedDate: string;
};

type Toast = {
  id: number;
  message: string;
  company: string;
};

type Subscription = {
  date: string;
  plan: string;
  price: number;
};

// Mock Customer Data
const mockCustomers: Customer[] = [
  { id: 1, name: "Acme Corp", plan: "Enterprise", status: "Active", joinedDate: "2024-01-15" },
  { id: 2, name: "TechStart Inc", plan: "Pro", status: "Active", joinedDate: "2024-02-03" },
  { id: 3, name: "Digital Agency", plan: "Starter", status: "Trial", joinedDate: "2024-02-10" },
  { id: 4, name: "Global Solutions", plan: "Enterprise", status: "Active", joinedDate: "2024-01-28" },
  { id: 5, name: "Creative Studio", plan: "Pro", status: "Active", joinedDate: "2024-02-05" },
  { id: 6, name: "CloudFirst", plan: "Starter", status: "Inactive", joinedDate: "2024-01-20" },
  { id: 7, name: "DataFlow Systems", plan: "Pro", status: "Active", joinedDate: "2024-02-08" },
  { id: 8, name: "Innovate Labs", plan: "Enterprise", status: "Active", joinedDate: "2024-02-01" },
];

// Subscription History Mock Data
const subscriptionHistory: Record<number, Subscription[]> = {
  1: [
    { date: "2024-01-15", plan: "Pro", price: 299 },
    { date: "2024-02-01", plan: "Enterprise", price: 999 },
  ],
  2: [
    { date: "2024-02-03", plan: "Starter", price: 99 },
    { date: "2024-02-10", plan: "Pro", price: 299 },
  ],
  3: [{ date: "2024-02-10", plan: "Starter", price: 0 }],
  4: [
    { date: "2024-01-28", plan: "Enterprise", price: 999 },
  ],
  5: [
    { date: "2024-02-05", plan: "Pro", price: 299 },
  ],
  6: [{ date: "2024-01-20", plan: "Starter", price: 99 }],
  7: [
    { date: "2024-02-08", plan: "Pro", price: 299 },
  ],
  8: [
    { date: "2024-02-01", plan: "Enterprise", price: 999 },
  ],
};

// User Growth Data
const growthData = [
  { week: "Week 1", userCount: 200 },
  { week: "Week 2", userCount: 850 },
  { week: "Week 3", userCount: 400 },
  { week: "Week 4", userCount: 1200 },
  { week: "Week 5", userCount: 600 },
  { week: "Week 6", userCount: 950 },
  { week: "Week 7", userCount: 1350 },
  { week: "Week 8", userCount: 1100 },
];

const maxUserCount = Math.max(...growthData.map(d => d.userCount));

export default function SaaSDashboard() {
  const [filterPlan, setFilterPlan] = useState<'All' | 'Starter' | 'Pro' | 'Enterprise'>('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);
  
  // Live data simulation
  const [mrrValue, setMrrValue] = useState(24500);
  const [activeUsersValue, setActiveUsersValue] = useState(1204);
  const [chartAnimated, setChartAnimated] = useState(false);

  // Enterprise features
  const [showForecast, setShowForecast] = useState(false);
  const [serverLogs, setServerLogs] = useState<{ id: number; message: string; time: string }[]>([{ id: 0, message: "System initialized", time: "00:00" }]);
  const serverLogIdRef = useRef(0);
  const [isExporting, setIsExporting] = useState(false);

  // Live data updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMrrValue((prev) => {
        const change = (Math.random() - 0.5) * 200;
        return Math.max(20000, Math.floor(prev + change));
      });

      setActiveUsersValue((prev) => {
        const change = Math.floor((Math.random() - 0.5) * 20);
        return Math.max(1000, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Trigger chart animation on mount
  useEffect(() => {
    setChartAnimated(true);
  }, []);

  // Toast notifications for upgrades
  useEffect(() => {
    const upgradeCompanies = ["TechFlow", "DataVault", "CloudSync", "NetFlow"];
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const company = upgradeCompanies[Math.floor(Math.random() * upgradeCompanies.length)];
        addToast(`New Enterprise upgrade: ${company}`);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Server health monitor - live log every 8 seconds
  useEffect(() => {
    const regions = ["us-east-1", "eu-west-1", "ap-southeast-1", "us-west-2"];
    const interval = setInterval(() => {
      const pingTime = Math.floor(Math.random() * 50) + 10; // 10-60ms
      const region = regions[Math.floor(Math.random() * regions.length)];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setServerLogs((prev) => {
        const updated = [{ id: ++serverLogIdRef.current, message: `Ping to ${region}: ${pingTime}ms`, time }, ...prev.slice(0, 4)];
        return updated;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const addToast = (message: string) => {
    const id = toastIdRef.current;
    toastIdRef.current += 1;
    const company = message.split(": ")[1] || "";
    setToasts((prev) => [...prev, { id, message, company }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  // Filter customers by plan and search
  const filteredCustomers = mockCustomers.filter((c) => {
    const planMatch = filterPlan === 'All' || c.plan === filterPlan;
    const searchMatch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return planMatch && searchMatch;
  });

  // KPI Stats with live values
  const stats = [
    { 
      label: "Monthly Recurring Revenue", 
      value: `$${(mrrValue / 1000).toFixed(1)}k`, 
      change: "+12.5%", 
      tooltip: "Total recurring monthly revenue from all active subscriptions",
      detail: `$${mrrValue.toLocaleString()}`
    },
    { 
      label: "Active Subscriptions", 
      value: activeUsersValue.toLocaleString(), 
      change: "+3.2%",
      tooltip: "Number of currently active customer subscriptions",
      detail: `${activeUsersValue} users`
    },
    { 
      label: "Churn Rate", 
      value: "2.4%", 
      change: "-0.8%",
      tooltip: "Percentage of customers who canceled this month",
      detail: "Down from 3.2% last month"
    },
    { 
      label: "Avg Revenue Per User", 
      value: "$42", 
      change: "+5.1%",
      tooltip: "Average monthly revenue per active user",
      detail: "Growing steadily month-over-month"
    },
  ];

  // Plan breakdown data
  const planBreakdown = [
    { name: "Free", count: 234, total: 500, color: "bg-blue-500" },
    { name: "Pro", count: 456, total: 500, color: "bg-purple-500" },
    { name: "Enterprise", count: 310, total: 500, color: "bg-emerald-500" },
  ];

  // Handle report generation with file download
  const handleGenerateReport = async () => {
    setIsExporting(true);
    
    // Simulate file generation delay (2.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Create dummy PDF content (text-based representation)
    const pdfContent = `
ANALYTICS DASHBOARD REPORT
Generated: ${new Date().toLocaleString()}
================================================================================

EXECUTIVE SUMMARY
================================================================================
Monthly Recurring Revenue: $${mrrValue.toLocaleString()}
Active Subscriptions: ${activeUsersValue}
Churn Rate: 2.4%
Average Revenue Per User: $42

CUSTOMER BREAKDOWN
================================================================================
Enterprise: 310 customers (62%)
Pro: 456 customers (91.2%)
Starter: 234 customers (46.8%)

SYSTEM HEALTH
================================================================================
Status: Operational
Uptime: 99.98%
Last Updated: ${new Date().toLocaleString()}

KEY METRICS
================================================================================
Conversion Rate: 8.2% (+2.1% vs last month)
Customer Lifetime Value: $2,840 (+$320 avg)
Support Tickets: 24 (-12% resolved this week)

This report was automatically generated by the Analytics Dashboard.
For more details, visit your dashboard.
`;

    // Create a blob from the content
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    
    // Create a temporary download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    // Reset state and show success
    setIsExporting(false);
    addToast("Report downloaded successfully!");
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Starter":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Pro":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Enterprise":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-neutral-500/20 text-neutral-300 border-neutral-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-emerald-400";
      case "Trial":
        return "text-yellow-400";
      case "Inactive":
        return "text-rose-400";
      default:
        return "text-neutral-400";
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Toast Notifications */}
      <div className="fixed top-20 right-6 z-40 space-y-3 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="px-6 py-4 rounded-lg border bg-emerald-500/20 border-emerald-500/50 text-emerald-100 backdrop-blur-sm animate-slide-in"
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Back Button */}
      <header className="pt-20 px-6 max-w-7xl mx-auto mb-8">
        <Link href="/" className="text-yellow-500 hover:text-yellow-400 transition font-semibold flex items-center gap-2 mb-8">
          <span>←</span> Back to Home
        </Link>
      </header>

      {/* Dashboard Header */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-neutral-400">Real-time SaaS metrics and customer insights</p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/projects/saas-dashboard/tickets" className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition font-semibold text-sm">
              📋 Support Tickets
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1"></div>
          {/* System Health Monitor */}
          <div className="px-6 py-4 bg-neutral-900/80 border border-neutral-800 rounded-xl backdrop-blur-md w-fit">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-semibold text-sm">Online</span>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto text-xs text-neutral-400">
              {serverLogs.map((log) => (
                <div key={log.id} className="flex justify-between gap-4">
                  <span className="text-neutral-500">{log.time}</span>
                  <span className="text-neutral-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="px-6 py-3 bg-neutral-900/80 border border-neutral-800 rounded-xl backdrop-blur-md w-fit">
            <select defaultValue="Last 30 Days" className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
            </select>
          </div>
        </div>
      </section>

      {/* KPI Cards with Hover Tooltips */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md hover:border-yellow-500/50 hover:bg-neutral-900/80 transition cursor-help"
            >
              <p className="text-neutral-400 text-sm mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change} vs last period
              </p>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-neutral-200 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                {stat.tooltip}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-time System Health */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold">Global Systems</h2>
            <div className="relative w-4 h-4">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Status Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-lg p-4">
              <p className="text-neutral-400 text-sm mb-2">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-bold text-lg">Operational</span>
              </div>
            </div>
            <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-lg p-4">
              <p className="text-neutral-400 text-sm mb-2">Uptime</p>
              <p className="text-emerald-400 font-bold text-lg">99.98%</p>
            </div>
          </div>

          {/* Live Log */}
          <div className="bg-black/30 border border-neutral-700/30 rounded-lg p-4">
            <p className="text-neutral-500 text-xs font-mono mb-3 uppercase tracking-widest">System Log</p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {serverLogs.length === 0 ? (
                <p className="text-neutral-600 text-xs font-mono">Waiting for system data...</p>
              ) : (
                serverLogs.map((log) => (
                  <div key={log.id} className="text-neutral-400 text-xs font-mono">
                    <span className="text-emerald-500">[{log.time}]</span>
                    <span className="ml-2 text-neutral-300">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-6 pt-6 border-t border-neutral-700/50 flex justify-between text-xs text-neutral-500">
            <span>Last 5 entries</span>
            <span>Updated every 8 seconds</span>
          </div>
        </div>
      </section>

      {/* User Growth Chart with Animation */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">User Growth</h2>
            <div className="flex items-center gap-4">
              {/* Forecast Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-400">Forecast</span>
                <button
                  onClick={() => setShowForecast(!showForecast)}
                  className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                    showForecast ? 'bg-emerald-500' : 'bg-neutral-700'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${showForecast ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>
              <span className="text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-xs">
                +12.5% growth
              </span>
            </div>
          </div>

          {/* User Growth Bar Chart */}
          <div className="w-full flex items-end justify-between gap-3 px-4" style={{ height: '300px' }}>
            {growthData.map((data, index) => {
              const barHeight = (data.userCount / maxUserCount) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col-reverse items-center group h-full">
                  <span className="text-xs text-neutral-500 text-center truncate w-full mt-3">{data.week}</span>
                  <div
                    className="w-full bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t-lg hover:opacity-80 cursor-pointer transition-all duration-1000 ease-out relative"
                    style={{
                      height: chartAnimated ? `${barHeight}%` : '0%',
                      minHeight: chartAnimated ? '4px' : '0px',
                    }}
                  >
                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs text-neutral-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                      {data.userCount.toLocaleString()} users
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="mt-8 pt-8 border-t border-neutral-800 flex justify-between text-sm text-neutral-400">
            <span>Start: 240 users</span>
            <span className="font-semibold text-yellow-500">Current: {activeUsersValue} users</span>
            <span>Peak: 1,350 users</span>
          </div>

          {/* Forecast Visualization */}
          {showForecast && (
            <div className="mt-6 pt-6 border-t border-neutral-700">
              <p className="text-sm text-neutral-400 mb-4">3-Month Forecast (15% monthly growth)</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Month 1</span>
                  <div className="flex items-center gap-3">
                    <div className="w-64 bg-neutral-800 rounded h-2 flex items-center" style={{ background: 'linear-gradient(90deg, rgba(34,197,94,0.3), rgba(34,197,94,0.1))' }}>
                      <div style={{ width: '70%' }} className="h-full bg-emerald-500/50 rounded"></div>
                    </div>
                    <span className="text-emerald-400 font-semibold w-20">${(mrrValue * 1.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Month 2</span>
                  <div className="flex items-center gap-3">
                    <div className="w-64 bg-neutral-800 rounded h-2 flex items-center" style={{ background: 'linear-gradient(90deg, rgba(34,197,94,0.3), rgba(34,197,94,0.1))' }}>
                      <div style={{ width: '75%' }} className="h-full bg-emerald-500/50 rounded"></div>
                    </div>
                    <span className="text-emerald-400 font-semibold w-20">${(mrrValue * 1.32).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Month 3</span>
                  <div className="flex items-center gap-3">
                    <div className="w-64 bg-neutral-800 rounded h-2 flex items-center" style={{ background: 'linear-gradient(90deg, rgba(34,197,94,0.3), rgba(34,197,94,0.1))' }}>
                      <div style={{ width: '82%' }} className="h-full bg-emerald-500/50 rounded"></div>
                    </div>
                    <span className="text-emerald-400 font-semibold w-20">${(mrrValue * 1.52).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <style>{`
          .animate-slide-in {
            animation: slideIn 0.3s ease-out;
          }
          @keyframes slideIn {
            from { 
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes progress {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
      </section>

      {/* Plan Breakdown Section */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-8">Customer Plan Breakdown</h2>
          <div className="space-y-6">
            {planBreakdown.map((plan, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-neutral-200">{plan.name}</span>
                  <span className="text-sm text-neutral-400">{plan.count} of {plan.total} customers</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${plan.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{
                      width: `${(plan.count / plan.total) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-neutral-500">{((plan.count / plan.total) * 100).toFixed(1)}% utilization</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Customers Section */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Recent Customers</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 transition backdrop-blur-md"
            />

            {/* Filter Dropdown */}
            <div className="px-4 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg backdrop-blur-md">
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value as any)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="All">All Plans</option>
                <option value="Starter">Starter</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-800/40">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                    User Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                    Plan Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                    Joined Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-400 uppercase tracking-widest">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className={`border-b border-neutral-800 hover:bg-neutral-800/30 transition ${
                      index === filteredCustomers.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold">{customer.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPlanColor(customer.plan)}`}>
                        {customer.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${getStatusColor(customer.status)}`}>
                        ● {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 text-sm">{customer.joinedDate}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded text-xs font-semibold hover:bg-yellow-500/20 transition"
                      >
                        Quick View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="px-6 py-12 text-center text-neutral-400">
              <p>No customers found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        <div className="mt-6 flex justify-between items-center text-sm text-neutral-400">
          <span>Showing {filteredCustomers.length} of {mockCustomers.length} customers</span>
          <button className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition font-semibold">
            View All Customers
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-neutral-400 text-sm font-semibold mb-3">Conversion Rate</h3>
            <p className="text-3xl font-black text-emerald-400">8.2%</p>
            <p className="text-xs text-emerald-500 mt-2">↑ 2.1% from last month</p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-neutral-400 text-sm font-semibold mb-3">Customer Lifetime Value</h3>
            <p className="text-3xl font-black text-blue-400">$2,840</p>
            <p className="text-xs text-blue-500 mt-2">↑ $320 average increase</p>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md flex flex-col relative overflow-hidden">
            <h3 className="text-neutral-400 text-sm font-semibold mb-3">Support Tickets</h3>
            <p className="text-3xl font-black text-yellow-400 mb-4">24</p>
            <p className="text-xs text-yellow-500 mb-4">↓ 12% resolved this week</p>
            
            {/* Generate Report Button with Progress Overlay */}
            <button
              onClick={handleGenerateReport}
              disabled={isExporting}
              className="mt-auto px-4 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              {/* Progress bar background */}
              {isExporting && (
                <div className="absolute inset-0 bg-yellow-600/40 origin-left animate-pulse"></div>
              )}
              
              {/* Button content */}
              <span className="relative flex items-center gap-2">
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1m3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Generate Report
                  </>
                )}
              </span>
            </button>

            {/* Download progress indicator */}
            {isExporting && (
              <div className="mt-3 space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-400">
                  <span>Generating report...</span>
                  <span>2.5s</span>
                </div>
                <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-progress" style={{
                    animation: 'progress 2.5s ease-out'
                  }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full max-h-96 overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 flex justify-between items-center p-6 border-b border-neutral-800 bg-neutral-900">
              <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-neutral-400 hover:text-white text-2xl transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-widest">Customer Info</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-neutral-400">Plan:</span> <span className="font-semibold text-yellow-400">{selectedCustomer.plan}</span></p>
                  <p><span className="text-neutral-400">Status:</span> <span className={`font-semibold ${getStatusColor(selectedCustomer.status)}`}>{selectedCustomer.status}</span></p>
                  <p><span className="text-neutral-400">Joined:</span> <span className="font-semibold">{selectedCustomer.joinedDate}</span></p>
                </div>
              </div>

              {/* Subscription History */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-widest">Subscription History</h3>
                <div className="space-y-3">
                  {subscriptionHistory[selectedCustomer.id]?.map((sub, idx) => (
                    <div key={idx} className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{sub.plan}</p>
                          <p className="text-xs text-neutral-400 mt-1">{sub.date}</p>
                        </div>
                        <span className="text-yellow-500 font-bold">${sub.price}</span>
                      </div>
                    </div>
                  )) || <p className="text-neutral-400 text-sm">No history available</p>}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-full px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
