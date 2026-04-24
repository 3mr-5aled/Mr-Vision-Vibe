# Design Doc: Light Mode Color Redesign (Sophisticated Slate)

## Goal
Redesign the light mode colors to improve depth, contrast, and overall aesthetic quality, specifically targeting the background and cards to make the glassmorphism effect more professional.

## Architecture & Implementation

### 1. Palette Updates (`src/index.css`)
- **Action:** Replace existing light mode variables with a Slate-based palette.
- **Variables:**
  - `--color-bg-subtle`: `#f8fafc` (Slate 50) - Provides a soft, clean base that makes white cards pop.
  - `--color-card-bg`: `rgba(255, 255, 255, 0.7)` - Semi-transparent white for the glass effect.
  - `--color-text-main`: `#0f172a` (Slate 900) - Strong contrast for headings.
  - `--color-text-muted`: `#475569` (Slate 600) - Clear but softer contrast for body text.
  - `--color-border-subtle`: `rgba(226, 232, 240, 0.5)` (Slate 200 at 50% opacity) - For card borders.

### 2. Layout & Styling (`src/App.tsx`)
- **Action:** Ensure the background blobs and glassmorphism containers utilize the new palette.
- **Implementation:**
  - Background blobs in light mode will use `mix-blend-multiply` to darken the underlying Slate 50 slightly, creating a richer look.
  - Increase blob opacity slightly to ~30% for better presence against the light background.

### 3. Component Styling (`src/components/VibeDashboard.tsx`, etc.)
- **Action:** Standardize the glassmorphism classes across all major content containers.
- **Implementation:**
  - Use `bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl border border-slate-200/50 dark:border-white/5` consistently.

## Testing Strategy
- **Visual Verification:** Compare the new light mode against the previous version to ensure improved readability and depth.
- **Dark Mode Regression:** Ensure that these changes do not affect the dark mode variables or layout.
- **Responsive Check:** Verify that the background blobs do not interfere with text legibility on smaller screens.
