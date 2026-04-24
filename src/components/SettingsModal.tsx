import { useState, useEffect } from 'react';
import { X, Key, Save, Trash2 } from 'lucide-react';
import { visionLogic } from '../logic/visionLogic';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(visionLogic.apiKey || '');
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    visionLogic.setApiKey(apiKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    setApiKey('');
    visionLogic.setApiKey('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-500/20 rounded-xl"><Key className="text-blue-400" size={24} /></div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300">Gemini API Key</label>
            <p className="text-xs text-slate-500 mb-2">Your key is stored locally in your browser. Leave blank to use the default environment variable for local development.</p>
            <input id="apiKey" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="AIzaSy..." className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-600 font-mono text-sm" />
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-bold transition-colors shadow-lg shadow-blue-900/20 cursor-pointer"><Save size={18} />{isSaved ? 'Saved!' : 'Save Key'}</button>
            <button onClick={handleClear} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-900/50 py-3 px-4 rounded-xl font-bold transition-colors cursor-pointer" title="Clear Key"><Trash2 size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
