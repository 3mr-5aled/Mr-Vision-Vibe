import { GeminiService } from '../services/geminiService';
import type { GeminiResponse } from '../services/geminiService';

export type AppState = 'IDLE' | 'SCANNING' | 'SUCCESS' | 'ERROR';

export interface ScanResult {
  id: string;
  timestamp: number;
  imageThumbnail: string;
  response: GeminiResponse;
}

type Listener = () => void;

export class AntigravityLogic {
  private service: GeminiService | null = null;
  public apiKey: string | null = null;
  public state: AppState = 'IDLE';
  public currentResult: ScanResult | null = null;
  public errorMsg: string | null = null;
  public history: ScanResult[] = [];
  private listeners: Set<Listener> = new Set();

  constructor() {
    // Initial initialization without localStorage
  }

  public init() {
    this.loadApiKey();
    try {
      this.service = new GeminiService(this.apiKey || undefined);
    } catch (e: any) {
      this.errorMsg = e.message;
      this.state = 'ERROR';
    }
    this.loadHistory();
    this.notify();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  private loadApiKey() {
    this.apiKey = localStorage.getItem('visionVibeApiKey');
  }

  setApiKey(key: string) {
    this.apiKey = key;
    if (key) {
      localStorage.setItem('visionVibeApiKey', key);
    } else {
      localStorage.removeItem('visionVibeApiKey');
    }

    try {
      this.service = new GeminiService(key || undefined);
      if (this.errorMsg && (this.errorMsg.includes("Missing Gemini API Key") || this.errorMsg.includes("settings"))) {
        this.state = 'IDLE';
        this.errorMsg = null;
      }
    } catch (e: any) {
      this.service = null;
      this.errorMsg = e.message;
      this.state = 'ERROR';
    }
    this.notify();
  }

  private loadHistory() {
    const saved = localStorage.getItem('visionVibeHistory');
    if (saved) {
      try {
        this.history = JSON.parse(saved);
        this.notify();
      } catch (e) {
        console.error("Failed to parse history from LocalStorage", e);
      }
    }
  }

  private saveHistory() {
    localStorage.setItem('visionVibeHistory', JSON.stringify(this.history));
  }

  async convertToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async processImage(file: File | Blob, mimeType: string) {
    if (this.state === 'ERROR' && !this.service) {
        // Try to re-init service if it failed before
        try {
            this.service = new GeminiService(this.apiKey || undefined);
            this.state = 'IDLE';
            this.errorMsg = null;
        } catch(e: any) {
            this.errorMsg = e.message;
            this.notify();
            return;
        }
    }
    
    this.state = 'SCANNING';
    this.errorMsg = null;
    this.notify();

    try {
      const base64 = await this.convertToBase64(file);
      
      if (!this.service) throw new Error("Service not initialized");

      const response = await this.service.analyzeImage(base64, mimeType);
      
      const newResult: ScanResult = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        imageThumbnail: base64,
        response
      };

      this.currentResult = newResult;
      this.history = [newResult, ...this.history];
      this.saveHistory();
      this.state = 'SUCCESS';
      this.notify();
    } catch (error: any) {
      this.errorMsg = error.message;
      this.state = 'ERROR';
      this.notify();
    }
  }
  
  loadFromResult(result: ScanResult) {
      this.currentResult = result;
      this.state = 'SUCCESS';
      this.notify();
  }

  clearHistory() {
      this.history = [];
      this.saveHistory();
      this.notify();
  }
}

// Singleton instance to be shared across components
export const visionLogic = new AntigravityLogic();
