import { useState, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { CameraCapture } from './components/CameraCapture';
import { VibeDashboard } from './components/VibeDashboard';
import { HistoryPanel } from './components/HistoryPanel';
import { Sparkle, Sun, Moon } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-theme-surface p-4 md:p-8 lg:p-12 font-sans text-theme-text selection:bg-theme-primary/30 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-theme-primary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-theme-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-theme-accent/20 rounded-full blur-[110px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Theme Toggle Button */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="absolute top-0 right-0 p-3 bg-theme-card rounded-full shadow-lg border border-gray-200 dark:border-gray-800 text-theme-text-muted hover:scale-110 transition-all cursor-pointer z-50"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Header */}
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 dark:bg-gray-100 rounded-xl shadow-lg transition-colors">
              <Sparkle className="text-white dark:text-gray-900" size={32} />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-theme-text transition-colors">
              VisionVibe
            </h1>
          </div>
          <p className="text-xl text-theme-text-muted font-medium ml-1">Multimodal Visual Intelligence</p>
        </header>

        {/* Top Cards: Input and Analysis */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-theme-text/80 ml-1">Input Source</h3>
            <div className="grid grid-cols-1 gap-6 bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 dark:border-white/5 shadow-2xl">
              <div className="relative z-10 grid grid-cols-1 gap-6">
                <ImageUploader />
                <div className="flex items-center gap-4">
                   <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
                   <span className="text-xs font-bold text-gray-300 uppercase">OR</span>
                   <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
                </div>
                <CameraCapture />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
             <h3 className="text-sm font-bold uppercase tracking-widest text-theme-text/80 ml-1">Analysis View</h3>
             <VibeDashboard />
          </div>
        </section>

        {/* Timeline Section: Under the cards */}
        <section className="flex flex-col gap-4">
           <h3 className="text-sm font-bold uppercase tracking-widest text-theme-text/80 ml-1">Historical Intelligence</h3>
           <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 dark:border-white/5 shadow-2xl">
              <div className="relative z-10">
                <HistoryPanel />
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}

export default App;
