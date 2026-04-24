# Vibe Card Contrast Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the low-contrast / black-on-black issue in the "Poetic Description" area of the Vibe Card during light mode when the analyzed primary color is dark.

**Architecture:** Switch the "Poetic Description" container to use a stable light background in light mode instead of a dynamic theme color.

**Tech Stack:** Tailwind CSS, React.

---

### Task 1: Stabilize Poetic Description Background

**Files:**
- Modify: `src/components/VibeDashboard.tsx`

- [ ] **Step 1: Update container classes for Poetic Description**

Change the dynamic background to a fixed light one in light mode, while keeping the dynamic color for the decorative side-bar and a faint border.

```tsx
// Inside VibeDashboard.tsx (Poetic Description section)
// Current: <div className="relative flex-1 p-8 rounded-2xl bg-theme-primary/5 border border-theme-primary/10 ...">
// New:
<div className="relative flex-1 p-8 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 overflow-hidden group">
  <div className="absolute top-0 left-0 w-1.5 h-full bg-theme-primary opacity-80" />
  {/* ... p tag and other elements ... */}
</div>
```

- [ ] **Step 2: Lighten Header Icon for Light Mode**

While we're at it, let's fix the other black element (Header Icon Box) to look better in light mode.

```tsx
// Inside App.tsx (Header section)
// Current: <div className="p-2 bg-gray-900 dark:bg-gray-100 rounded-xl shadow-lg transition-colors">
// New:
<div className="p-2 bg-theme-primary/10 dark:bg-gray-100 rounded-xl shadow-lg transition-colors border border-theme-primary/20">
  <Sparkle className="text-theme-primary dark:text-gray-900" size={32} />
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/VibeDashboard.tsx src/App.tsx
git commit -m "fix: resolve contrast issues in light mode for Vibe Card and Header"
```
