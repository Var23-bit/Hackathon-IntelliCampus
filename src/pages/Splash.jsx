import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-dark">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-primary/20">
          <Sparkles size={48} color="#000" />
        </div>
        <h1 className="text-5xl md:text-7xl mb-2 gradient-text font-display">IntelliCampus</h1>
        <p className="text-xl text-muted max-w-md mx-auto">
          The future of smart campus living. Integrated, real-time, and AI-powered.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={() => navigate('/login')}
        className="button-primary px-10 py-5 text-lg"
      >
        Get Started <ArrowRight size={20} />
      </motion.button>

      <div className="absolute bottom-10 text-muted/50 text-sm">
        Built for Hackathon MVP 2026
      </div>
    </div>
  );
};

export default Splash;
