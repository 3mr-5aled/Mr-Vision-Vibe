# Light Mode Color Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lighten the light mode UI by softening background blending, increasing card opacity, and refining text colors for a cleaner "airy" feel.

**Architecture:** Update global CSS variables and refine background blob blending in the main layout.

**Tech Stack:** Tailwind CSS, React.

---

### Task 1: Lighten Global Variables

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Soften text and card backgrounds**

```css
:root {
  --color-primary: #3b82f6; /* Lighter Blue */
  --color-secondary: #8b5cf6; /* Lighter Purple */
  --color-accent: #f59e0b; /* Lighter Amber */
  --color-bg-subtle: #f8fafc; /* Slate 50 */
  --color-card-bg: rgba(255, 255, 255, 0.85); /* More opaque white */
  --color-surface-cream: #ffffff;
  --color-surface-cream-hover: #f1f5f9;
  --color-text-main: #1e293b; /* Slate 800 (not pure black) */
  --color-text-muted: #64748b; /* Slate 500 */
  --color-border-subtle: rgba(226, 232, 240, 0.8); /* More visible border */
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "style: lighten light mode colors and soften text contrast"
```

---

### Task 2: Polish Background Blending

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Remove mix-blend-multiply in light mode**

The multiply blend mode was making the blobs too dark and muddy on Slate 50. Switching to `mix-blend-soft-light` or `normal` with lower opacity.

```tsx
// Inside src/App.tsx
// Update background blobs
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
  <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-theme-primary/10 dark:bg-theme-primary/20 rounded-full blur-[120px] animate-pulse mix-blend-normal" style={{ animationDuration: '8s' }} />
  <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-theme-secondary/10 dark:bg-theme-secondary/20 rounded-full blur-[100px] animate-pulse mix-blend-normal" style={{ animationDuration: '12s', animationDelay: '2s' }} />
  <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-theme-accent/10 dark:bg-theme-accent/20 rounded-full blur-[110px] animate-pulse mix-blend-normal" style={{ animationDuration: '10s', animationDelay: '4s' }} />
</div>

// Also update card backgrounds in App.tsx to use theme card variable more directly or increase opacity
// Change bg-white/70 to bg-white/90 for better "light" look
className="grid grid-cols-1 gap-6 bg-white/90 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-slate-200/60 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none"
```

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "style: soften background blobs and brighten card containers"
```

---

### Task 3: Sync VibeDashboard Styling

**Files:**
- Modify: `src/components/VibeDashboard.tsx`

- [ ] **Step 1: Brighten dashboard container**

```tsx
// Inside src/components/VibeDashboard.tsx
className="flex flex-col gap-8 bg-white/90 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl p-8 border border-slate-200/60 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none relative z-10"
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VibeDashboard.tsx
git commit -m "style: brighten VibeDashboard for light mode"
```
