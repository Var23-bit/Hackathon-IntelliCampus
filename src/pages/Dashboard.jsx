import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, CheckCircle, MessageSquare, Bell, User, LogOut, ChevronRight, Search } from 'lucide-react';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const modules = [
    { 
      id: 'nav', 
      title: 'Smart Navigation', 
      desc: 'Find departments, labs, and offices easily.', 
      icon: Map, 
      path: '/navigation',
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      id: 'att', 
      title: 'Attendance', 
      desc: 'Mark your presence with QR and Face ID.', 
      icon: CheckCircle, 
      path: '/attendance',
      color: 'from-emerald-400 to-teal-400'
    },
    { 
      id: 'comm', 
      title: 'Communication', 
      desc: 'Submit complaints and talk to our AI bot.', 
      icon: MessageSquare, 
      path: '/communication',
      color: 'from-purple-400 to-indigo-400'
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="p-6 flex items-center justify-between sticky top-0 bg-dark/80 backdrop-blur-md z-10">
        <div>
          <h1 className="text-2xl font-display neon-text">IntelliCampus</h1>
          <p className="text-xs text-muted">A Digital Twin Experience</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-glass hover:bg-glass/50 text-muted relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 bg-glass px-4 py-2 rounded-full border border-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <User size={16} color="#000" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold">{user?.email?.split('@')[0] || 'User'}</p>
              <p className="text-[10px] text-muted uppercase">{user?.role}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mt-6 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h2 className="text-4xl mb-2 font-display">Hello, {user?.email?.split('@')[0] || 'Student'}!</h2>
          <p className="text-muted">What would you like to do today?</p>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {modules.map((mod, idx) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(mod.path)}
              className="glass-card p-6 flex flex-col items-start cursor-pointer group hover:border-primary/50 transition-all"
            >
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${mod.color} mb-6 shadow-lg shadow-white/5`}>
                <mod.icon size={28} color="#000" />
              </div>
              <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">{mod.title}</h3>
              <p className="text-sm text-muted mb-6 flex-grow">{mod.desc}</p>
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                Open Module <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Info Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display">Recent Updates</h3>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          
          <div className="glass-card p-4 space-y-4">
            <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-glass transition-colors">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">Holiday Notice: Tomorrow</p>
                <p className="text-xs text-muted">2 hours ago • Campus Admin</p>
              </div>
            </div>
            <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-glass transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">Attendance marked for CS201</p>
                <p className="text-xs text-muted">Yesterday • System</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quick Search FAB */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all">
          <Search size={24} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
