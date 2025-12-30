import React, { useState, useEffect } from 'react';
import { Server, Users, AlertTriangle, RefreshCw } from 'lucide-react';

interface Request {
  id: number;
  type: 'fast' | 'slow';
  state: 'queued' | 'processing' | 'rejected' | 'done';
}

const TabProblem: React.FC = () => {
  const [pool, setPool] = useState<Request[]>([]);
  const [rejected, setRejected] = useState<Request | null>(null);
  const POOL_CAPACITY = 10;

  const floodPool = () => {
    const newRequests: Request[] = Array.from({ length: POOL_CAPACITY }).map((_, i) => ({
      id: Date.now() + i,
      type: 'slow',
      state: 'processing', // Immediately stuck in processing
    }));
    setPool(newRequests);
    setRejected(null);
  };

  const sendFastRequest = () => {
    if (pool.length >= POOL_CAPACITY) {
      setRejected({ id: Date.now(), type: 'fast', state: 'rejected' });
      // Clear rejected msg after 2s
      setTimeout(() => setRejected(null), 2000);
    } else {
      // Fast request enters and leaves quickly
      const req: Request = { id: Date.now(), type: 'fast', state: 'processing' };
      setPool(prev => [...prev, req]);
      setTimeout(() => {
        setPool(prev => prev.filter(p => p.id !== req.id));
      }, 500); // 500ms processing for fast
    }
  };

  const reset = () => {
    setPool([]);
    setRejected(null);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 relative">
        <h2 className="text-2xl font-bold text-rose-500 mb-2 flex items-center gap-2">
          <AlertTriangle /> The Problem: Shared Resources
        </h2>
        <p className="text-slate-300">
          Without bulkheads, all dependencies typically share a common resource pool (e.g., Tomcat thread pool, DB connections). 
          If one service fails or becomes slow, it can hog all resources, starving the rest of the application.
        </p>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-inner flex flex-col md:flex-row gap-12 items-center justify-center relative overflow-hidden">
        
        {/* Clients */}
        <div className="flex flex-col gap-8 z-10">
           <div className="flex items-center gap-4">
              <button onClick={sendFastRequest} className="w-48 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded shadow flex items-center justify-between group transition-all">
                 <span className="font-bold">Fast Service A</span>
                 <Users size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           <div className="flex items-center gap-4">
              <button onClick={floodPool} className="w-48 bg-rose-600 hover:bg-rose-500 text-white p-3 rounded shadow flex items-center justify-between group transition-all">
                 <span className="font-bold">Slow Service B</span>
                 <Users size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>

        {/* Connection Lines (Visual only) */}
        <div className="hidden md:block absolute left-[15rem] top-1/2 -translate-y-1/2 w-24 h-px border-t-2 border-dashed border-slate-600"></div>

        {/* Shared Pool */}
        <div className="relative w-64 h-80 bg-slate-800 border-2 border-slate-600 rounded-lg flex flex-col shadow-2xl">
           <div className="bg-slate-700 p-2 text-center text-xs font-mono font-bold text-slate-300 border-b border-slate-600">
             SHARED THREAD POOL ({pool.length}/{POOL_CAPACITY})
           </div>
           
           <div className="flex-1 p-4 grid grid-cols-2 gap-2 content-start overflow-hidden">
              {pool.map((req) => (
                <div key={req.id} className={`h-8 rounded-md flex items-center justify-center animate-in fade-in zoom-in duration-300 ${req.type === 'slow' ? 'bg-rose-500/20 border border-rose-500 text-rose-500' : 'bg-emerald-500/20 border border-emerald-500 text-emerald-500'}`}>
                   <span className="text-xs font-bold">{req.type === 'slow' ? 'SLOW' : 'FAST'}</span>
                </div>
              ))}
              
              {/* Ghost slots */}
              {Array.from({length: Math.max(0, POOL_CAPACITY - pool.length)}).map((_, i) => (
                  <div key={`ghost-${i}`} className="h-8 rounded-md border border-slate-700 bg-slate-800/50"></div>
              ))}
           </div>

           {/* Rejection Animation Overlay */}
           {rejected && (
             <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-20 backdrop-blur-sm animate-in fade-in duration-150">
                <div className="bg-rose-500 text-white px-4 py-2 rounded font-bold shadow-lg animate-bounce">
                  ⛔ POOL EXHAUSTED
                </div>
             </div>
           )}
        </div>

      </div>

      <div className="flex justify-center">
         <button onClick={reset} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={16} /> Reset Simulation
         </button>
      </div>
    </div>
  );
};

export default TabProblem;