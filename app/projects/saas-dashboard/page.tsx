"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Customer Type
type Customer = {
  id: number;
  name: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Inactive' | 'Trial';
  joinedDate: string;
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

// User Growth Data (weekly)
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

  // Filter customers by plan
  const filteredCustomers = filterPlan === 'All' 
    ? mockCustomers 
    : mockCustomers.filter((c) => c.plan === filterPlan);

  // KPI Stats
  const stats = [
    { label: "Monthly Recurring Revenue", value: "$24.5k", change: "+12.5%", color: "emerald" },
    { label: "Active Subscriptions", value: "1,204", change: "+3.2%", color: "blue" },
    { label: "Churn Rate", value: "2.4%", change: "-0.8%", color: "rose" },
    { label: "Avg Revenue Per User", value: "$42", change: "+5.1%", color: "yellow" },
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

      {/* KPI Cards */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md hover:border-yellow-500/30 transition"
            >
              <p className="text-neutral-400 text-sm mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change} vs last period
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* User Growth Chart */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 backdrop-blur-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">User Growth</h2>
            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-xs">
              +12.5% growth
            </span>
          </div>

          {/* SVG Chart */}
          <div className="h-64 w-full flex items-end justify-between gap-2 px-4">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${(data.users / maxUsers) * 100}%`,
                    minHeight: '4px',
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
            <span className="font-semibold text-yellow-500">Current: 1,350 users</span>
            <span>Peak: 1,350 users</span>
          </div>
        </div>
      </section>

      {/* Recent Customers Section */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold">Recent Customers</h2>
          
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="px-6 py-12 text-center text-neutral-400">
              <p>No customers found for the selected plan.</p>
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
    </main>
  );
}
