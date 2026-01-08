
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from '@google/genai';

// --- CORE TYPES ---
type Grade = 6 | 7 | 8 | 9 | 10;
type Subject = 'Biology' | 'Chemistry';

interface User {
  name: string;
  email: string;
  grade: Grade;
}

interface Topic {
  id: string;
  title: string;
  grade: Grade;
  subject: Subject;
  description: string;
  content: string;
  fact?: string;
  quiz?: { question: string; options: string[]; correctIndex: number }[];
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// --- CURRICULUM DATA ---
const TOPICS: Topic[] = [
  { id: 'bio-6-1', grade: 6, subject: 'Biology', title: 'Components of Food', description: 'Essential nutrients for health.', content: 'Our body needs carbohydrates, proteins, fats, vitamins, and minerals. Carbohydrates give energy, proteins help in growth, and vitamins protect us.', fact: 'Vitamin C is destroyed by heat.', quiz: [{ question: 'Which is energy-giving?', options: ['Protein', 'Carbs', 'Water'], correctIndex: 1 }] },
  { id: 'che-6-1', grade: 6, subject: 'Chemistry', title: 'Sorting Materials', description: 'Grouping by properties.', content: 'Materials are grouped by luster, hardness, and solubility. Metals are lustrous. Sugar is soluble in water.', fact: 'Gold is the most lustrous metal.', quiz: [{ question: 'Which is shiny?', options: ['Wood', 'Metal', 'Plastic'], correctIndex: 1 }] },
  { id: 'bio-10-1', grade: 10, subject: 'Biology', title: 'Heredity', description: 'Inheritance of traits.', content: 'Heredity is the transfer of traits from parents to offspring. Gregor Mendel studied pea plants to discover laws of inheritance.', fact: 'Humans share 98% DNA with chimps.', quiz: [{ question: 'Father of Genetics?', options: ['Darwin', 'Mendel', 'Lamarck'], correctIndex: 1 }] },
  { id: 'che-10-1', grade: 10, subject: 'Chemistry', title: 'Carbon Compounds', description: 'The chemistry of carbon.', content: 'Carbon forms covalent bonds due to tetravalency. Allotropes include Diamond (hardest) and Graphite (conductor).', fact: 'Graphite conducts electricity.', quiz: [{ question: 'Conductive allotrope?', options: ['Diamond', 'Graphite', 'Coke'], correctIndex: 1 }] }
];

// --- TECHNICAL VAULT COMPONENT ---
const InfoModal = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'implementation' | 'team'>('overview');
  const [selectedFile, setSelectedFile] = useState<string>('index.tsx');
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const correctPassword = 'ADMIN';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) { setIsUnlocked(true); setError(false); }
    else { setError(true); setPassword(''); }
  };

  const projectFiles: Record<string, string> = {
    'index.html': `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>BioChe Academy</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>`,
    'style.css': `:root { --primary: #10b981; }\nbody { font-family: 'Inter', sans-serif; }\n.animate-scaleIn { animation: scaleIn 0.3s ease-out; }`,
    'index.tsx': `/* BIOCHE ACADEMY - UNIFIED ENGINE */\n// This file contains all components, types, and logic\n// Engineered for TI SCHOOL by SR KADHIRNELAVAN & Team.`
  };

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-xl">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 text-center animate-scaleIn">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600"><i className="fas fa-lock text-3xl"></i></div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Technical Vault</h2>
          <p className="text-slate-500 text-sm mb-8">Enter the ADMIN password to access source code.</p>
          <form onSubmit={handleUnlock} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
              className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all text-center tracking-[0.3em] font-black ${error ? 'border-red-500 bg-red-50 animate-shake' : 'border-transparent focus:border-emerald-500'}`} autoFocus />
            <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl">UNLOCK</button>
            <button type="button" onClick={onClose} className="w-full py-4 text-slate-400 font-bold text-xs">EXIT</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scaleIn flex flex-col md:flex-row h-[90vh]">
        <div className="w-full md:w-72 bg-slate-50 p-8 border-r border-slate-100 flex flex-col shrink-0">
          <div className="flex items-center space-x-3 mb-10"><div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg"><i className="fas fa-terminal"></i></div><h2 className="text-xl font-black">Vault</h2></div>
          <nav className="flex-grow space-y-3">
            {['overview', 'implementation', 'team'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab as any)} className={`w-full text-left px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === tab ? 'bg-white text-emerald-600 shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}>{tab.toUpperCase()}</button>
            ))}
          </nav>
          <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg">CLOSE</button>
        </div>
        <div className="flex-grow overflow-y-auto p-12 bg-white flex flex-col">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-4xl font-black">BioChe Engine v2.5</h3>
              <p className="text-lg text-slate-500">A unified React application for TI SCHOOL, combining curriculum database, neural tutoring, and technical transparency into a single-file system.</p>
              <div className="grid grid-cols-2 gap-6"><div className="p-6 bg-slate-50 rounded-3xl border">Architecture: ESM Unified</div><div className="p-6 bg-slate-50 rounded-3xl border">AI: Gemini 3 Flash</div></div>
            </div>
          )}
          {activeTab === 'implementation' && (
            <div className="flex flex-col h-full animate-fadeIn">
              <div className="flex justify-between items-center mb-6"><div><h3 className="text-3xl font-black">Manifest</h3></div><div className="flex bg-slate-100 p-1 rounded-xl">{Object.keys(projectFiles).map(f => <button key={f} onClick={() => setSelectedFile(f)} className={`px-4 py-2 rounded-lg text-[10px] font-black ${selectedFile === f ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}>{f.toUpperCase()}</button>)}</div></div>
              <div className="flex-grow bg-slate-900 rounded-3xl p-6 overflow-hidden"><pre className="h-full overflow-auto font-mono text-xs text-slate-300"><code>{projectFiles[selectedFile]}</code></pre></div>
            </div>
          )}
          {activeTab === 'team' && (
            <div className="space-y-8 animate-fadeIn">
              <h3 className="text-4xl font-black">Engineering Team</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { n: 'SR KADHIRNELAVAN', r: 'Chief Architect', c: 'bg-emerald-600' },
                  { n: 'JOSHUWA', r: 'AI Lead', c: 'bg-sky-600' },
                  { n: 'KANISHKA', r: 'Design Head', c: 'bg-indigo-600' },
                  { n: 'KAVINKUMAR', r: 'Systems Lead', c: 'bg-rose-600' }
                ].map(m => (
                  <div key={m.n} className="p-6 bg-white border rounded-3xl flex items-center space-x-4 shadow-sm">
                    <div className={`w-14 h-14 rounded-2xl ${m.c} text-white flex items-center justify-center font-black`}>{m.n[0]}</div>
                    <div><h4 className="font-black">{m.n}</h4><p className="text-[10px] text-slate-400 font-black">OF TI SCHOOL</p><p className="text-xs text-emerald-600 font-bold">{m.r}</p></div>
                  </div>
                ))}
              </div>
              <div className="p-10 bg-slate-900 rounded-[3rem] text-white text-center italic"><p>"Transforming education at TI SCHOOL through unified engineering."</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- LESSON VIEW COMPONENT ---
const LessonView = ({ topic, onBack }: { topic: Topic; onBack: () => void }) => {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);

  const handleAI = async () => {
    if (!input.trim() || isTyping) return;
    const q = input; setInput(''); setMessages(p => [...p, { role: 'user', text: q }]);
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: q, config: { systemInstruction: `Science teacher for Class ${topic.grade}. Topic: ${topic.title}. Be concise.` } });
      setMessages(p => [...p, { role: 'model', text: res.text || "I'm processing..." }]);
    } catch (e) { setMessages(p => [...p, { role: 'model', text: "Error connecting to AI Lab." }]); }
    finally { setIsTyping(false); }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-fadeIn pb-20">
      <div className="lg:col-span-2 space-y-6">
        <button onClick={onBack} className="flex items-center font-black text-slate-500 hover:text-emerald-600"><i className="fas fa-arrow-left mr-2"></i>HUB</button>
        <div className="bg-white rounded-[2.5rem] shadow-xl border overflow-hidden">
          <div className={`h-24 ${topic.subject === 'Biology' ? 'bg-emerald-600' : 'bg-sky-600'} opacity-80 flex items-center justify-center`}><i className="fas fa-flask text-4xl text-white/30"></i></div>
          <div className="p-10 -mt-6 bg-white rounded-t-[2rem]">
            <h1 className="text-4xl font-black mb-2">{topic.title}</h1>
            <p className="text-slate-500 font-medium mb-8">{topic.description}</p>
            <div className="p-8 bg-slate-50 rounded-3xl border text-lg leading-relaxed">{topic.content}</div>
            {topic.quiz && (
              <div className="mt-10 p-8 border-2 rounded-3xl bg-white">
                <h3 className="font-black text-xl mb-6">Quick Quiz</h3>
                {topic.quiz.map((q, i) => (
                  <div key={i} className="space-y-4">
                    <p className="font-bold">{q.question}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {q.options.map((o, oi) => (
                        <button key={oi} disabled={showResults} onClick={() => setQuizAnswers(p => ({ ...p, [i]: oi }))} 
                          className={`p-4 rounded-xl border-2 text-left font-bold transition-all ${showResults ? (q.correctIndex === oi ? 'bg-emerald-50 border-emerald-500' : (quizAnswers[i] === oi ? 'bg-red-50 border-red-500' : 'bg-slate-50 opacity-50')) : (quizAnswers[i] === oi ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white hover:border-emerald-200')}`}>{o}</button>
                      ))}
                    </div>
                  </div>
                ))}
                {!showResults ? <button onClick={() => setShowResults(true)} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-black">SUBMIT</button> : <button onClick={() => { setShowResults(false); setQuizAnswers({}); }} className="mt-4 w-full py-4 bg-slate-100 rounded-2xl font-black">RESET</button>}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1"><div className="sticky top-24 bg-white rounded-3xl shadow-xl border h-[600px] flex flex-col overflow-hidden">
        <div className="p-4 bg-emerald-600 text-white flex items-center space-x-2"><i className="fas fa-brain"></i><span className="font-black text-sm uppercase">Neural Tutor</span></div>
        <div ref={scrollRef} className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50/50">
          {messages.map((m, i) => <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-white border rounded-tl-none shadow-sm'}`}>{m.text}</div></div>)}
          {isTyping && <div className="p-2 flex space-x-1 animate-pulse"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div></div>}
        </div>
        <div className="p-4 border-t flex space-x-2"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAI()} placeholder="Ask me..." className="flex-grow px-4 py-3 bg-slate-100 rounded-xl outline-none focus:bg-white" /><button onClick={handleAI} className="w-12 h-12 bg-emerald-600 text-white rounded-xl"><i className="fas fa-bolt"></i></button></div>
      </div></div>
    </div>
  );
};

// --- MAIN HUB COMPONENT ---
const Dashboard = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const [grade, setGrade] = useState<Grade>(user.grade);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [search, setSearch] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const filtered = TOPICS.filter(t => t.grade === grade && t.title.toLowerCase().includes(search.toLowerCase()));

  if (topic) return <LessonView topic={topic} onBack={() => setTopic(null)} />;

  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b p-4 sticky top-0 z-40"><div className="container mx-auto flex justify-between items-center"><div className="flex items-center space-x-2"><div className="bg-emerald-600 text-white p-2 rounded-lg"><i className="fas fa-atom"></i></div><span className="text-xl font-black">BioChe</span></div><div className="flex space-x-4 items-center"><button onClick={() => setShowInfo(true)} className="p-2 text-slate-400 hover:text-emerald-600"><i className="fas fa-info-circle text-xl"></i></button><button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-600"><i className="fas fa-sign-out-alt text-xl"></i></button></div></div></nav>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6"><div><h2 className="text-4xl font-black">Research Hub</h2><p className="text-slate-500 font-medium">Hello, {user.name} of TI SCHOOL</p></div><input type="text" placeholder="Search experiments..." value={search} onChange={e => setSearch(e.target.value)} className="w-full max-w-md px-6 py-4 bg-white border-2 rounded-2xl outline-none focus:border-emerald-500 shadow-sm" /></div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-4">
            <div className="bg-white p-6 rounded-3xl border shadow-sm"><h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Select Class</h4><div className="space-y-2">{[6, 7, 8, 9, 10].map(g => <button key={g} onClick={() => setGrade(g as Grade)} className={`w-full text-left px-4 py-3 rounded-xl font-black transition-all ${grade === g ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'hover:bg-slate-50'}`}>Class {g}</button>)}</div></div>
          </aside>
          <div className="flex-grow grid md:grid-cols-2 gap-6">
            {filtered.map(t => (
              <div key={t.id} onClick={() => setTopic(t)} className="bg-white p-8 rounded-[2rem] border shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${t.subject === 'Biology' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'}`}><i className={`fas ${t.subject === 'Biology' ? 'fa-leaf' : 'fa-flask'} text-xl`}></i></div>
                <h3 className="text-2xl font-black mb-2 group-hover:text-emerald-600">{t.title}</h3>
                <p className="text-slate-500 font-medium line-clamp-2">{t.description}</p>
                <div className="mt-6 flex items-center text-xs font-black uppercase tracking-widest text-emerald-600">Start Research <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i></div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Engineered By BioChe Team • TI SCHOOL</footer>
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
    </div>
  );
};

// --- LOGIN COMPONENT ---
const Login = ({ onLogin }: { onLogin: (u: User) => void }) => {
  const [form, setForm] = useState<User>({ name: '', email: '', grade: 6 });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 to-sky-600 p-4">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md animate-scaleIn">
        <div className="text-center mb-10"><div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600"><i className="fas fa-microscope text-4xl"></i></div><h1 className="text-3xl font-black">BioChe Academy</h1><p className="text-slate-500 font-medium">Class 6-10 Excellence</p></div>
        <form onSubmit={e => { e.preventDefault(); onLogin(form); }} className="space-y-4">
          <input placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" required />
          <select value={form.grade} onChange={e => setForm({ ...form, grade: Number(e.target.value) as Grade })} className="w-full px-6 py-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500">{[6, 7, 8, 9, 10].map(g => <option key={g} value={g}>Class {g}</option>)}</select>
          <button type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:shadow-emerald-200 transition-all active:scale-95">LOG IN</button>
        </form>
        <div className="mt-10 pt-6 border-t text-center text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">Engineers OF TI SCHOOL<br/>KADHIRNELAVAN • JOSHUWA • KANISHKA • KAVINKUMAR</div>
      </div>
    </div>
  );
};

// --- ROOT APP ---
const App = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => { const s = localStorage.getItem('bioche_user'); if (s) setUser(JSON.parse(s)); }, []);
  const handleLogin = (u: User) => { setUser(u); localStorage.setItem('bioche_user', JSON.stringify(u)); };
  return user ? <Dashboard user={user} onLogout={() => { setUser(null); localStorage.removeItem('bioche_user'); }} /> : <Login onLogin={handleLogin} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
