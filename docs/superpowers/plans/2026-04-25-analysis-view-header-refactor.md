# Analysis View Header Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the Analysis View header so the status indicator and download button are horizontally aligned with the "Analysis View" title. Ensure "Vibe Card Generated" is black in light mode.

**Architecture:** Move the header label into the `VibeDashboard` component and update the component to always render its header line.

**Tech Stack:** Tailwind CSS, React, Lucide Icons.

---

### Task 1: Update App.tsx Layout

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Remove the standalone Analysis View title**

```tsx
// Find and remove this line:
<h3 className="text-sm font-bold uppercase tracking-widest text-theme-text/80 ml-1">Analysis View</h3>
```

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "refactor: remove Analysis View title from App.tsx (moving to VibeDashboard)"
```

---

### Task 2: Refactor VibeDashboard Header

**Files:**
- Modify: `src/components/VibeDashboard.tsx`

- [ ] **Step 1: Update the component to always show the header and a placeholder for IDLE**

Remove the `if (status === 'IDLE') return null;` and restructure the return.

```tsx
// Inside VibeDashboard component
  return (
    <div className="flex flex-col gap-4">
      {/* Unified Header */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-theme-text/80">Analysis View</h3>
          {status === 'SUCCESS' && (
            <div className="flex items-center gap-2 text-black dark:text-theme-primary/60 animate-in fade-in slide-in-from-left-2 duration-500">
              <Sparkles size={14} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Vibe Card Generated</span>
            </div>
          )}
        </div>
        
        {status === 'SUCCESS' && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white/10 hover:bg-black dark:hover:bg-white/20 text-white backdrop-blur-md border border-white/10 rounded-full text-xs font-bold transition-all active:scale-95 shadow-lg group cursor-pointer"
          >
            <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Download Vibe</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {status === 'IDLE' && (
        <div className="flex flex-col items-center justify-center p-12 bg-white/40 dark:bg-gray-900/20 backdrop-blur-md rounded-3xl border border-dashed border-slate-300/50 dark:border-white/5 min-h-[200px]">
           <Sparkles className="text-theme-text/20 mb-3" size={32} />
           <p className="text-theme-text/40 font-medium">Ready to analyze your visual vibe...</p>
        </div>
      )}

      {status === 'SCANNING' && (
        <div className="flex flex-col items-center justify-center p-20 bg-theme-cream rounded-3xl border border-slate-200/60 dark:border-gray-700 backdrop-blur-sm shadow-xl">
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
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all shadow-md active:scale-95 text-sm cursor-pointer"
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
          {/* ... existing card content ... */}
        </div>
      )}
    </div>
  )
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VibeDashboard.tsx
git commit -m "style: align header items beside Analysis View title and fix indicator color"
```
