
import React from 'react';
import { Topic } from '../types';

interface LessonCardProps {
  topic: Topic;
  onClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ topic, onClick }) => {
  const isBio = topic.subject === 'Biology';
  
  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 cursor-pointer transition-all group flex flex-col h-full"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
        isBio ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'
      }`}>
        <i className={`fas ${isBio ? 'fa-leaf' : 'fa-flask'} text-xl`}></i>
      </div>
      
      <div className="mb-2">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
          isBio ? 'bg-emerald-50 text-emerald-700' : 'bg-sky-50 text-sky-700'
        }`}>
          {topic.subject} • Class {topic.grade}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
        {topic.title}
      </h3>
      
      <p className="text-slate-500 text-sm line-clamp-2 mb-4">
        {topic.description}
      </p>
      
      <div className="mt-auto flex items-center text-emerald-600 font-bold text-sm">
        Start Lesson
        <i className="fas fa-arrow-right ml-2 text-xs transition-transform group-hover:translate-x-1"></i>
      </div>
    </div>
  );
};

export default LessonCard;
