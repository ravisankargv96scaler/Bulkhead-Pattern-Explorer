import React, { useState } from 'react';
import { Database, Shield, Server, ChevronDown, Check } from 'lucide-react';

const TabRealWorld: React.FC = () => {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      title: 'Kubernetes Resource Quotas',
      icon: <Server className="text-blue-400" size={32} />,
      summary: 'Prevents one "noisy neighbor" container from starving others on the same node.',
      detail: 'In Kubernetes, you can set ResourceQuotas and LimitRanges per namespace. This acts as a bulkhead. If one deployment has a memory leak or CPU spike, the K8s scheduler throttles it based on its limits, ensuring other pods on the same node keep running smoothly.',
      tech: 'Infrastructure Layer'
    },
    {
      id: 2,
      title: 'Database Connection Pools',
      icon: <Database className="text-emerald-400" size={32} />,
      summary: 'Separate pools for read vs. write operations, or critical vs. background jobs.',
      detail: 'Advanced applications often maintain distinct connection pools for different types of operations. For example, a "Report Generation" feature might have a pool max of 2 connections, while the "User Login" feature has 50. If reporting queries hang, they only exhaust their tiny pool, leaving login unaffected.',
      tech: 'Persistence Layer'
    },
    {
      id: 3,
      title: 'Hystrix / Resilience4j',
      icon: <Shield className="text-amber-400" size={32} />,
      summary: 'Application-level libraries that implement thread pool isolation for external calls.',
      detail: 'These libraries are the classic implementation of Bulkheads in Java/Microservices. They wrap external API calls in commands. Each command type gets its own thread pool. If the "ProductRecommendations" service hangs, its thread pool fills up and rejects requests immediately (Fail Fast), protecting the calling service threads.',
      tech: 'Application Layer'
    }
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Real World Implementations</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The Bulkhead pattern is applied across the entire stack, from infrastructure to application logic.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto w-full">
        {cards.map((card) => {
          const isOpen = openCard === card.id;
          return (
            <div 
              key={card.id}
              onClick={() => setOpenCard(isOpen ? null : card.id)}
              className={`bg-slate-900 border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group hover:border-slate-500 ${isOpen ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50' : 'border-slate-700 shadow-md'}`}
            >
              <div className="p-6 flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-slate-800 transition-colors group-hover:bg-slate-700`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                     <h3 className={`text-lg font-bold ${isOpen ? 'text-amber-500' : 'text-slate-200'}`}>{card.title}</h3>
                     <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-500 border border-slate-700">{card.tech}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.summary}</p>
                </div>
                <div className={`transform transition-transform duration-300 text-slate-500 ${isOpen ? 'rotate-180' : ''}`}>
                   <ChevronDown />
                </div>
              </div>
              
              {/* Expandable Content */}
              <div className={`bg-slate-800/50 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-slate-300 text-sm border-t border-slate-700/50 mt-2 pt-4">
                   <div className="flex gap-2">
                     <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                     <p>{card.detail}</p>
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabRealWorld;