import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Briefcase, MapPin, Lock, LogIn } from 'lucide-react';

const roles = [
  { id: 'student', label: 'Student', icon: User },
  { id: 'faculty', label: 'Faculty', icon: Briefcase },
  { id: 'admin', label: 'Admin', icon: ShieldCheck },
  { id: 'visitor', label: 'Visitor', icon: MapPin },
];

const Login = ({ setUser }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ email, role: selectedRole });
    navigate('/dashboard');
  };

  return (
    <div className="page-center-layout">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="login-card"
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div className="flex-center" style={{ width: '4rem', height: '4rem', background: 'var(--bg-light)', borderRadius: '1rem', color: 'var(--primary)' }}>
            <LogIn size={32} />
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)' }}>Access your IntelliCampus account</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Choose Your Role</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem',
                  borderRadius: '1rem',
                  border: '2px solid',
                  borderColor: selectedRole === role.id ? 'var(--primary)' : 'var(--border)',
                  background: selectedRole === role.id ? 'rgba(37, 99, 235, 0.05)' : 'white',
                  color: selectedRole === role.id ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <role.icon size={18} />
                <span style={{ fontWeight: 600 }}>{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'block' }}>Email or ID</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. 2026CS101"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'block' }}>Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button-full">
            Sign In <ShieldCheck size={20} />
          </button>
        </form>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Difficulty signing in? <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact Support</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
