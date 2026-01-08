
import React, { useState } from 'react';
import { Topic } from '../types';
import AITutor from './AITutor';

interface LessonViewProps {
  topic: Topic;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ topic, onBack }) => {
  const isBio = topic.subject === 'Biology';
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (qIdx: number, oIdx: number) => {
    if (showResults) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      {/* Lesson Content */}
      <div className="lg:w-2/3 space-y-8">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-emerald-600 font-bold transition-all hover:-translate-x-1"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Exit to Lab
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          {/* Header Image/Banner */}
          <div className={`h-48 flex items-center justify-center ${isBio ? 'bg-emerald-600' : 'bg-sky-600'}`}>
             <i className={`fas ${isBio ? 'fa-microscope' : 'fa-atom'} text-8xl text-white/20`}></i>
          </div>

          <div className="p-10 -mt-12 bg-white rounded-t-[2.5rem] relative">
            <header className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  isBio ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'
                }`}>
                  Module {topic.id}
                </span>
                <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  Class {topic.grade}
                </span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">{topic.title}</h1>
              <p className="text-xl text-slate-500 font-medium">
                {topic.description}
              </p>
            </header>

            <div className="prose prose-lg prose-slate max-w-none">
              <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 leading-relaxed text-slate-700 text-lg mb-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <span className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mr-4 text-sm">01</span>
                  Lecture Material
                </h3>
                <div className="whitespace-pre-wrap">
                  {topic.content}
                </div>
              </div>

              {topic.fact && (
                <div className="mb-10 bg-amber-50 p-8 rounded-3xl border-2 border-amber-100 relative overflow-hidden group">
                  <i className="fas fa-lightbulb absolute -right-4 -bottom-4 text-8xl text-amber-200/50 group-hover:scale-110 transition-transform"></i>
                  <h4 className="text-amber-800 font-black uppercase text-xs tracking-widest mb-3 flex items-center">
                    <i className="fas fa-star mr-2"></i> Did You Know?
                  </h4>
                  <p className="text-amber-900 text-lg font-medium italic relative z-10">
                    "{topic.fact}"
                  </p>
                </div>
              )}

              {/* Quiz Section */}
              {topic.quiz && topic.quiz.length > 0 && (
                <div className="mt-16 bg-white p-10 rounded-3xl border-2 border-slate-100 shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                    <span className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center mr-4 text-sm">02</span>
                    Knowledge Check
                  </h3>
                  
                  <div className="space-y-10">
                    {topic.quiz.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-6">
                        <p className="text-lg font-bold text-slate-800">{qIdx + 1}. {q.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.options.map((option, oIdx) => {
                            const isSelected = quizAnswers[qIdx] === oIdx;
                            const isCorrect = q.correctIndex === oIdx;
                            let btnClass = "p-4 rounded-2xl border-2 text-left transition-all font-semibold ";
                            
                            if (showResults) {
                              if (isCorrect) btnClass += "bg-emerald-50 border-emerald-500 text-emerald-700";
                              else if (isSelected && !isCorrect) btnClass += "bg-red-50 border-red-500 text-red-700";
                              else btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                            } else {
                              btnClass += isSelected 
                                ? "bg-emerald-600 border-emerald-600 text-white shadow-lg" 
                                : "bg-white border-slate-100 text-slate-600 hover:border-emerald-300";
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleOptionSelect(qIdx, oIdx)}
                                className={btnClass}
                                disabled={showResults}
                              >
                                {option}
                                {showResults && isCorrect && <i className="fas fa-check-circle float-right mt-1"></i>}
                                {showResults && isSelected && !isCorrect && <i className="fas fa-times-circle float-right mt-1"></i>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!showResults ? (
                    <button 
                      onClick={() => setShowResults(true)}
                      className="mt-12 w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl active:scale-[0.98]"
                    >
                      SUBMIT ANSWERS
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setShowResults(false);
                        setQuizAnswers({});
                      }}
                      className="mt-12 w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                    >
                      RETAKE QUIZ
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Tutor Sidebar */}
      <div className="lg:w-1/3">
        <div className="sticky top-24">
          <AITutor topicTitle={topic.title} subject={topic.subject} grade={topic.grade} />
          
          <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
             <i className="fas fa-rocket absolute -right-6 -bottom-6 text-9xl text-white/10 -rotate-12"></i>
             <h4 className="font-black text-xl mb-3 relative z-10">Advanced Insights</h4>
             <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">
               Click any part of the text or ask the AI to expand on complex formulas. Use voice commands (if enabled) for a hands-free experience.
             </p>
             <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl text-xs font-bold transition-all relative z-10">
                COMING SOON: 3D MODELS
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
