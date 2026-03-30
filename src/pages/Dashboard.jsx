import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Map, 
  QrCode, 
  AlertCircle, 
  Calendar, 
  BarChart3, 
  Megaphone, 
  User, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const userName = user?.email?.split('@')[0] || 'John';

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans">
      {/* Header */}
      <header className="bg-[#1e40af] text-white px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <GraduationCap size={24} color="#fff" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">IntelliCampus</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium hidden sm:inline">Welcome, {userName}!</span>
          <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden cursor-pointer hover:border-white transition-colors">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
              alt="Profile" 
              className="w-full h-full object-cover bg-white"
            />
          </div>
          <ChevronRight size={16} className="rotate-90 hidden sm:block opacity-70" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row items-center p-8 md:p-0 min-h-[300px]"
        >
          <div className="md:w-1/2 p-8 md:p-12 z-10">
            <h2 className="text-[#1e3a8a] text-4xl font-bold mb-4">Welcome to IntelliCampus</h2>
            <p className="text-gray-500 text-xl">Your Smart Campus Assistant</p>
          </div>
          <div className="md:w-1/2 h-full min-h-[250px] relative">
            <img 
              src="/campus-hero.png" 
              alt="Campus Illustration" 
              className="absolute inset-0 w-full h-full object-cover object-center md:object-right"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000' }}
            />
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionButton 
            title="Navigate Campus" 
            icon={<Map size={32} />} 
            color="bg-gradient-to-r from-blue-500 to-blue-700" 
            onClick={() => navigate('/navigation')}
          />
          <ActionButton 
            title="QR Attendance" 
            icon={<QrCode size={32} />} 
            color="bg-gradient-to-r from-orange-400 to-red-500" 
            onClick={() => navigate('/attendance')}
          />
          <ActionButton 
            title="Report Issue" 
            icon={<AlertCircle size={32} />} 
            color="bg-gradient-to-r from-emerald-500 to-teal-700" 
            onClick={() => navigate('/communication')}
          />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
          <InfoCard 
            title="Upcoming Events" 
            icon={<Calendar className="text-blue-600" />}
            items={[
              { title: "Orientation Session", time: "Today, 10:00 AM" }
            ]}
            footerText="View More"
          />
          <InfoCard 
            title="Attendance Stats" 
            icon={<BarChart3 className="text-blue-600" />}
            centerContent={
              <div className="text-center py-2">
                <p className="text-xs text-gray-400 mb-1">Today's Attendance</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-3xl font-bold text-emerald-500">85%</span>
                  <span className="text-sm text-gray-500 font-medium">Present</span>
                </div>
              </div>
            }
            footerText="View Details"
          />
          <InfoCard 
            title="Campus Notices" 
            icon={<Megaphone className="text-blue-600" />}
            items={[
              { title: "Library Hours Updated", time: "New timings posted" }
            ]}
            footerText="Read More"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 flex flex-col items-center justify-center opacity-50">
        <div className="flex items-center gap-4 w-full max-w-md px-6">
          <div className="h-[1px] bg-gray-400 flex-grow"></div>
          <span className="text-sm font-medium whitespace-nowrap italic text-gray-600">Making Campus Life Smarter</span>
          <div className="h-[1px] bg-gray-400 flex-grow"></div>
        </div>
      </footer>
    </div>
  );
};

const ActionButton = ({ title, icon, color, onClick }) => (
  <motion.button
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`${color} text-white p-8 rounded-3xl flex items-center justify-center gap-4 shadow-lg hover:shadow-xl transition-all w-full text-left`}
  >
    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
      {icon}
    </div>
    <span className="text-xl font-bold">{title}</span>
  </motion.button>
);

const InfoCard = ({ title, icon, items, centerContent, footerText }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col min-h-[220px]">
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-50">
      {icon}
      <h4 className="font-bold text-gray-700">{title}</h4>
    </div>
    
    <div className="flex-grow">
      {centerContent}
      {items?.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-gray-800">{item.title}</p>
          <p className="text-xs text-gray-400">{item.time}</p>
        </div>
      ))}
    </div>

    <button className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:gap-2 transition-all mt-4">
      {footerText} <ChevronRight size={14} />
    </button>
  </div>
);

export default Dashboard;
