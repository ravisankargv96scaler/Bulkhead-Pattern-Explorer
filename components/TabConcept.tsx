import React, { useState } from 'react';
import { Waves, AlertOctagon, RotateCcw } from 'lucide-react';

const TabConcept: React.FC = () => {
  const [isBreached, setIsBreached] = useState(false);

  const handleBreach = () => setIsBreached(true);
  const handleReset = () => setIsBreached(false);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Waves size={120} />
        </div>
        <h2 className="text-2xl font-bold text-amber-500 mb-2 flex items-center gap-2">
          <Waves className="text-cyan-400" /> The Ship Analogy
        </h2>
        <p className="text-slate-300 max-w-2xl leading-relaxed">
          The term "Bulkhead" comes from maritime engineering. Ships are divided into watertight compartments. 
          If the hull is breached, water is contained within a single section, preventing the entire ship from sinking.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-inner relative">
        {/* Ship Hull Visualization */}
        <div className="relative w-full max-w-3xl h-64 border-4 border-slate-600 rounded-b-full bg-slate-800 flex overflow-hidden">
          {/* Compartment 1 */}
          <div className="flex-1 border-r-4 border-slate-600 relative flex items-center justify-center group">
            <span className="text-slate-600 font-bold text-4xl select-none group-hover:text-slate-500 transition-colors">1</span>
          </div>

          {/* Compartment 2 (The Target) */}
          <div className="flex-1 border-r-4 border-slate-600 relative flex flex-col-reverse relative">
             {/* Water */}
            <div 
              className="w-full bg-cyan-500/80 transition-all duration-[2000ms] ease-out absolute bottom-0"
              style={{ height: isBreached ? '90%' : '0%' }}
            >
                {/* Water Surface Animation */}
                <div className="absolute top-0 w-full h-2 bg-cyan-300/50 animate-pulse" />
            </div>
            <div className="flex-1 flex items-center justify-center z-10">
                <span className={`font-bold text-4xl select-none transition-colors ${isBreached ? 'text-cyan-900' : 'text-slate-600'}`}>2</span>
            </div>
            
            {/* Iceberg Impact Visual */}
            {isBreached && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-cyan-100 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>
            )}
          </div>

          {/* Compartment 3 */}
          <div className="flex-1 border-r-4 border-slate-600 relative flex items-center justify-center group">
            <span className="text-slate-600 font-bold text-4xl select-none group-hover:text-slate-500 transition-colors">3</span>
          </div>

          {/* Compartment 4 */}
          <div className="flex-1 relative flex items-center justify-center group">
            <span className="text-slate-600 font-bold text-4xl select-none group-hover:text-slate-500 transition-colors">4</span>
          </div>
        </div>
        
        {/* Water Level Line (External) */}
        <div className="absolute bottom-8 left-0 right-0 h-48 -z-10 opacity-20">
            <div className="w-full h-full bg-gradient-to-t from-cyan-900 to-transparent" />
        </div>

        {/* Status Indicator */}
        <div className="mt-8 flex items-center gap-4">
            <div className={`px-4 py-2 rounded font-mono font-bold border ${isBreached ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'bg-emerald-500/10 border-emerald-500 text-emerald-500'}`}>
                STATUS: {isBreached ? 'HULL BREACH - CONTAINED' : 'HULL INTEGRITY 100%'}
            </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 flex justify-center gap-4">
        <button
          onClick={handleBreach}
          disabled={isBreached}
          className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded shadow transition-colors"
        >
          <AlertOctagon size={20} />
          Strike Iceberg (Comp 2)
        </button>
        <button
          onClick={handleReset}
          disabled={!isBreached}
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-200 font-bold rounded shadow transition-colors"
        >
          <RotateCcw size={20} />
          Repair & Pump
        </button>
      </div>
    </div>
  );
};

export default TabConcept;