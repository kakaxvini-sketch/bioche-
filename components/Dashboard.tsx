
import React, { useState } from 'react';
import { User, Grade, Subject, Topic } from '../types';
import { TOPICS } from '../constants';
import LessonCard from './LessonCard';
import LessonView from './LessonView';

interface DashboardProps {
  user: User;
  selectedGrade: Grade;
  setSelectedGrade: (g: Grade) => void;
  selectedSubject: Subject | null;
  setSelectedSubject: (s: Subject | null) => void;
  currentTopic: Topic | null;
  setCurrentTopic: (t: Topic | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, selectedGrade, setSelectedGrade, 
  selectedSubject, setSelectedSubject,
  currentTopic, setCurrentTopic
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTopics = TOPICS.filter(t => {
    const matchesGrade = t.grade === selectedGrade;
    const matchesSubject = !selectedSubject || t.subject === selectedSubject;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSubject && matchesSearch;
  });

  if (currentTopic) {
    return <LessonView topic={currentTopic} onBack={() => setCurrentTopic(null)} />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">Research Hub</h1>
          <p className="text-slate-500">Master Grade {selectedGrade} {selectedSubject || 'Science'} curriculum.</p>
        </div>
        
        <div className="relative flex-grow max-w-md">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. Carbon, Digestion...)"
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 space-y-6 shrink-0">
          <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Grade / Class</h2>
            <div className="flex flex-col gap-2">
              {[6, 7, 8, 9, 10].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g as Grade)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-left transition-all ${
                    selectedGrade === g 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 translate-x-1' 
                    : 'text-slate-600 hover:bg-slate-50 hover:translate-x-1'
                  }`}
                >
                  Class {g}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Subject</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedSubject(null)}
                className={`w-full px-4 py-2.5 rounded-xl text-left font-bold transition-all ${!selectedSubject ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                All Modules
              </button>
              <button
                onClick={() => setSelectedSubject('Biology')}
                className={`w-full px-4 py-2.5 rounded-xl text-left font-bold transition-all ${selectedSubject === 'Biology' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <i className="fas fa-dna mr-2 text-[10px]"></i>
                Biology
              </button>
              <button
                onClick={() => setSelectedSubject('Chemistry')}
                className={`w-full px-4 py-2.5 rounded-xl text-left font-bold transition-all ${selectedSubject === 'Chemistry' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <i className="fas fa-flask mr-2 text-[10px]"></i>
                Chemistry
              </button>
            </div>
          </section>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow">
          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTopics.map(topic => (
                <LessonCard 
                  key={topic.id} 
                  topic={topic} 
                  onClick={() => setCurrentTopic(topic)} 
                />
              ))}
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-vial text-3xl text-slate-300"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No experiments found</h3>
              <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
