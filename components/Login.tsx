
import React, { useState } from 'react';
import { User, Grade } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState<Grade>(6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onLogin({ name, email, grade });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-500 to-sky-600 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-microscope text-3xl text-emerald-600"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">BioChe Academy</h1>
          <p className="text-slate-500 mt-2">Welcome back, future scientist!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Grade / Class</label>
            <select 
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value) as Grade)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            >
              {[6, 7, 8, 9, 10].map((g) => (
                <option key={g} value={g}>Class {g}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-4 active:scale-95"
          >
            Start Learning
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-2">Creators</p>
          <p className="text-sm text-slate-600">
            SR KADHIRNELAVAN • JOSHUWA • KANISHKA • KAVINKUMAR
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
