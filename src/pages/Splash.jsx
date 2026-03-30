import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="page-center-layout" style={{ background: 'var(--header-bg)', color: 'white' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
      >
        <div style={{ 
          width: '6rem', 
          height: '6rem', 
          background: 'rgba(255,255,255,0.2)', 
          borderRadius: '2rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
          <Sparkles size={48} color="#fff" />
        </div>
        
        <div className="text-center">
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 800 }}>IntelliCampus</h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            The future of smart campus living. Integrated, real-time, and AI-powered.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="button-full"
          style={{ background: 'white', color: 'var(--header-bg)', width: 'auto', padding: '1.25rem 3rem', fontSize: '1.25rem' }}
        >
          Get Started <ArrowRight size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Splash;
