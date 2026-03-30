import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Briefcase, MapPin, Lock, LogIn } from 'lucide-react';

const roles = [
  { id: 'student', label: 'Student', icon: User, color: '#00f2fe' },
  { id: 'faculty', label: 'Faculty', icon: Briefcase, color: '#4facfe' },
  { id: 'admin', label: 'Admin', icon: ShieldCheck, color: '#00ff88' },
  { id: 'visitor', label: 'Visitor', icon: MapPin, color: '#a0a0ba' },
];

const Login = ({ setUser }) => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulation: accept any login
    setUser({ email, role: selectedRole });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <LogIn size={120} />
        </div>

        <h2 className="text-3xl mb-8 font-display">Welcome Back</h2>
        
        <div className="mb-8">
          <p className="text-sm text-muted mb-4 uppercase tracking-wider">Select Your Role</p>
          <div className="grid grid-cols-2 gap-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                  selectedRole === role.id 
                  ? 'bg-primary/20 border-primary text-primary' 
                  : 'bg-glass border-transparent hover:bg-glass/50 text-muted'
                } border`}
              >
                <role.icon size={20} />
                <span className="font-medium">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-muted ml-1">Email or ID</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. 2026CS101"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted ml-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                className="input-field pr-10" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
            </div>
          </div>

          <button type="submit" className="button-primary w-full justify-center py-4 mt-4">
            Sign In
          </button>
        </form>

        <p className="text-center text-muted text-sm mt-8">
          Forgot password? <a href="#" className="text-primary hover:underline">Contact Support</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
