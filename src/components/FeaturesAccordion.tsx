import { useState } from 'react';
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
