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
const userGrowthData = [
  { week: "Week 1", users: 240 },
  { week: "Week 2", users: 385 },
  { week: "Week 3", users: 520 },
  { week: "Week 4", users: 680 },
  { week: "Week 5", users: 850 },
  { week: "Week 6", users: 1020 },
  { week: "Week 7", users: 1204 },
  { week: "Week 8", users: 1350 },
];

const maxUsers = Math.max(...userGrowthData.map((d) => d.users));

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-neutral-400">Real-time SaaS metrics and customer insights</p>
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

      {/* User Growth Chart with Animation */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">User Growth</h2>
            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-xs">
              +12.5% growth
            </span>
          </div>

          {/* Animated SVG Chart */}
          <div className="h-64 w-full flex items-end justify-between gap-2 px-4">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer ${
                    chartAnimated ? 'animate-grow' : 'h-0'
                  }`}
                  style={{
                    height: chartAnimated ? `${(data.users / maxUsers) * 100}%` : '0',
                    minHeight: '4px',
                    animation: chartAnimated ? `growBar 0.8s ease-out ${index * 0.1}s both` : 'none',
                  }}
                  title={`${data.week}: ${data.users} users`}
                />
                <span className="text-xs text-neutral-500 text-center truncate w-full">{data.week}</span>
              </div>
            ))}
          </div>

          {/* Chart Legend */}
          <div className="mt-8 pt-8 border-t border-neutral-800 flex justify-between text-sm text-neutral-400">
            <span>Start: 240 users</span>
            <span className="font-semibold text-yellow-500">Current: {activeUsersValue} users</span>
            <span>Peak: 1,350 users</span>
          </div>
        </div>

        <style>{`
          @keyframes growBar {
            from { height: 0; opacity: 0; }
            to { height: var(--bar-height, 100%); opacity: 1; }
          }
          .animate-grow { animation: growBar 0.8s ease-out; }
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
        `}</style>
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

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-neutral-400 text-sm font-semibold mb-3">Support Tickets</h3>
            <p className="text-3xl font-black text-yellow-400">24</p>
            <p className="text-xs text-yellow-500 mt-2">↓ 12% resolved this week</p>
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
