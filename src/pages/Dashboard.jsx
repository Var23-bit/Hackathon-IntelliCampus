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
    <div className="full-screen">
      {/* Header */}
      <header className="main-header">
        <div className="header-logo">
          <div className="flex-center" style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '0.75rem' }}>
            <GraduationCap size={24} color="#fff" />
          </div>
          <span>IntelliCampus</span>
        </div>
        
        <div className="header-profile">
          <span style={{ fontWeight: 500 }} className="hidden-mobile">Welcome, {userName}!</span>
          <div className="avatar-circle">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
              alt="Profile" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </header>

      <main className="dashboard-container">
        
        {/* Hero Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-section"
        >
          <div className="text-center">
            <h1 className="hero-title">Welcome to IntelliCampus</h1>
            <p className="hero-subtitle">Your Smart Campus Assistant</p>
          </div>
          
          <div className="hero-image-container">
            <img 
              src="/campus-hero.png" 
              alt="Campus Illustration" 
              className="hero-image"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1000' }}
            />
          </div>
        </motion.div>

        {/* Action Button Grid */}
        <div className="action-grid">
          <ActionButton 
            title="Navigate Campus" 
            icon={<Map size={32} />} 
            background="linear-gradient(to right, #3b82f6, #1d4ed8)" 
            onClick={() => navigate('/navigation')}
          />
          <ActionButton 
            title="QR Attendance" 
            icon={<QrCode size={32} />} 
            background="linear-gradient(to right, #f97316, #ef4444)" 
            onClick={() => navigate('/attendance')}
          />
          <ActionButton 
            title="Report Issue" 
            icon={<AlertCircle size={32} />} 
            background="linear-gradient(to right, #10b981, #0f766e)" 
            onClick={() => navigate('/communication')}
          />
        </div>

        {/* Informational Grid */}
        <div className="info-grid">
          <InfoCard 
            title="Upcoming Events" 
            icon={<Calendar style={{ color: '#2563eb' }} />}
            content={
              <div className="text-center">
                <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>Orientation Session</p>
                <p style={{ color: 'var(--text-muted)' }}>Today, 10:00 AM</p>
              </div>
            }
            footerText="View More"
          />
          <InfoCard 
            title="Attendance Stats" 
            icon={<BarChart3 style={{ color: '#2563eb' }} />}
            content={
              <div className="text-center">
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Today's Attendance</p>
                <div className="flex-center" style={{ gap: '0.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981' }}>85%</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Present</span>
                </div>
              </div>
            }
            footerText="View Details"
          />
          <InfoCard 
            title="Campus Notices" 
            icon={<Megaphone style={{ color: '#2563eb' }} />}
            content={
              <div className="text-center">
                <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>Library Hours Updated</p>
                <p style={{ color: 'var(--text-muted)' }}>New timings posted</p>
              </div>
            }
            footerText="Read More"
          />
        </div>

        {/* Styled Footer */}
        <footer className="main-footer">
          <div className="footer-line"></div>
          <span className="footer-text">Making Campus Life Smarter</span>
          <div className="footer-line"></div>
        </footer>
      </main>
    </div>
  );
};

const ActionButton = ({ title, icon, background, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="action-button"
    style={{ background }}
  >
    <div className="action-icon-box">
      {icon}
    </div>
    <span>{title}</span>
  </motion.button>
);

const InfoCard = ({ title, icon, content, footerText }) => (
  <div className="info-card">
    <div className="info-card-header">
      {icon}
      <h4 style={{ color: '#374151' }}>{title}</h4>
    </div>
    
    <div className="info-card-content">
      {content}
    </div>

    <button className="info-card-footer">
      {footerText} <ChevronRight size={14} />
    </button>
  </div>
);

export default Dashboard;

