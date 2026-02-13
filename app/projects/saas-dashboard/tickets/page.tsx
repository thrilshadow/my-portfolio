"use client";

import Link from 'next/link';
import { useState } from 'react';

type Ticket = {
  id: number;
  subject: string;
  customerName: string;
  status: 'Open' | 'Pending' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  category: 'Billing' | 'Bug' | 'Database' | 'Feature Request' | 'Security';
  date: string;
};

// Mock Support Tickets Data
const mockTickets: Ticket[] = [
  {
    id: 1,
    subject: "Dashboard loading slowly on large datasets",
    customerName: "Acme Corp",
    status: "Open",
    priority: "High",
    category: "Database",
    date: "2026-02-12"
  },
  {
    id: 2,
    subject: "Integration with Stripe not processing payments",
    customerName: "TechStart Inc",
    status: "Pending",
    priority: "Urgent",
    category: "Billing",
    date: "2026-02-11"
  },
  {
    id: 3,
    subject: "Request: Add dark mode toggle to settings",
    customerName: "Digital Agency",
    status: "Open",
    priority: "Low",
    category: "Feature Request",
    date: "2026-02-10"
  },
  {
    id: 4,
    subject: "User export feature not working with CSV",
    customerName: "Global Solutions",
    status: "Resolved",
    priority: "Medium",
    category: "Bug",
    date: "2026-02-09"
  },
  {
    id: 5,
    subject: "API rate limiting causing timeout errors",
    customerName: "Creative Studio",
    status: "Pending",
    priority: "High",
    category: "Security",
    date: "2026-02-08"
  },
  {
    id: 6,
    subject: "Need technical documentation for webhook setup",
    customerName: "CloudFirst",
    status: "Open",
    priority: "Medium",
    category: "Feature Request",
    date: "2026-02-07"
  },
];

export default function SupportTickets() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tickets by search term
  const filteredTickets = mockTickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Resolved":
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
      default:
        return "bg-neutral-500/20 text-neutral-300 border-neutral-500/30";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Medium":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "High":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Urgent":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-neutral-500/20 text-neutral-300 border-neutral-500/30";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Billing":
        return "border-blue-500/50 text-blue-400";
      case "Bug":
        return "border-rose-500/50 text-rose-400";
      case "Database":
        return "border-purple-500/50 text-purple-400";
      case "Feature Request":
        return "border-emerald-500/50 text-emerald-400";
      case "Security":
        return "border-orange-500/50 text-orange-400";
      default:
        return "border-neutral-500/50 text-neutral-400";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="pt-20 px-6 max-w-7xl mx-auto mb-8">
        <Link href="/projects/saas-dashboard" className="text-yellow-500 hover:text-yellow-400 transition font-semibold flex items-center gap-2 mb-8">
          <span>←</span> Back to Dashboard
        </Link>
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Support Tickets
          </h1>
          <p className="text-neutral-400">Manage customer support requests and issues</p>
        </div>
      </header>

      {/* Search Bar */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by subject or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 bg-neutral-900/80 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 transition backdrop-blur-md"
          />
          <div className="px-4 py-3 bg-neutral-900/80 border border-neutral-800 rounded-lg backdrop-blur-md flex items-center gap-2 text-neutral-400">
            <span className="text-sm font-semibold">{filteredTickets.length}</span>
            <span className="text-sm">tickets</span>
          </div>
        </div>
      </section>

      {/* Tickets List */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center backdrop-blur-md">
              <p className="text-neutral-400">No tickets found matching your search.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/projects/saas-dashboard/tickets/${ticket.id}`}
                className="group block"
              >
                <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md hover:border-yellow-500/50 hover:bg-neutral-900/80 transition cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Ticket Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold group-hover:text-yellow-400 transition">
                              {ticket.subject}
                            </h3>
                            <span className={`px-2 py-1 border rounded text-xs font-semibold ${getCategoryBadgeColor(ticket.category)}`}>
                              {ticket.category}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-400">
                            {ticket.customerName}
                          </p>
                        </div>
                        <span className="text-xs text-neutral-500 whitespace-nowrap">
                          #{ticket.id.toString().padStart(4, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Badges and Details */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeColor(ticket.status)}`}>
                        {ticket.status}
                      </span>

                      {/* Priority Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityBadgeColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>

                      {/* Date */}
                      <span className="text-xs text-neutral-500 whitespace-nowrap">
                        {formatDate(ticket.date)}
                      </span>

                      {/* Arrow Indicator */}
                      <span className="text-yellow-500 opacity-0 group-hover:opacity-100 transition">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {filteredTickets.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm text-neutral-400">
            <div className="flex gap-8">
              <div>
                <p className="font-semibold text-emerald-400">{mockTickets.filter(t => t.status === 'Open').length}</p>
                <p>Open</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-400">{mockTickets.filter(t => t.status === 'Pending').length}</p>
                <p>Pending</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-400">{mockTickets.filter(t => t.status === 'Resolved').length}</p>
                <p>Resolved</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="font-semibold text-rose-400">{mockTickets.filter(t => t.priority === 'Urgent').length}</p>
                <p>Urgent</p>
              </div>
              <div>
                <p className="font-semibold text-orange-400">{mockTickets.filter(t => t.priority === 'High').length}</p>
                <p>High Priority</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
