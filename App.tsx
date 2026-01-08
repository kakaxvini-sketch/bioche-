
import React, { useState, useEffect } from 'react';
import { User, Grade, Subject, Topic } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Settings from './components/Settings';
import Footer from './components/Footer';
import InfoModal from './components/InfoModal';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  // Load user from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('bioche_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setSelectedGrade(parsedUser.grade);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setSelectedGrade(userData.grade);
    localStorage.setItem('bioche_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedGrade(null);
    setSelectedSubject(null);
    setCurrentTopic(null);
    localStorage.removeItem('bioche_user');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        userName={user.name} 
        onSettingsClick={() => setShowSettings(true)}
        onInfoClick={() => setShowInfo(true)}
        onLogout={handleLogout}
        onHomeClick={() => {
            setSelectedSubject(null);
            setCurrentTopic(null);
        }}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Dashboard 
          user={user}
          selectedGrade={selectedGrade || user.grade}
          setSelectedGrade={setSelectedGrade}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          currentTopic={currentTopic}
          setCurrentTopic={setCurrentTopic}
        />
      </main>

      <Footer />

      {showSettings && (
        <Settings 
          user={user} 
          onClose={() => setShowSettings(false)} 
          onUpdateUser={(updated) => {
            setUser(updated);
            localStorage.setItem('bioche_user', JSON.stringify(updated));
          }}
        />
      )}

      {showInfo && (
        <InfoModal onClose={() => setShowInfo(false)} />
      )}
    </div>
  );
};

export default App;
