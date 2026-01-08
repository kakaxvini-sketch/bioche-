
import React, { useState } from 'react';
import { User, Grade } from '../types';

interface SettingsProps {
  user: User;
  onClose: () => void;
  onUpdateUser: (user: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onClose, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [grade, setGrade] = useState<Grade>(user.grade);

  const handleSave = () => {
    onUpdateUser({ name, email, grade });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-scaleIn">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Learning Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Display Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Class</label>
            <select 
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value) as Grade)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {[6, 7, 8, 9, 10].map(g => (
                <option key={g} value={g}>Class {g}</option>
              ))}
            </select>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-700 mb-2">Platform Credits</h4>
            <p className="text-xs text-slate-500 mb-1">Created by the BioChe Engineering Team:</p>
            <div className="bg-slate-50 p-3 rounded-lg text-xs font-medium text-slate-600 leading-relaxed">
              SR KADHIRNELAVAN • JOSHUWA<br/>KANISHKA • KAVINKUMAR
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-bold hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-md transition-all active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
