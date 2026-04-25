import { useState, useEffect } from 'react';
import { visionLogic } from '../logic/visionLogic';
import type { AppState, ScanResult } from '../logic/visionLogic';

export function useVisionLogic() {
  const [data, setData] = useState({
    status: 'IDLE' as AppState,
    currentResult: null as ScanResult | null,
    errorMsg: null as string | null,
    history: [] as ScanResult[]
  });

  useEffect(() => {
    // Initial sync
    setData({
      status: visionLogic.state,
      currentResult: visionLogic.currentResult,
      errorMsg: visionLogic.errorMsg,
      history: visionLogic.history
    });

    const update = () => {
      setData({
        status: visionLogic.state,
        currentResult: visionLogic.currentResult,
        errorMsg: visionLogic.errorMsg,
        history: visionLogic.history
      });

      // Apply Dynamic Theme (Only accent colors)
      if (visionLogic.currentResult?.response.colorPalette) {
        const colors = visionLogic.currentResult.response.colorPalette;
        const root = document.documentElement;
        // Map palette to primary/secondary/accent CSS variables
        if (colors[0]) root.style.setProperty('--color-primary', colors[0]);
        if (colors[1]) root.style.setProperty('--color-secondary', colors[1]);
        if (colors[2]) root.style.setProperty('--color-accent', colors[2]);
      }
    };

    const unsubscribe = visionLogic.subscribe(update);
    return () => {
      unsubscribe();
    };
  }, []);

  return { ...data, logic: visionLogic };
}
