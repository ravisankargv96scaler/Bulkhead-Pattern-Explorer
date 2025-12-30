import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RefreshCcw, Award } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the primary goal of the Bulkhead Pattern?",
    options: [
      { id: 'a', text: "To make services process requests faster." },
      { id: 'b', text: "To isolate failures and prevent cascading errors." },
      { id: 'c', text: "To load balance traffic evenly across servers." },
    ],
    correct: 'b',
    explanation: "Correct! Just like a ship, the goal is to contain the damage (water) to one section so the whole system doesn't sink."
  },
  {
    id: 2,
    question: "In a Bulkhead architecture, if one thread pool becomes exhausted...",
    options: [
      { id: 'a', text: "The entire application will crash immediately." },
      { id: 'b', text: "Requests to other services are also rejected." },
      { id: 'c', text: "Other thread pools remain unaffected and operational." },
    ],
    correct: 'c',
    explanation: "Correct! The exhausted pool only rejects requests for its specific service. Other pools have their own independent resources."
  },
  {
    id: 3,
    question: "Does the Bulkhead pattern fix the underlying performance issue of a slow service?",
    options: [
      { id: 'a', text: "No, it only mitigates the impact on the rest of the system." },
      { id: 'b', text: "Yes, it automatically speeds up slow queries." },
      { id: 'c', text: "Yes, by adding more threads dynamically." },
    ],
    correct: 'a',
    explanation: "Correct! The pattern is about survival, not fixing the root cause. You still need to debug why the service is slow!"
  }
];

const TabQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: number, optId: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    });
    return score;
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col h-full gap-6 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-100 mb-2 flex items-center justify-center gap-2">
           <HelpCircle className="text-amber-500" /> Knowledge Check
        </h2>
        <p className="text-slate-400">Test your understanding of System Resilience.</p>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {QUESTIONS.map((q, index) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correct;
          
          return (
            <div key={q.id} className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-slate-200 mb-4 flex gap-3">
                <span className="bg-slate-800 text-slate-400 px-2 rounded h-min font-mono text-sm py-1">Q{index + 1}</span>
                {q.question}
              </h3>
              
              <div className="space-y-3">
                {q.options.map((opt) => {
                  let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between ";
                  
                  if (submitted) {
                    if (opt.id === q.correct) {
                      btnClass += "bg-emerald-900/30 border-emerald-500 text-emerald-200";
                    } else if (opt.id === userAnswer && opt.id !== q.correct) {
                      btnClass += "bg-rose-900/30 border-rose-500 text-rose-200 opacity-75";
                    } else {
                      btnClass += "bg-slate-800/50 border-slate-700 text-slate-500 opacity-50";
                    }
                  } else {
                    if (userAnswer === opt.id) {
                       btnClass += "bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]";
                    } else {
                       btnClass += "bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-500 text-slate-300";
                    }
                  }

                  return (
                    <button 
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={btnClass}
                      disabled={submitted}
                    >
                      <span>{opt.text}</span>
                      {submitted && opt.id === q.correct && <CheckCircle className="text-emerald-500" size={20} />}
                      {submitted && userAnswer === opt.id && opt.id !== q.correct && <XCircle className="text-rose-500" size={20} />}
                    </button>
                  );
                })}
              </div>

              {submitted && isCorrect && (
                  <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-900/50 rounded text-emerald-300 text-sm animate-in fade-in slide-in-from-top-2">
                      <span className="font-bold">Expert Note:</span> {q.explanation}
                  </div>
              )}
               {submitted && !isCorrect && userAnswer && (
                  <div className="mt-4 p-3 bg-rose-900/20 border border-rose-900/50 rounded text-rose-300 text-sm animate-in fade-in slide-in-from-top-2">
                       <span className="font-bold">Explanation:</span> {q.explanation}
                  </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 bg-slate-950 p-4 border-t border-slate-800 flex justify-center items-center gap-6">
        {!submitted ? (
            <button 
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(answers).length < QUESTIONS.length}
                className="bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-bold px-8 py-3 rounded-lg shadow-lg transition-all transform active:scale-95"
            >
                Submit Answers
            </button>
        ) : (
            <div className="flex items-center gap-6 animate-in zoom-in">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400 uppercase tracking-widest">Final Score</span>
                    <span className={`text-3xl font-black ${calculateScore() === 3 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {calculateScore()} / 3
                    </span>
                </div>
                {calculateScore() === 3 && <Award size={40} className="text-yellow-400 animate-bounce" />}
                <button 
                    onClick={reset}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-bold"
                >
                    <RefreshCcw size={18} /> Retry
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default TabQuiz;