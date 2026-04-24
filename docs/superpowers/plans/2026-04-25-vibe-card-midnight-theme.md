# Vibe Card "Midnight" Style Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Vibe Card in light mode to use a dark background with white text for the poetic description and mood, while making the "Vibe Card Generated" indicator black.

**Architecture:** Force dark backgrounds and white text on the result containers within the VibeDashboard.

**Tech Stack:** Tailwind CSS, React.

---

### Task 1: Update VibeDashboard Colors

**Files:**
- Modify: `src/components/VibeDashboard.tsx`

- [ ] **Step 1: Update header text color**

Find the "Vibe Card Generated" span and make it black in light mode.

```tsx
// Current: <div className="flex items-center gap-2 text-theme-primary/60">
// New:
<div className="flex items-center gap-2 text-black dark:text-theme-primary/60">
```

- [ ] **Step 2: Update Card and Internal Section Colors**

Make the main dashboard card dark and the internal sections use white text.

```tsx
// Update main container (dashboardRef)
// Change bg-white/90 to bg-slate-900 in light mode
className="flex flex-col gap-8 bg-slate-900 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-8 border border-slate-800 dark:border-white/5 shadow-2xl relative z-10"

// Update Poetic Description Title and Text
// Current: <h2 className="text-3xl font-extrabold tracking-tight text-theme-text">Poetic Description</h2>
// New:
<h2 className="text-3xl font-extrabold tracking-tight text-white">Poetic Description</h2>
// Current: <p className="relative z-10 text-2xl text-theme-text leading-relaxed font-serif italic selection:bg-theme-primary/20">
// New:
<p className="relative z-10 text-2xl text-white/90 leading-relaxed font-serif italic selection:bg-theme-primary/20">

// Update Atmospheric Mood Title and Text
// Current: <h3 className="text-sm font-bold uppercase tracking-widest text-theme-secondary mb-3">Atmospheric Mood</h3>
// New (using a brighter color for the label):
<h3 className="text-sm font-bold uppercase tracking-widest text-theme-primary mb-3">Atmospheric Mood</h3>
// Current: <p className="text-xl text-theme-text-muted leading-relaxed font-medium">
// New:
<p className="text-xl text-white/80 leading-relaxed font-medium">
```

- [ ] **Step 3: Update Poetic Description Box Background**

```tsx
// Change bg-slate-50/50 to a subtle dark overlay
// New:
<div className="relative flex-1 p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group">
```

- [ ] **Step 4: Commit**

```bash
git add src/components/VibeDashboard.tsx
git commit -m "style: implement midnight theme for Vibe Card in light mode"
```
