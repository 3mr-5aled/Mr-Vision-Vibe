# Light Mode Color Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Sophisticated Slate" light mode color redesign to improve depth, contrast, and professional aesthetic quality.

**Architecture:** Update global CSS variables for a Slate-based palette and refine background animations and glassmorphism containers to match.

**Tech Stack:** Tailwind CSS, React, Lucide Icons.

---

### Task 1: Update CSS Variables

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace light mode :root variables**

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
  --color-accent: #d97706;
  --color-bg-subtle: #f8fafc; /* Slate 50 */
  --color-card-bg: rgba(255, 255, 255, 0.7);
  --color-surface-cream: #ffffff; /* Cleanup */
  --color-surface-cream-hover: #f1f5f9; /* Slate 100 */
  --color-text-main: #0f172a; /* Slate 900 */
  --color-text-muted: #475569; /* Slate 600 */
  --color-border-subtle: rgba(226, 232, 240, 0.5); /* Slate 200/50 */
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "style: update light mode variables to Sophisticated Slate palette"
```

---

### Task 2: Refine Background and Global Layout

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update background blob animations and container borders**

```tsx
// Inside src/App.tsx
// Update background blobs
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
  <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-theme-primary/30 dark:bg-theme-primary/20 rounded-full blur-[120px] animate-pulse mix-blend-multiply dark:mix-blend-normal" style={{ animationDuration: '8s' }} />
  <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-theme-secondary/30 dark:bg-theme-secondary/20 rounded-full blur-[100px] animate-pulse mix-blend-multiply dark:mix-blend-normal" style={{ animationDuration: '12s', animationDelay: '2s' }} />
  <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-theme-accent/30 dark:bg-theme-accent/20 rounded-full blur-[110px] animate-pulse mix-blend-multiply dark:mix-blend-normal" style={{ animationDuration: '10s', animationDelay: '4s' }} />
</div>

// Update Content Containers (Input Source and Historical Intelligence)
// Search for bg-white/70 classes and standardize
className="grid grid-cols-1 gap-6 bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-slate-200/50 dark:border-white/5 shadow-2xl shadow-slate-200/40 dark:shadow-none"
```

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "style: refine background blobs and container glass styling for light mode"
```

---

### Task 3: Standardize VibeDashboard Glass Styling

**Files:**
- Modify: `src/components/VibeDashboard.tsx`

- [ ] **Step 1: Update dashboard container borders and shadows**

```tsx
// Inside src/components/VibeDashboard.tsx
// Update the main container wrapping dashboardRef
className="flex flex-col gap-8 bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-8 border border-slate-200/50 dark:border-white/5 shadow-2xl shadow-slate-200/40 dark:shadow-none relative z-10"
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VibeDashboard.tsx
git commit -m "style: standardize VibeDashboard glassmorphism with slate palette"
```
