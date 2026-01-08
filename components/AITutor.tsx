
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage, Subject, Grade } from '../types';

interface AITutorProps {
  topicTitle: string;
  subject: Subject;
  grade: Grade;
}

const AITutor: React.FC<AITutorProps> = ({ topicTitle, subject, grade }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, streamingText]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    setStreamingText('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a world-class Science Teacher. Your students are in Grade ${grade}. 
          Current topic: "${topicTitle}" in ${subject}. 
          Advanced Mode: Be concise but thorough. Use formatting like bullet points for clarity. 
          If a student asks something advanced, explain it using analogies. Always stay encouraging.`,
          temperature: 0.7,
        },
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        const chunkText = chunk.text || "";
        fullText += chunkText;
        setStreamingText(fullText);
      }

      setMessages(prev => [...prev, { role: 'model', text: fullText }]);
      setStreamingText('');
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection issues. Please check your science lab settings (API Key)!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 flex flex-col h-[650px] overflow-hidden transition-all hover:shadow-2xl">
      <div className="p-4 border-b border-slate-100 bg-emerald-600 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
            <i className="fas fa-microchip"></i>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">BioChe Neural Link</h3>
            <span className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full mr-1.5 animate-pulse"></span>
              Core System Online
            </span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50/50"
      >
        {messages.length === 0 && (
          <div className="text-center py-12 flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
              <i className="fas fa-brain text-2xl"></i>
            </div>
            <p className="text-slate-500 text-sm max-w-[200px]">
              Expert knowledge on <span className="font-bold text-emerald-700">{topicTitle}</span> ready to serve. Ask me anything!
            </p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
              ? 'bg-slate-800 text-white rounded-tr-none shadow-md' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}

        {streamingText && (
          <div className="flex justify-start">
            <div className="max-w-[90%] p-4 bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
              {streamingText}
              <span className="inline-block w-1.5 h-4 bg-emerald-500 ml-1 animate-pulse"></span>
            </div>
          </div>
        )}
        
        {isLoading && !streamingText && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 rounded-tl-none flex space-x-1.5 shadow-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative group">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your scientific query..."
            className="w-full pl-5 pr-12 py-4 bg-slate-100 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl text-sm transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <i className="fas fa-bolt text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
