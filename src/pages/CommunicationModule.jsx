import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, ArrowLeft, Plus, Clock, CheckCircle2, AlertCircle, Bot, User, Trash2 } from 'lucide-react';

const mockFAQs = [
  { q: 'where is exam cell', a: 'The Exam Cell is located in the Admin Block, 1st Floor, Room 104.' },
  { q: 'how to apply for id card', a: 'You can apply via the Student Portal under Documents > ID Card Requisition.' },
  { q: 'bonafide certificate', a: 'Bonafide certificates are issued at the Registrar Office (Main Block, Ground Floor).' },
  { q: 'library timings', a: 'The Library is open from 8:00 AM to 10:00 PM on weekdays and 9:00 AM to 5:00 PM on weekends.' },
];

const CommunicationModule = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tickets'); // tickets, chat
  const [complaints, setComplaints] = useState([
    { id: 'TKT-1024', title: 'Water issue in Block A', status: 'Resolved', date: '2 days ago' },
    { id: 'TKT-1056', title: 'Lab 3 PC not working', status: 'In Progress', date: 'Yesterday' },
  ]);
  const [newComplaint, setNewComplaint] = useState({ title: '', desc: '', category: 'Maintenance' });
  const [showForm, setShowForm] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your IntelliCampus Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const submitComplaint = (e) => {
    e.preventDefault();
    const tkt = {
      id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      title: newComplaint.title,
      status: 'Open',
      date: 'Just now'
    };
    setComplaints([tkt, ...complaints]);
    setShowForm(false);
    setNewComplaint({ title: '', desc: '', category: 'Maintenance' });
  };

  const handleChat = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Bot response logic
    setTimeout(() => {
      const match = mockFAQs.find(f => input.toLowerCase().includes(f.q));
      const botMsg = { 
        role: 'bot', 
        text: match ? match.a : "I'm sorry, I couldn't find specific info on that. Would you like to raise a ticket?"
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 bg-dark/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full hover:bg-glass">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-display">Communication Center</h1>
        </div>
        <div className="flex bg-glass p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'tickets' ? 'bg-primary text-black' : 'text-muted'}`}
          >
            TICKETS
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'chat' ? 'bg-primary text-black' : 'text-muted'}`}
          >
            AI BOT
          </button>
        </div>
      </header>

      <main className="flex-grow container max-w-2xl px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'tickets' ? (
            <motion.div 
               key="tickets"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-display">Your Requests</h2>
                <button 
                  onClick={() => setShowForm(true)}
                  className="button-primary px-4 py-2 text-sm"
                >
                  <Plus size={18} /> New Ticket
                </button>
              </div>

              {showForm && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="glass-card p-6 border-primary/20 overflow-hidden"
                >
                  <form onSubmit={submitComplaint} className="space-y-4">
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Title (e.g. WiFi not working)" 
                      value={newComplaint.title}
                      onChange={e => setNewComplaint({...newComplaint, title: e.target.value})}
                      required
                    />
                    <select 
                      className="input-field bg-dark"
                      value={newComplaint.category}
                      onChange={e => setNewComplaint({...newComplaint, category: e.target.value})}
                    >
                      <option>Maintenance</option>
                      <option>Academic</option>
                      <option>Security</option>
                      <option>IT Support</option>
                    </select>
                    <textarea 
                      className="input-field min-h-[100px]" 
                      placeholder="Details..."
                      value={newComplaint.desc}
                      onChange={e => setNewComplaint({...newComplaint, desc: e.target.value})}
                    />
                    <div className="flex gap-4">
                      <button type="submit" className="button-primary flex-grow justify-center">Submit</button>
                      <button type="button" onClick={() => setShowForm(false)} className="button-outline">Cancel</button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="space-y-4">
                {complaints.map(tkt => (
                  <div key={tkt.id} className="glass-card p-4 flex items-center justify-between group">
                    <div className="flex gap-4 items-center">
                      <div className={`p-3 rounded-xl bg-glass ${tkt.status === 'Resolved' ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {tkt.status === 'Resolved' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                      </div>
                      <div>
                        <p className="font-semibold">{tkt.title}</p>
                        <div className="flex gap-3 text-[10px] text-muted uppercase tracking-wider">
                          <span>{tkt.id}</span>
                          <span>•</span>
                          <span>{tkt.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      tkt.status === 'Resolved' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-orange-500/15 text-orange-400'
                    }`}>
                      {tkt.status}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
               key="chat"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="flex flex-col h-[70vh] glass-card overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <Bot size={24} />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold">Campus AI Assistant</h3>
                    <p className="text-[10px] text-accent uppercase font-bold">Online</p>
                 </div>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((m, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      m.role === 'user' 
                      ? 'bg-primary text-black font-medium rounded-tr-none' 
                      : 'bg-glass text-white border border-border rounded-tl-none'
                    }`}>
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <form onSubmit={handleChat} className="p-4 border-t border-border flex gap-2">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Ask me anything..." 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button type="submit" className="p-4 bg-primary rounded-xl text-black">
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CommunicationModule;
