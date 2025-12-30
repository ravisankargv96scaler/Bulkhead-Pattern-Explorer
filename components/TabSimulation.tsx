import React, { useState, useEffect, useRef } from 'react';
import { Settings, Activity, Server, Zap, AlertCircle } from 'lucide-react';

const SERVICE_CONFIG = [
  { id: 0, name: 'Payments', color: 'emerald' },
  { id: 1, name: 'Inventory', color: 'amber' },
  { id: 2, name: 'Reviews', color: 'blue' },
];

const TabSimulation: React.FC = () => {
  // Latency controls: 1 (fast) to 10 (crawling)
  const [latencies, setLatencies] = useState([1, 1, 1]);
  // Queue usage: 0 to 100%
  const [queues, setQueues] = useState([10, 20, 15]);
  
  // Use refs for values that change too fast to avoid re-render loop issues in intervals if dependent
  const latenciesRef = useRef(latencies);

  useEffect(() => {
    latenciesRef.current = latencies;
  }, [latencies]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueues(currentQueues => {
        return currentQueues.map((q, idx) => {
          // Simulation Logic:
          // 1. Inflow: Random traffic spikes
          const inflow = Math.random() * 8; 
          
          // 2. Outflow: Inverse of latency. Higher latency = slower drain.
          // Base drain rate is 10. Divided by latency factor.
          // Latency 1 (Low) -> Drain 10 per tick
          // Latency 10 (High) -> Drain 1 per tick
          const latencyFactor = latenciesRef.current[idx];
          const outflow = 12 / latencyFactor;
          
          // Calculate new queue size, clamped 0-100
          let newQ = q + inflow - outflow;
          return Math.min(100, Math.max(0, newQ));
        });
      });
    }, 100); // 10 ticks per second

    return () => clearInterval(interval);
  }, []);

  const handleLatencyChange = (index: number, val: number) => {
    const newLatencies = [...latencies];
    newLatencies[index] = val;
    setLatencies(newLatencies);
  };

  return (
    <div className="flex flex-col h-full gap-4 md:gap-6">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 md:p-6 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 flex items-center gap-2">
          <Activity className="text-amber-500" /> Live Traffic Dashboard
        </h2>
        <p className="text-sm md:text-base text-slate-400">
          Adjust latency sliders to simulate failure. Watch how high latency fills the specific connection pool 
          without affecting neighbor services.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        {SERVICE_CONFIG.map((service, idx) => {
          const usage = queues[idx];
          const isCritical = usage > 90;
          const isWarning = usage > 60;
          
          let statusColor = 'bg-emerald-500';
          let textColor = 'text-emerald-500';
          let borderColor = 'border-emerald-500';
          
          if (isCritical) {
            statusColor = 'bg-rose-600';
            textColor = 'text-rose-500';
            borderColor = 'border-rose-500';
          } else if (isWarning) {
            statusColor = 'bg-amber-500';
            textColor = 'text-amber-500';
            borderColor = 'border-amber-500';
          } else if (service.color === 'blue') {
             statusColor = 'bg-blue-500';
             textColor = 'text-blue-500';
             borderColor = 'border-blue-500';
          }

          return (
            <div key={service.id} className={`bg-slate-900 border-2 rounded-xl p-4 flex flex-col gap-4 shadow-lg transition-colors duration-300 ${isCritical ? 'border-rose-900' : 'border-slate-800'}`}>
              
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                   <div className={`p-2 rounded-lg bg-slate-800 ${textColor}`}>
                     <Server size={20} />
                   </div>
                   <h3 className="font-bold text-lg">{service.name}</h3>
                </div>
                {isCritical && <AlertCircle className="text-rose-500 animate-pulse" />}
              </div>

              {/* Visualization Gauge */}
              <div className="flex-1 flex flex-col justify-end gap-2 bg-slate-950 rounded-lg p-4 border border-slate-800 relative overflow-hidden">
                {/* Background grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10 pointer-events-none">
                   <div className="w-full h-px bg-slate-100" />
                   <div className="w-full h-px bg-slate-100" />
                   <div className="w-full h-px bg-slate-100" />
                   <div className="w-full h-px bg-slate-100" />
                </div>

                <div className="flex justify-between text-xs font-mono text-slate-500 mb-1 z-10">
                    <span>POOL USAGE</span>
                    <span>{Math.round(usage)}%</span>
                </div>
                
                {/* Progress Bar Container */}
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative z-10">
                   <div 
                     className={`h-full transition-all duration-300 ${statusColor} ${isCritical ? 'hazard-stripe' : ''}`}
                     style={{ width: `${usage}%` }}
                   />
                </div>
                
                {/* Status Text */}
                <div className={`text-center font-mono text-xs font-bold mt-2 ${textColor}`}>
                    {isCritical ? 'CRITICAL - REJECTING' : isWarning ? 'WARNING - HIGH LOAD' : 'HEALTHY'}
                </div>
              </div>

              {/* Controls */}
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400 flex items-center gap-1"><Zap size={14}/> Latency Simulation</span>
                    <span className="font-mono text-slate-300">{latencies[idx] * 100}ms</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="0.1"
                  value={latencies[idx]}
                  onChange={(e) => handleLatencyChange(idx, parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono uppercase">
                    <span>Fast</span>
                    <span>Slow</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabSimulation;