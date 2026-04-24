import { useVisionLogic } from '../hooks/useVisionLogic';
import { Clock, Trash2, ChevronRight } from 'lucide-react';

export function HistoryPanel() {
  const { history, logic } = useVisionLogic();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-xl text-theme-text">
          <Clock size={20} />
          <span>Timeline</span>
        </div>
        {history.length > 0 && (
          <button 
            onClick={() => logic.clearHistory()}
            className="text-theme-text-muted hover:text-red-500 transition-colors cursor-pointer"
            title="Clear All History"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-theme-text-muted text-center px-4 bg-theme-cream rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <Clock size={32} className="mb-2 opacity-20" />
          <p className="text-sm italic">Your visual explorations will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {history.map(item => (
            <button 
              key={item.id} 
              onClick={() => logic.loadFromResult(item)}
              className="flex items-center gap-4 p-3 bg-theme-cream hover:bg-theme-cream-hover hover:shadow-md hover:ring-1 hover:ring-theme-primary/10 rounded-xl transition-all text-left group border border-transparent cursor-pointer"
            >
              <img 
                src={item.imageThumbnail} 
                alt="Thumbnail" 
                className="w-14 h-14 object-cover rounded-lg shadow-sm shrink-0" 
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-theme-text truncate leading-tight mb-1">
                  {item.response.moodAnalysis}
                </p>
                <div className="flex gap-1">
                  {item.response.colorPalette?.slice(0, 4).map((color, i) => (
                    <div 
                      key={i} 
                      className="w-3 h-3 rounded-full border border-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)]" 
                      style={{ backgroundColor: color }} 
                    />
                  ))}
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-theme-primary transition-colors shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
