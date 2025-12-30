import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

interface Request {
  id: number;
  type: 'fast' | 'slow';
}

const TabSolution: React.FC = () => {
  const [poolA, setPoolA] = useState<Request[]>([]);
  const [poolB, setPoolB] = useState<Request[]>([]);
  
  const POOL_CAPACITY = 5;

  const floodPoolB = () => {
    // Fill Pool B with slow requests
    const newRequests: Request[] = Array.from({ length: POOL_CAPACITY }).map((_, i) => ({
      id: Date.now() + i,
      type: 'slow',
    }));
    setPoolB(newRequests);
  };

  const sendFastRequestA = () => {
    if (poolA.length < POOL_CAPACITY) {
      const req: Request = { id: Date.now(), type: 'fast' };
      setPoolA(prev => [...prev, req]);
      // Process fast
      setTimeout(() => {
        setPoolA(prev => prev.filter(p => p.id !== req.id));
      }, 500);
    }
  };

  const reset = () => {
    setPoolA([]);
    setPoolB([]);
  };

  return (
    <div className="flex flex-col h-full gap-6">
       <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 relative">
        <h2 className="text-2xl font-bold text-emerald-500 mb-2 flex items-center gap-2">
          <ShieldCheck /> The Solution: Isolated Pools
        </h2>
        <p className="text-slate-300">
          By partitioning resources into separate pools (Bulkheads), we ensure that a failure in one service (Service B) 
          only fills its own pool. Service A has its own dedicated pool and continues to function normally.
        </p>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-inner flex flex-col md:flex-row gap-8 items-center justify-center">
        
        {/* Controls */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
           <button onClick={floodPoolB} className="bg-rose-600 hover:bg-rose-500 text-white px-6 py-4 rounded shadow font-bold flex flex-col items-center gap-1 transition-all active:scale-95">
             <span>Flood Service B</span>
             <span className="text-xs font-normal opacity-80">(Fills Pool B)</span>
           </button>
           <button onClick={sendFastRequestA} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded shadow font-bold flex flex-col items-center gap-1 transition-all active:scale-95">
             <span>Call Service A</span>
             <span className="text-xs font-normal opacity-80">(Uses Pool A)</span>
           </button>
        </div>

        {/* Visualizer Area */}
        <div className="flex-1 flex gap-4 md:gap-8 justify-center">
            
            {/* Pool A */}
            <div className="w-40 bg-slate-800 border border-emerald-500/30 rounded-lg flex flex-col overflow-hidden shadow-lg transition-all">
                <div className="bg-emerald-900/30 border-b border-emerald-500/30 p-2 text-center text-xs font-bold text-emerald-400">
                    POOL A (Capacity: 5)
                </div>
                <div className="flex-1 p-2 flex flex-col gap-1 h-64 justify-end">
                     {Array.from({ length: POOL_CAPACITY }).map((_, i) => {
                         const req = poolA[i];
                         return (
                            <div key={i} className={`h-10 w-full rounded border flex items-center justify-center transition-all duration-300 ${req ? 'bg-emerald-500 text-emerald-900 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-700/50 border-slate-600'}`}>
                                {req && <CheckCircle2 size={16} />}
                            </div>
                         );
                     })}
                </div>
            </div>

            {/* Separator */}
            <div className="w-2 bg-slate-700 rounded-full my-4 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-600 text-slate-500 text-[10px] py-1 px-2 rounded -rotate-90 whitespace-nowrap">
                    BULKHEAD WALL
                </div>
            </div>

            {/* Pool B */}
            <div className="w-40 bg-slate-800 border border-rose-500/30 rounded-lg flex flex-col overflow-hidden shadow-lg transition-all">
                <div className="bg-rose-900/30 border-b border-rose-500/30 p-2 text-center text-xs font-bold text-rose-400">
                    POOL B (Capacity: 5)
                </div>
                 <div className="flex-1 p-2 flex flex-col gap-1 h-64 justify-end">
                     {Array.from({ length: POOL_CAPACITY }).map((_, i) => {
                         const req = poolB[i];
                         return (
                            <div key={i} className={`h-10 w-full rounded border flex items-center justify-center transition-all duration-300 ${req ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-slate-700/50 border-slate-600'}`}>
                                {req && <span className="text-xs font-bold animate-pulse">BUSY</span>}
                            </div>
                         );
                     })}
                </div>
            </div>

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

export default TabSolution;