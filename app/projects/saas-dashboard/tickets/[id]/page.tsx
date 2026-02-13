"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

type Message = {
  id: number;
  sender: 'agent' | 'customer';
  name: string;
  content: string;
  timestamp: string;
};

type Ticket = {
  id: number;
  subject: string;
  customerName: string;
  status: 'Open' | 'Pending' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  date: string;
  description?: string;
  assignedTo?: string;
  assignedToEmail?: string;
  messages?: Message[];
};

// Mock Support Tickets Data
const mockTickets: Record<number, Ticket> = {
  1: {
    id: 1,
    subject: "Dashboard loading slowly on large datasets",
    customerName: "Acme Corp",
    status: "Open",
    priority: "High",
    date: "2026-02-12",
    description: "When loading datasets with over 100,000 records, the dashboard takes 15-20 seconds to render. This is impacting user experience and productivity.",
    assignedTo: "Sarah Johnson",
    assignedToEmail: "sarah.johnson@company.com",
    messages: [
      {
        id: 1,
        sender: "customer",
        name: "John Smith (Acme Corp)",
        content: "Hi, our team has been experiencing slow loading times when we try to view large datasets. This happens specifically when we have over 100k records.",
        timestamp: "2026-02-12 09:30"
      },
      {
        id: 2,
        sender: "agent",
        name: "Sarah Johnson",
        content: "Thanks for reporting this, John. I understand your concern. Can you tell me more about your data structure? Are you using any filters or sorting?",
        timestamp: "2026-02-12 10:15"
      },
      {
        id: 3,
        sender: "customer",
        name: "John Smith (Acme Corp)",
        content: "Yes, we're using multiple filters and sorting by date. The dataset has about 150k records spread across 10 columns.",
        timestamp: "2026-02-12 10:45"
      },
      {
        id: 4,
        sender: "agent",
        name: "Sarah Johnson",
        content: "That helps! This sounds like it might be a pagination or indexing issue. I'm escalating this to our dev team to investigate. We should have an update within 24 hours.",
        timestamp: "2026-02-12 11:20"
      },
    ]
  },
  2: {
    id: 2,
    subject: "Integration with Stripe not processing payments",
    customerName: "TechStart Inc",
    status: "Pending",
    priority: "Urgent",
    date: "2026-02-11",
    description: "Stripe webhook integration has stopped processing payments. Last successful transaction was on Feb 10. Users are unable to complete purchases.",
    assignedTo: "Michael Chen",
    assignedToEmail: "michael.chen@company.com",
    messages: [
      {
        id: 1,
        sender: "customer",
        name: "Emma Davis (TechStart Inc)",
        content: "Our payments stopped working yesterday! We're losing orders and customers are frustrated.",
        timestamp: "2026-02-11 14:00"
      },
      {
        id: 2,
        sender: "agent",
        name: "Michael Chen",
        content: "I'm very sorry to hear that. Let me check the webhook logs immediately. Can you share your Stripe account ID?",
        timestamp: "2026-02-11 14:30"
      },
      {
        id: 3,
        sender: "customer",
        name: "Emma Davis (TechStart Inc)",
        content: "It's acct_xxxxx. We had a successful charge on Feb 10 at 3:45 PM but nothing since.",
        timestamp: "2026-02-11 14:45"
      },
      {
        id: 4,
        sender: "agent",
        name: "Michael Chen",
        content: "Found the issue! Your webhook URL returned a 500 error. I've identified the cause and we're deploying a fix now. Should be resolved within 30 minutes.",
        timestamp: "2026-02-11 15:20"
      },
    ]
  },
  3: {
    id: 3,
    subject: "Request: Add dark mode toggle to settings",
    customerName: "Digital Agency",
    status: "Open",
    priority: "Low",
    date: "2026-02-10",
    description: "Feature request from customer to add a dark mode toggle in user settings. This would improve accessibility for evening work sessions.",
    assignedTo: "Emma Williams",
    assignedToEmail: "emma.williams@company.com",
    messages: [
      {
        id: 1,
        sender: "customer",
        name: "Marcus Lee (Digital Agency)",
        content: "Hi! Would it be possible to add a dark mode toggle? Our team works late and it would be really helpful.",
        timestamp: "2026-02-10 16:00"
      },
      {
        id: 2,
        sender: "agent",
        name: "Emma Williams",
        content: "Great request, Marcus! Dark mode is definitely something we're considering. I'm adding this to our product roadmap.",
        timestamp: "2026-02-10 16:45"
      },
    ]
  },
  4: {
    id: 4,
    subject: "User export feature not working with CSV",
    customerName: "Global Solutions",
    status: "Resolved",
    priority: "Medium",
    date: "2026-02-09",
    description: "Export to CSV button was not including all columns. Fixed by updating the export mapping logic.",
    assignedTo: "Alex Rivera",
    assignedToEmail: "alex.rivera@company.com",
    messages: [
      {
        id: 1,
        sender: "customer",
        name: "Robert Chen (Global Solutions)",
        content: "The CSV export is missing some columns. We need all data for our reporting.",
        timestamp: "2026-02-09 10:00"
      },
      {
        id: 2,
        sender: "agent",
        name: "Alex Rivera",
        content: "I've identified and fixed the column mapping issue. Please try exporting again.",
        timestamp: "2026-02-09 11:30"
      },
      {
        id: 3,
        sender: "customer",
        name: "Robert Chen (Global Solutions)",
        content: "Perfect! All columns are included now. Thank you for the quick fix!",
        timestamp: "2026-02-09 12:00"
      },
    ]
  },
  5: {
    id: 5,
    subject: "API rate limiting causing timeout errors",
    customerName: "Creative Studio",
    status: "Pending",
    priority: "High",
    date: "2026-02-08",
    description: "Customers hitting 429 errors when making bulk API calls. Current rate limit of 100 req/min may be too restrictive for their workflow.",
    assignedTo: "James Park",
    assignedToEmail: "james.park@company.com",
    messages: [
      {
        id: 1,
        sender: "customer",
        name: "Lisa Wong (Creative Studio)",
        content: "We're getting 429 errors when running bulk imports. The rate limit seems too strict.",
        timestamp: "2026-02-08 13:15"
      },
      {
        id: 2,
        sender: "agent",
        name: "James Park",
        content: "I understand. Let me check your usage patterns and discuss rate limit options with the team.",
        timestamp: "2026-02-08 13:45"
      },
    ]
  },
  6: {
    id: 6,
    subject: "Need technical documentation for webhook setup",
    customerName: "CloudFirst",
    status: "Open",
    priority: "Medium",
    date: "2026-02-07",
    description: "Customer needs detailed documentation on setting up webhooks for their integration. Current docs are missing implementation examples.",
    assignedTo: "Lisa Anderson",
    assignedToEmail: "lisa.anderson@company.com",
    messages: [
      {
        id: 1,
        sender: "customer",
        name: "David Park (CloudFirst)",
        content: "Your webhook documentation is unclear. Can you provide code examples?",
        timestamp: "2026-02-07 09:00"
      },
      {
        id: 2,
        sender: "agent",
        name: "Lisa Anderson",
        content: "Absolutely! I'm creating a detailed guide with code examples in Python, Node.js, and Go.",
        timestamp: "2026-02-07 10:00"
      },
    ]
  },
};

export default function TicketDetail() {
  const params = useParams();
  const ticketId = parseInt(params.id as string);
  const ticket = mockTickets[ticketId];
  
  const [messages, setMessages] = useState<Message[]>(ticket?.messages || []);
  const [replyText, setReplyText] = useState("");
  const [status, setStatus] = useState<'Open' | 'Pending' | 'Resolved'>(ticket?.status || 'Open');

  if (!ticket) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <header className="pt-20 px-6 max-w-7xl mx-auto">
          <Link href="/projects/saas-dashboard/tickets" className="text-yellow-500 hover:text-yellow-400 transition font-semibold flex items-center gap-2 mb-8">
            <span>←</span> Back to Tickets
          </Link>
          <div className="text-center py-12">
            <p className="text-neutral-400">Ticket not found.</p>
          </div>
        </header>
      </main>
    );
  }

  const handleSendReply = () => {
    if (replyText.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "agent",
      name: "Sarah Johnson",
      content: replyText,
      timestamp: new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
    };

    setMessages([...messages, newMessage]);
    setReplyText("");
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-emerald-500/20 border-emerald-500/30 text-emerald-300";
      case "Pending":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-300";
      case "Resolved":
        return "bg-neutral-500/20 border-neutral-500/30 text-neutral-400";
      default:
        return "bg-neutral-500/20 border-neutral-500/30 text-neutral-300";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-blue-500/20 border-blue-500/30 text-blue-300";
      case "Medium":
        return "bg-purple-500/20 border-purple-500/30 text-purple-300";
      case "High":
        return "bg-orange-500/20 border-orange-500/30 text-orange-300";
      case "Urgent":
        return "bg-rose-500/20 border-rose-500/30 text-rose-300";
      default:
        return "bg-neutral-500/20 border-neutral-500/30 text-neutral-300";
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="pt-20 px-6 max-w-7xl mx-auto mb-8">
        <Link href="/projects/saas-dashboard/tickets" className="text-yellow-500 hover:text-yellow-400 transition font-semibold flex items-center gap-2 mb-8">
          <span>←</span> Back to Tickets
        </Link>
        <h1 className="text-4xl font-black mb-2">{ticket.subject}</h1>
        <p className="text-neutral-400">Ticket #{ticket.id.toString().padStart(4, '0')}</p>
      </header>

      {/* Two-Column Layout */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Conversation Thread */}
          <div className="lg:col-span-2 space-y-6">
            {/* Messages Container */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md min-h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'agent' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                      message.sender === 'agent'
                        ? 'bg-neutral-800 border border-neutral-700'
                        : 'bg-yellow-500/20 border border-yellow-500/30'
                    }`}>
                      <p className="text-xs font-semibold mb-2 text-neutral-400">{message.name}</p>
                      <p className="text-sm text-neutral-200 mb-2">{message.content}</p>
                      <p className="text-xs text-neutral-500">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="border-t border-neutral-700 pt-4">
                <div className="flex flex-col gap-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500 transition resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleSendReply}
                    className="px-6 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition self-end"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Metadata Sidebar */}
          <div className="space-y-4">
            {/* Status Control */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-sm text-neutral-400 mb-3 uppercase tracking-widest font-semibold">Status</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Open' | 'Pending' | 'Resolved')}
                className={`w-full px-4 py-3 rounded-lg border font-semibold cursor-pointer ${
                  getStatusBadgeColor(status)
                } bg-transparent focus:outline-none transition`}
              >
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Priority */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-sm text-neutral-400 mb-3 uppercase tracking-widest font-semibold">Priority</p>
              <div className={`px-4 py-3 rounded-lg border text-center font-semibold ${getPriorityBadgeColor(ticket.priority)}`}>
                {ticket.priority}
              </div>
            </div>

            {/* Assigned Agent */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-sm text-neutral-400 mb-3 uppercase tracking-widest font-semibold">Assigned Agent</p>
              <div className="space-y-2">
                <p className="font-semibold text-white">{ticket.assignedTo}</p>
                <p className="text-xs text-neutral-500">{ticket.assignedToEmail}</p>
              </div>
            </div>

            {/* Created Date */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-sm text-neutral-400 mb-3 uppercase tracking-widest font-semibold">Created</p>
              <p className="font-semibold text-white">{new Date(ticket.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            {/* Customer Profile */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
              <p className="text-sm text-neutral-400 mb-3 uppercase tracking-widest font-semibold">Customer</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-sm">{ticket.customerName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{ticket.customerName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Count */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md text-center">
              <p className="text-3xl font-black text-yellow-400 mb-1">{messages.length}</p>
              <p className="text-sm text-neutral-400">messages in thread</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
