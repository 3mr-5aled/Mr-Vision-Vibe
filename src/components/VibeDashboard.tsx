import { useState, useRef, useCallback } from 'react';
import { useVisionLogic } from '../hooks/useVisionLogic';
import { Loader2, Palette, Sparkles, AlertCircle, Check, Download } from 'lucide-react';
import { toPng } from 'html-to-image';

export function VibeDashboard() {
  const { status, currentResult, errorMsg } = useVisionLogic();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(() => {
    if (dashboardRef.current === null) return;
    
    // Check current theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    toPng(dashboardRef.current, { 
      cacheBust: true,
      backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc', // Match theme background
      style: {
        borderRadius: '0' // Ensure corners are clean in export if needed
      }
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `vibe-card-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  }, [dashboardRef]);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">Analysis View</h2>
          {status === 'SUCCESS' && (
            <div className="flex items-center gap-2 text-black dark:text-theme-primary/60">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-tighter">Vibe Card Generated</span>
            </div>
          )}
        </div>
        {status === 'SUCCESS' && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white dark:text-inherit backdrop-blur-md border border-white/20 rounded-full text-xs font-bold transition-all active:scale-95 shadow-sm group cursor-pointer"
          >
            <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Download Vibe</span>
          </button>
        )}
      </header>

      {status === 'IDLE' && (
        <div className="flex flex-col items-center justify-center p-20 bg-white/50 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-xl">
           <p className="text-xl font-medium text-theme-text-muted">Ready to analyze your visual vibe...</p>
        </div>
      )}

      {status === 'SCANNING' && (
        <div className="flex flex-col items-center justify-center p-20 bg-theme-cream rounded-3xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
          <Loader2 className="animate-spin text-theme-primary mb-4" size={48} />
          <p className="text-xl font-medium text-theme-text-muted">Synthesizing visual essence...</p>
        </div>
      )}

      {status === 'ERROR' && (
        <div className="flex items-start gap-4 p-8 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 rounded-3xl border border-red-200 dark:border-red-800/50 shadow-lg animate-in fade-in zoom-in-95 duration-300">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl">
            <AlertCircle size={32} className="text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Analysis Interrupted</h3>
            <p className="text-lg leading-relaxed opacity-90">{errorMsg}</p>
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all shadow-md active:scale-95 text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {status === 'SUCCESS' && currentResult && (
        <div 
          ref={dashboardRef}
          className="flex flex-col gap-8 bg-slate-900 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-8 border border-slate-800 dark:border-white/5 shadow-2xl relative z-10"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Visual Preview & Palette */}
            <div className="w-full lg:w-2/5 flex flex-col gap-6">
              <div className="relative group">
                <img 
                  src={currentResult.imageThumbnail} 
                  alt="Analyzed Visual" 
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-[1.01]" 
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none" />
              </div>
              
              <div className="bg-theme-cream p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-3 text-theme-text-muted font-semibold text-sm uppercase tracking-wider">
                  <Palette size={16} />
                  <span>Extracted Palette</span>
                </div>
                <div className="flex gap-2 h-16 rounded-lg overflow-hidden shadow-inner">
                  {currentResult.response.colorPalette?.map((color, i) => (
                    <button 
                      key={i} 
                      onClick={() => copyToClipboard(color)}
                      className="flex-1 transition-all hover:flex-[1.5] cursor-pointer relative group border-none outline-none active:scale-95" 
                      style={{ backgroundColor: color }}
                      title={`Copy ${color}`}
                    >
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono z-20">
                        {color}
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Poetic Description */}
            <div className="w-full lg:w-3/5">
              <section className="h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-theme-primary">
                  <Sparkles size={24} />
                  <h2 className="text-3xl font-extrabold tracking-tight text-white">Poetic Description</h2>
                </div>
                <div className="relative flex-1 p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-theme-accent opacity-80" />
                  <p className="relative z-10 text-2xl text-white/90 leading-relaxed font-serif italic selection:bg-theme-primary/20">
                    "{currentResult.response.poeticDescription}"
                  </p>
                  <div className="absolute -right-4 -bottom-4 opacity-5 text-theme-accent transition-transform group-hover:scale-110 duration-700">
                     <Sparkles size={120} />
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

          {/* Atmospheric Mood - Full Width */}
          <section className="w-full">
            <h3 className="text-sm font-bold uppercase tracking-widest text-theme-accent mb-3">Atmospheric Mood</h3>
            <p className="text-xl text-white/80 leading-relaxed font-medium">
              {currentResult.response.moodAnalysis}
            </p>
          </section>
        </div>
      )}

      {/* Toast Notification outside capturing ref */}
      {copiedColor && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md">
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: copiedColor }} />
            <span className="font-mono text-sm font-bold">{copiedColor}</span>
            <span className="text-gray-400 text-sm">copied to clipboard!</span>
            <Check size={16} className="text-green-400" />
          </div>
        </div>
      )}
    </div>
  );
}
