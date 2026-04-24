import { ImageUploader } from './components/ImageUploader';
import { CameraCapture } from './components/CameraCapture';
import { VibeDashboard } from './components/VibeDashboard';
import { HistoryPanel } from './components/HistoryPanel';
import { Sparkle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-theme-surface p-4 md:p-8 lg:p-12 font-sans text-theme-text selection:bg-theme-primary/30 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-theme-primary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-theme-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-theme-accent/20 rounded-full blur-[110px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-theme-primary/10 dark:bg-gray-100 rounded-xl shadow-lg transition-colors border border-theme-primary/20">
              <Sparkle className="text-theme-primary dark:text-gray-900" size={32} />
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
            <div className="grid grid-cols-1 gap-6 bg-white/90 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-slate-200/60 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
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
             <VibeDashboard />
          </div>
        </section>

        {/* Timeline Section: Under the cards */}
        <section className="flex flex-col gap-4">
           <h3 className="text-sm font-bold uppercase tracking-widest text-theme-text/80 ml-1">Historical Intelligence</h3>
           <div className="grid grid-cols-1 gap-6 bg-white/90 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-slate-200/60 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="relative z-10">
                <HistoryPanel />
              </div>
           </div>
        </section>

        {/* Footer Credits */}
        <footer className="mt-12 py-12 border-t border-slate-800/50 flex flex-col gap-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Tool Credits */}
              <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                 <span>Built with help from</span>
                 <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                    <Sparkle size={14} className="text-[#3b82f6]" />
                    <span className="text-slate-300">Gemini CLI</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-3.5 h-3.5 bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 rounded-sm" />
                    <span className="text-slate-300">Antigravity</span>
                 </div>
              </div>

              {/* Developer Credit */}
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                 <span>Developed by</span>
                 <a 
                    href="https://github.com/3mr-5aled" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-slate-200 hover:text-theme-primary transition-colors flex items-center gap-1.5"
                 >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.362.81 1.096.81 2.22v3.293c0 .319.192.694.805.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    3mr5aled
                 </a>
              </div>
           </div>

           {/* Supervision Credit */}
           <div className="flex flex-col items-center gap-2 py-6 px-8 bg-white/5 rounded-3xl border border-white/5 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Academic Supervision</span>
              <div className="flex flex-col items-center">
                 <p className="text-slate-300 font-medium">
                    Supervised by Front-End Lead : <span className="text-white font-bold">Ali Tamer</span>
                 </p>
                 <p className="text-slate-500 text-sm mt-1">
                    GDG On Campus, Future Academy
                 </p>
              </div>
           </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
