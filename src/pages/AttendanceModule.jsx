import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Camera, CheckCircle2, ArrowLeft, RefreshCw, ShieldCheck, UserCheck } from 'lucide-react';

const AttendanceModule = ({ user }) => {
  const navigate = useNavigate();
  const isFaculty = user?.role === 'faculty';
  const [step, setStep] = useState('initial'); // initial, scanning, verifying, success
  const [qrToken, setQrToken] = useState('IC-CS201-2026-X7Y9');

  const startScan = () => {
    setStep('scanning');
    setTimeout(() => setStep('verifying'), 2000);
  };

  const completeVerification = () => {
    setStep('success');
  };

  useEffect(() => {
    if (step === 'verifying') {
      const timer = setTimeout(completeVerification, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full hover:bg-glass">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-display">Campus Attendance</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        {isFaculty ? (
          /* Faculty View */
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-10 w-full max-w-sm text-center"
          >
            <h3 className="text-xl mb-2">CS201: Data Structures</h3>
            <p className="text-sm text-muted mb-8">Dynamic QR expires in 45s</p>
            
            <div className="bg-white p-6 rounded-3xl mb-8 mx-auto w-fit shadow-xl">
              <QrCode size={180} color="#000" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted">Total Students</span>
                <span className="font-bold">42</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted">Currently Present</span>
                <span className="text-emerald-400 font-bold">18</span>
              </div>
            </div>

            <button className="button-outline w-full justify-center mt-8 gap-3">
              <RefreshCw size={18} /> Regenerate
            </button>
          </motion.div>
        ) : (
          /* Student View */
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {step === 'initial' && (
                <motion.div 
                  key="initial"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <QrCode size={40} />
                  </div>
                  <h3 className="text-2xl mb-2 font-display">Ready to check-in?</h3>
                  <p className="text-muted mb-10">Scan the QR code displayed by your instructor to mark your attendance.</p>
                  <button 
                    onClick={startScan}
                    className="button-primary w-full justify-center py-5 text-lg"
                  >
                    <Camera size={24} /> Launch Scanner
                  </button>
                </motion.div>
              )}

              {step === 'scanning' && (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative group"
                >
                  <div className="w-full aspect-square max-w-sm mx-auto glass-card border-2 border-primary/50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                       <Camera size={64} className="text-primary/40 animate-pulse" />
                    </div>
                    {/* Scanner Line */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-primary/50 shadow-[0_0_15px_rgba(0,242,254,0.8)] z-10"
                    />
                  </div>
                  <p className="text-center mt-6 text-primary animate-pulse font-medium uppercase tracking-widest">Scanning QR Code...</p>
                </motion.div>
              )}

              {step === 'verifying' && (
                <motion.div 
                  key="verifying"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                   <div className="w-48 h-48 mx-auto relative mb-8">
                     <div className="absolute inset-0 rounded-full border-4 border-dashed border-accent animate-[spin_10s_linear_infinite]" />
                     <div className="absolute inset-4 rounded-full overflow-hidden bg-glass flex items-center justify-center">
                        <UserCheck size={64} className="text-accent" />
                     </div>
                   </div>
                   <h3 className="text-2xl mb-2 font-display">Face Verification</h3>
                   <p className="text-muted">Wait a moment while we verify your identity...</p>
                   <div className="mt-8 flex justify-center">
                      <div className="px-4 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase flex items-center gap-2">
                        <ShieldCheck size={14} /> AI Guardian Active
                      </div>
                   </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-10 text-center border-accent/30"
                >
                  <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl mb-2 font-display">Success!</h3>
                  <p className="text-muted mb-8">Attendance marked for <strong>CS201: Data Structures</strong>.</p>
                  
                  <div className="bg-glass p-4 rounded-2xl mb-8 text-left space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Timestamp</span>
                      <span>10:45 AM, Mar 30</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Location</span>
                      <span>Main Block, Room 102</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="button-primary w-full justify-center"
                  >
                    Back to Home
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default AttendanceModule;
