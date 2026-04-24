# Enhanced Gemini Error Handling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve error transparency by displaying actual Gemini API error messages when failures occur, especially during high demand.

**Architecture:** Update the Service layer to parse SDK-specific errors and the UI layer to display them prominently.

**Tech Stack:** React, TypeScript, Tailwind CSS, @google/generative-ai SDK.

---

### Task 1: Update GeminiService Error Handling

**Files:**
- Modify: `src/services/geminiService.ts`

- [ ] **Step 1: Import error classes and update error handling logic**

```typescript
import { 
  GoogleGenerativeAI, 
  GoogleGenerativeAIFetchError, 
  GoogleGenerativeAIResponseError 
} from '@google/generative-ai';

// ... in GeminiService class ...

  async analyzeImage(base64Image: string, mimeType: string): Promise<GeminiResponse> {
    // ... model initialization ...
    const model = this.genAI.getGenerativeModel({ model: MODELS[0] });
    
    // ... prompt and imageParts ...

    try {
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const responseText = response.text();
      
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : responseText;
      
      const parsed = JSON.parse(jsonStr);
      return {
        ...parsed,
        markdownResponse: `### Poetic Description\n${parsed.poeticDescription}\n\n### Mood\n${parsed.moodAnalysis}`
      };
    } catch (e: any) {
      console.error("Gemini Analysis Error:", e);
      
      if (e instanceof GoogleGenerativeAIFetchError) {
        throw new Error(`Gemini API Error (${e.status}): ${e.message}`);
      }
      
      if (e instanceof GoogleGenerativeAIResponseError) {
        throw new Error(`Gemini Response Error: ${e.message}`);
      }

      if (e instanceof Error) {
        throw new Error(e.message);
      }
      
      throw new Error("An unexpected error occurred during image analysis.");
    }
  }
```

- [ ] **Step 2: Commit**

```bash
git add src/services/geminiService.ts
git commit -m "feat: enhance GeminiService error parsing"
```

---

### Task 2: Enhance VibeDashboard Error UI

**Files:**
- Modify: `src/components/VibeDashboard.tsx`

- [ ] **Step 1: Update the ERROR state UI**

```tsx
  if (status === 'ERROR') {
    return (
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
    );
  }
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VibeDashboard.tsx
git commit -m "feat: improve error UI in VibeDashboard"
```
