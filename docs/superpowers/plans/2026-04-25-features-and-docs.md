# Features Accordion and Documentation implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a features accordion above the footer, integrate real logos into the footer, and generate professional project documentation.

**Architecture:** Create a new React component for the accordion and update the existing App layout and Footer.

**Tech Stack:** React, Tailwind CSS, Lucide Icons.

---

### Task 1: Create FeaturesAccordion Component

**Files:**
- Create: `src/components/FeaturesAccordion.tsx`

- [ ] **Step 1: Implement the Accordion**

```tsx
import React, { useState } from 'react';
import { ChevronDown, Zap, Shield, Smartphone, Download, History, Camera } from 'lucide-react';

const features = [
  {
    title: "Multimodal Visual Intelligence",
    description: "Powered by Gemini 1.5 Flash, VisionVibe analyzes images to generate poetic descriptions and atmospheric mood insights with high accuracy.",
    icon: <Zap className="text-blue-400" size={20} />
  },
  {
    title: "Midnight Vibe Cards",
    description: "Experience your results in a high-contrast 'Midnight' aesthetic designed for focus and immersion, featuring dynamic accent colors extracted from your photos.",
    icon: <Smartphone className="text-purple-400" size={20} />
  },
  {
    title: "Instant Image Export",
    description: "Save your favorite vibes as beautifully formatted PNG cards directly to your device, perfect for sharing on social media or keeping as inspiration.",
    icon: <Download className="text-emerald-400" size={20} />
  },
  {
    title: "PWA Support",
    description: "Install VisionVibe on your home screen for a native app-like experience. Fast, reliable, and works seamlessly across mobile and desktop.",
    icon: <Shield className="text-amber-400" size={20} />
  },
  {
    title: "Historical Intelligence",
    description: "Your analyzed vibes are automatically saved to local storage, allowing you to revisit your visual history anytime.",
    icon: <History className="text-rose-400" size={20} />
  },
  {
    title: "Live Camera Integration",
    description: "Capture the world around you in real-time. Direct camera access allows for immediate analysis of your current environment.",
    icon: <Camera className="text-cyan-400" size={20} />
  }
];

export function FeaturesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full space-y-3">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="group overflow-hidden rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 hover:bg-white/10"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between p-5 text-left transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <span className="font-bold text-slate-200">{feature.title}</span>
            </div>
            <ChevronDown 
              className={`text-slate-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
              size={20} 
            />
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-5 pt-0 text-slate-400 leading-relaxed ml-14">
              {feature.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FeaturesAccordion.tsx
git commit -m "feat: add FeaturesAccordion component"
```

---

### Task 2: Integrate Accordion and Update Footer Logos

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add Accordion and update logo assets**

```tsx
import AntigravityLogo from './assets/Antigravity.jpg';
import GeminiLogo from './assets/geminicli.png';
import { FeaturesAccordion } from './components/FeaturesAccordion';

// Inside App() before footer...
<section className="flex flex-col gap-4 mt-12">
   <h3 className="text-sm font-bold uppercase tracking-widest text-theme-text/80 ml-1">Core Capabilities</h3>
   <FeaturesAccordion />
</section>

{/* Update Footer Tool Credits */}
<div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
   <img src={GeminiLogo} alt="Gemini CLI" className="w-4 h-4 rounded-sm" />
   <span className="text-slate-300">Gemini CLI</span>
</div>
<div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
   <img src={AntigravityLogo} alt="Antigravity" className="w-4 h-4 rounded-sm" />
   <span className="text-slate-300">Antigravity</span>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/App.tsx
git commit -m "feat: integrate FeaturesAccordion and use actual logos in footer"
```

---

### Task 3: Generate Project Documentation

**Files:**
- Create: `README.md`
- Output: Repository Description

- [ ] **Step 1: Write README.md**

(Content will be written in the Act phase)

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README.md"
```
