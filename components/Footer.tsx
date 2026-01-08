
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-3">
              <div className="bg-emerald-600 text-white p-2 rounded-lg shadow-sm">
                <i className="fas fa-atom text-sm"></i>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">BioChe Academy</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Empowering the next generation of scientists through AI-driven learning.</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.3em] mb-4">Lead Engineers</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3">
              <span className="text-sm font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 hover:border-emerald-500 transition-colors">SR KADHIRNELAVAN</span>
              <span className="text-sm font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 hover:border-emerald-500 transition-colors">JOSHUWA</span>
              <span className="text-sm font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 hover:border-emerald-500 transition-colors">KANISHKA</span>
              <span className="text-sm font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 hover:border-emerald-500 transition-colors">KAVINKUMAR</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium tracking-wide">© {new Date().getFullYear()} BioChe Academy. Handcrafted for Science Students.</p>
          <div className="flex space-x-4 text-slate-300">
            <i className="fab fa-github hover:text-slate-600 transition-colors cursor-pointer"></i>
            <i className="fab fa-linkedin hover:text-slate-600 transition-colors cursor-pointer"></i>
            <i className="fab fa-twitter hover:text-slate-600 transition-colors cursor-pointer"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
