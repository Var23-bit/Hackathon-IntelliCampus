import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MapPin, CheckCircle, AlertTriangle, ArrowLeft, BarChart3, BellRing } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Complaints', value: '1,280', icon: AlertTriangle, color: 'text-orange-400' },
    { label: 'Avg Attendance', value: '88%', icon: CheckCircle, color: 'text-emerald-400' },
    { label: 'Daily Navigations', value: '450+', icon: MapPin, color: 'text-blue-400' },
    { label: 'Active Users', value: '5,000+', icon: Users, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full hover:bg-glass">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-display">Command Center</h1>
        </div>
        <div className="flex gap-4">
           <button className="button-outline p-3 rounded-xl"><BellRing size={20} /></button>
           <button className="button-primary px-6">Export Reports</button>
        </div>
      </header>

      <main className="container max-w-6xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-glass ${s.color}`}>
                  <s.icon size={24} />
                </div>
                <BarChart3 size={16} className="text-muted" />
              </div>
              <p className="text-3xl font-bold mb-1">{s.value}</p>
              <p className="text-sm text-muted uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Complaints */}
          <div className="glass-card p-6">
            <h3 className="text-xl mb-6 font-display">Critical Issues</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-glass border border-border">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">Server Downtime in Block D</p>
                    <p className="text-xs text-muted mb-2">Reported by 12 students • 15 mins ago</p>
                    <div className="flex gap-2">
                       <button className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded-md">ASSIGN</button>
                       <button className="px-3 py-1 bg-glass text-muted text-[10px] font-bold rounded-md">IGNORE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrollment Trend Mockup */}
          <div className="glass-card p-6 flex flex-col">
            <h3 className="text-xl mb-6 font-display">Attendance Heatmap</h3>
            <div className="flex-grow flex items-end gap-2 h-48">
               {[40, 70, 45, 90, 65, 80, 55, 95, 30, 85].map((h, i) => (
                 <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    key={i} 
                    className="flex-grow bg-gradient-to-t from-primary/20 to-primary rounded-t-sm"
                 />
               ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-muted uppercase">
               <span>Mon</span>
               <span>Wed</span>
               <span>Fri</span>
               <span>Sun</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
