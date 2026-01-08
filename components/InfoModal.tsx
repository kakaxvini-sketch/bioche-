
import React, { useState } from 'react';

interface InfoModalProps {
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'implementation' | 'team'>('overview');
  const [selectedFile, setSelectedFile] = useState<string>('index.html');
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const correctPassword = 'ADMIN';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  const projectFiles: Record<string, string> = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BioChe Academy - Learning Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-slate-50 text-slate-900">
    <div id="root"></div>
</body>
</html>`,
    'style.css': `/* BIOCHE ACADEMY GLOBAL STYLES */
:root {
  --primary: #10b981;
  --secondary: #0ea5e9;
}
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}
.animate-scaleIn {
  animation: scaleIn 0.3s ease-out forwards;
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}`,
    'script.js': `/* BIOCHE ACADEMY - CORE JAVASCRIPT LOGIC */
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const BioCheApp = () => {
  const [user, setUser] = useState(null);
  
  const connectToAI = async (prompt) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    return response.text;
  };

  return <div className="app">Engine Active</div>;
};`
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center animate-scaleIn">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <i className="fas fa-lock text-3xl"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Technical Vault</h2>
          <p className="text-slate-500 text-sm mb-8 font-medium">Please enter the administrator password to access the source terminal.</p>
          
          <form onSubmit={handleUnlock} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-center tracking-[0.3em] ${
                error ? 'border-red-500 bg-red-50 animate-shake' : 'border-transparent focus:border-emerald-500'
              }`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">Access Denied</p>}
            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl active:scale-95"
            >
              UNLOCK SYSTEM
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-4 text-slate-400 font-bold text-xs hover:text-slate-600"
            >
              CANCEL
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scaleIn flex flex-col md:flex-row h-[90vh]">
        
        {/* Sidebar Navigation */}
        <div className="w-full md:w-72 bg-slate-50 p-8 border-r border-slate-100 flex flex-col shrink-0">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <i className="fas fa-terminal"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-none">BioChe</h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unlocked Engine</span>
            </div>
          </div>

          <nav className="flex-grow space-y-3">
            {[
              { id: 'overview', icon: 'fa-book-open', label: 'App Overview' },
              { id: 'implementation', icon: 'fa-code', label: 'Full Source Code' },
              { id: 'team', icon: 'fa-user-astronaut', label: 'The Engineers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === tab.id 
                  ? 'bg-white text-emerald-600 shadow-xl shadow-emerald-100 border border-slate-100 translate-x-2' 
                  : 'text-slate-500 hover:text-slate-900 hover:translate-x-1'
                }`}
              >
                <i className={`fas ${tab.icon} w-5`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-slate-200">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs hover:bg-black transition-all shadow-lg active:scale-95"
            >
              CLOSE TERMINAL
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-grow overflow-y-auto p-12 bg-white flex flex-col">
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-fadeIn">
              <header>
                <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-4">Documentation</div>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">System Specification</h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                  BioChe Academy is an AI-native educational suite designed for Classes 6-10. It utilizes real-time streaming LLM processing to provide a persistent mentoring experience.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <h4 className="font-black text-slate-900 text-lg mb-4 flex items-center">
                    <i className="fas fa-layer-group mr-3 text-emerald-600"></i>
                    Architecture Overview
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-3 font-medium">
                    <li className="flex items-center"><i className="fas fa-check text-emerald-500 mr-2"></i> Semantic HTML5 Structure</li>
                    <li className="flex items-center"><i className="fas fa-check text-emerald-500 mr-2"></i> Utility-First CSS with Tailwind</li>
                    <li className="flex items-center"><i className="fas fa-check text-emerald-500 mr-2"></i> Reactive JavaScript Engine</li>
                  </ul>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <h4 className="font-black text-slate-900 text-lg mb-4 flex items-center">
                    <i className="fas fa-brain mr-3 text-sky-600"></i>
                    Neural Integration
                  </h4>
                  <ul className="text-sm text-slate-600 space-y-3 font-medium">
                    <li className="flex items-center"><i className="fas fa-check text-sky-500 mr-2"></i> Gemini 3 Flash Neural Engine</li>
                    <li className="flex items-center"><i className="fas fa-check text-sky-500 mr-2"></i> Real-time Science Pedagogy</li>
                    <li className="flex items-center"><i className="fas fa-check text-sky-500 mr-2"></i> Adaptive Knowledge Checks</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'implementation' && (
            <div className="flex flex-col h-full animate-fadeIn">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Core Source Code</h3>
                  <p className="text-slate-500 text-sm font-medium">Production manifest for BioChe Academy</p>
                </div>
                <div className="flex bg-slate-100 p-1.5 rounded-2xl space-x-1">
                  {Object.keys(projectFiles).map(file => (
                    <button
                      key={file}
                      onClick={() => setSelectedFile(file)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                        selectedFile === file 
                        ? 'bg-white text-emerald-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {file.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-grow bg-slate-900 rounded-[2rem] p-8 overflow-hidden flex flex-col border border-slate-800 shadow-2xl">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-4 text-slate-500 font-mono text-xs italic">src/{selectedFile}</span>
                </div>
                <pre className="flex-grow overflow-auto font-mono text-xs md:text-sm leading-relaxed text-slate-300 custom-scrollbar">
                  <code>{projectFiles[selectedFile]}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-12 animate-fadeIn">
              <header>
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The BioChe Engineers</h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                  Engineered and conceptualized by our founding team specializing in educational technology.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: 'SR KADHIRNELAVAN', role: 'Chief Systems Architect', initial: 'SK', color: 'bg-emerald-600' },
                  { name: 'JOSHUWA', role: 'Lead AI Infrastructure', initial: 'JW', color: 'bg-sky-600' },
                  { name: 'KANISHKA', role: 'Head of Product Design', initial: 'KA', color: 'bg-indigo-600' },
                  { name: 'KAVINKUMAR', role: 'Data Science Director', initial: 'KK', color: 'bg-rose-600' }
                ].map((member) => (
                  <div key={member.name} className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-emerald-500 transition-all hover:shadow-2xl hover:-translate-y-1">
                    <div className="flex items-center space-x-6">
                      <div className={`w-20 h-20 rounded-3xl ${member.color} text-white flex items-center justify-center text-2xl font-black shadow-xl`}>
                        {member.initial}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-slate-900 mb-0">{member.name}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">OF TI SCHOOL</p>
                        <p className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em]">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <h4 className="text-lg font-black mb-4 relative z-10 flex items-center">
                   <i className="fas fa-quote-left mr-4 text-emerald-500"></i>
                   Our Engineering Philosophy
                </h4>
                <p className="text-slate-400 text-lg italic leading-relaxed relative z-10">
                  "We built BioChe to prove that AI can transform traditional education into an interactive, personalized journey for every student at TI SCHOOL and beyond."
                </p>
                <div className="mt-8 flex items-center space-x-4 relative z-10">
                  <div className="h-px flex-grow bg-slate-800"></div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest tracking-[0.2em]">BioChe Core Team • TI SCHOOL</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
