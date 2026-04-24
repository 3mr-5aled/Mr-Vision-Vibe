import { useRef, useState } from 'react';
import { Camera, RefreshCcw } from 'lucide-react';
import { visionLogic } from '../logic/visionLogic';

export function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setIsStreaming(true);
        setStream(newStream);
      }
    } catch (err) {
      console.error("Error accessing camera", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        visionLogic.processImage(blob, 'image/jpeg');
        stopCamera();
      }
    }, 'image/jpeg');
  };

  return (
    <div 
      onClick={!isStreaming ? startCamera : undefined}
      className={`group flex flex-col items-center justify-center p-6 border rounded-2xl bg-theme-cream h-full min-h-[300px] transition-all ${!isStreaming ? 'cursor-pointer hover:bg-theme-cream-hover hover:border-theme-secondary border-gray-200 dark:border-gray-700' : 'border-gray-100 dark:border-gray-700'}`}
    >
      {!isStreaming ? (
        <div className="flex flex-col items-center gap-4 text-gray-400 group-hover:text-theme-secondary transition-colors">
          <div className="p-4 bg-white/50 dark:bg-gray-700 rounded-full transition-colors">
            <Camera size={40} />
          </div>
          <span className="text-xl font-semibold text-theme-text transition-colors">Use Camera</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full h-full">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full rounded-xl shadow-md bg-black aspect-video object-cover" 
          />
          <div className="flex gap-4 justify-center">
            <button 
              onClick={captureFrame} 
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transition transform active:scale-95"
            >
              Capture
            </button>
            <button 
              onClick={stopCamera} 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full shadow-md transition"
              title="Cancel"
            >
              <RefreshCcw size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
