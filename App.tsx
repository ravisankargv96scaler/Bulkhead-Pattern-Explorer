import React, { useState } from 'react';
import { Anchor, AlertTriangle, ShieldCheck, Activity, Globe, HelpCircle } from 'lucide-react';
import { TabId } from './types';
import TabConcept from './components/TabConcept';
import TabProblem from './components/TabProblem';
import TabSolution from './components/TabSolution';
import TabSimulation from './components/TabSimulation';
import TabRealWorld from './components/TabRealWorld';
import TabQuiz from './components/TabQuiz';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.CONCEPT);

  const renderContent = () => {
    switch (activeTab) {
      case TabId.CONCEPT: return <TabConcept />;
      case TabId.PROBLEM: return <TabProblem />;
      case TabId.SOLUTION: return <TabSolution />;
      case TabId.SIMULATION: return <TabSimulation />;
      case TabId.REAL_WORLD: return <TabRealWorld />;
      case TabId.QUIZ: return <TabQuiz />;
      default: return <TabConcept />;
    }
  };

  const navItems = [
    { id: TabId.CONCEPT, label: 'Concept', icon: Anchor },
    { id: TabId.PROBLEM, label: 'The Problem', icon: AlertTriangle },
    { id: TabId.SOLUTION, label: 'The Solution', icon: ShieldCheck },
    { id: TabId.SIMULATION, label: 'Simulation', icon: Activity },
    { id: TabId.REAL_WORLD, label: 'Real World', icon: Globe },
    { id: TabId.QUIZ, label: 'Quiz', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500 selection:text-slate-900">
      {/* Header */}
      <header className="flex-none border-b border-slate-700 bg-slate-900 px-6 py-4 shadow-md z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded text-slate-900">
              <ShieldCheck size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider text-slate-100 uppercase">System Resilience</h1>
              <p className="text-xs text-slate-400 font-mono">PATTERN: BULKHEAD</p>
            </div>
          </div>
          <div className="hidden md:block text-xs font-mono text-slate-500">
            STATUS: SYSTEM OPERATIONAL
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar Nav (Desktop) / Top Nav (Mobile) + Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-7xl mx-auto w-full">
        
        {/* Navigation */}
        <nav className="flex-none bg-slate-900 md:w-64 border-b md:border-b-0 md:border-r border-slate-700 overflow-x-auto md:overflow-y-auto custom-scrollbar">
          <ul className="flex md:flex-col p-2 md:p-4 gap-2 min-w-max md:min-w-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden
                    ${activeTab === item.id 
                      ? 'bg-slate-800 text-amber-500 shadow-inner border border-slate-700' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-amber-500' : 'text-slate-500 group-hover:text-slate-300'} />
                  <span>{item.label}</span>
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;