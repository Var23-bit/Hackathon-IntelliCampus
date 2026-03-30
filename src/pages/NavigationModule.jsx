import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Navigation as NavIcon, ArrowLeft, Clock, Info, Layers } from 'lucide-react';

const destinations = [
  { id: 1, name: 'CSE Department', building: 'Block C', floor: '2nd Floor', type: 'Academic' },
  { id: 2, name: 'Main Library', building: 'Central Block', floor: 'Ground Floor', type: 'Facility' },
  { id: 3, name: 'Exam Cell', building: 'Admin Block', floor: '1st Floor', type: 'Admin' },
  { id: 4, name: 'Cafeteria', building: 'Student Center', floor: 'Ground Floor', type: 'Dining' },
];

const NavigationModule = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const filtered = destinations.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background Map Simulation */}
      <div className="absolute inset-0 z-0 bg-[#0f111a] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #4facfe 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Mock Map Lines */}
        <svg className="w-full h-full opacity-10">
          <path d="M100 200 L400 500 L800 300" stroke="#00f2fe" strokeWidth="2" fill="none" />
          <path d="M0 400 L500 400 L900 600" stroke="#00ff88" strokeWidth="2" fill="none" />
        </svg>

        {/* Mock Buildings */}
        <div className="absolute top-1/4 left-1/4 w-32 h-40 bg-glass border border-border rounded-lg flex items-center justify-center text-[10px] text-muted">Block A</div>
        <div className="absolute top-1/2 left-1/2 w-48 h-32 bg-glass border border-border rounded-lg flex items-center justify-center text-[10px] text-muted">Admin Block</div>
        <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center text-[10px] text-primary">CSE Dept</div>
      </div>

      {/* Header Overlay */}
      <header className="z-10 p-4 flex items-center gap-4 bg-dark/60 backdrop-blur-md border-b border-border">
        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full hover:bg-glass">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-grow relative">
          <input 
            type="text" 
            className="input-field pl-12" 
            placeholder="Search destination..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        </div>
      </header>

      {/* Main UI */}
      <main className="z-10 flex-grow p-4 overflow-hidden flex flex-col">
        <AnimatePresence>
          {query && !selected && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass-card mt-2 divide-y divide-border overflow-hidden"
            >
              {filtered.map(dest => (
                <button 
                  key={dest.id}
                  onClick={() => setSelected(dest)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-glass transition-colors text-left"
                >
                  <MapPin size={18} className="text-secondary" />
                  <div>
                    <p className="font-medium">{dest.name}</p>
                    <p className="text-xs text-muted">{dest.building} • {dest.floor}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-grow"></div>

        {/* Navigation Card */}
        {selected && (
          <motion.div 
            initial={{ y: 200 }} 
            animate={{ y: 0 }}
            className="glass-card p-6 max-w-md mx-auto w-full mb-4 border-primary/30"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-display">{selected.name}</h3>
                <p className="text-sm text-muted">{selected.building}, {selected.floor}</p>
              </div>
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <NavIcon size={24} />
              </div>
            </div>

            <div className="flex gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-muted" />
                <span>4 mins (320m)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Layers size={16} className="text-muted" />
                <span>Walkable Route</span>
              </div>
            </div>

            {!isNavigating ? (
              <button 
                onClick={() => setIsNavigating(true)}
                className="button-primary w-full justify-center"
              >
                Start Navigation
              </button>
            ) : (
              <div className="space-y-4">
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold">↑</div>
                  <div>
                    <p className="text-sm font-medium">Head North towards Admin Block</p>
                    <p className="text-xs text-muted">50 meters</p>
                  </div>
                </div>
                <button 
                  onClick={() => {setIsNavigating(false); setSelected(null); setQuery('');}}
                  className="button-outline w-full justify-center text-red-400 hover:text-red-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Map Tools */}
      <div className="absolute top-24 right-4 z-10 flex flex-col gap-2">
        <button className="p-3 rounded-xl glass-card text-muted hover:text-primary"><Layers size={20} /></button>
        <button className="p-3 rounded-xl glass-card text-muted hover:text-primary"><Info size={20} /></button>
      </div>
    </div>
  );
};

export default NavigationModule;
