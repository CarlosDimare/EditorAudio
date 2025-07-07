import React, { useRef, useEffect } from 'react';

interface WaveformDisplayProps {
  waveformData: number[];
  isSelected: boolean;
  isMuted: boolean;
  duration: number;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  waveformData,
  isSelected,
  isMuted,
  duration,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with high DPI support
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas with background
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw grid lines for better visual reference
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 2]);
    
    // Horizontal grid lines
    for (let i = 1; i < 4; i++) {
      const y = (rect.height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }
    
    ctx.setLineDash([]);

    // Draw waveform
    const centerY = rect.height / 2;
    const barWidth = rect.width / waveformData.length;

    // Enhanced color scheme based on state
    let waveformColor = '#10b981'; // Default emerald
    let waveformGradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    
    if (isMuted) {
      waveformColor = '#6b7280';
      waveformGradient.addColorStop(0, '#6b7280');
      waveformGradient.addColorStop(1, '#4b5563');
    } else if (isSelected) {
      waveformColor = '#3b82f6';
      waveformGradient.addColorStop(0, '#60a5fa');
      waveformGradient.addColorStop(0.5, '#3b82f6');
      waveformGradient.addColorStop(1, '#1d4ed8');
    } else {
      waveformGradient.addColorStop(0, '#34d399');
      waveformGradient.addColorStop(0.5, '#10b981');
      waveformGradient.addColorStop(1, '#047857');
    }

    ctx.fillStyle = waveformGradient;

    // Draw waveform bars with improved rendering
    waveformData.forEach((amplitude, index) => {
      const x = index * barWidth;
      const barHeight = Math.abs(amplitude) * (rect.height / 2) * 0.9; // 90% of max height
      
      // Add slight rounding to bars for smoother appearance
      const barRadius = Math.min(barWidth / 4, 1);
      
      // Draw positive part
      if (amplitude > 0) {
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight, Math.max(barWidth - 0.5, 1), barHeight, barRadius);
        ctx.fill();
      }
      
      // Draw negative part
      if (amplitude < 0) {
        ctx.beginPath();
        ctx.roundRect(x, centerY, Math.max(barWidth - 0.5, 1), barHeight, barRadius);
        ctx.fill();
      }
    });

    // Draw enhanced center line
    ctx.strokeStyle = isSelected ? '#60a5fa' : '#4b5563';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(rect.width, centerY);
    ctx.stroke();

    // Add selection indicator
    if (isSelected) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, rect.width - 2, rect.height - 2);
    }

  }, [waveformData, isSelected, isMuted]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className={`
          w-full h-32 rounded-lg border-2 transition-all duration-200
          ${isSelected 
            ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
            : 'border-gray-600 hover:border-gray-500'
          }
        `}
        style={{ imageRendering: 'auto' }}
      />
      
      {/* Enhanced time markers */}
      <div className="flex justify-between items-center text-xs text-gray-400 mt-2 px-2">
        <div className="flex items-center space-x-2">
          <span className="bg-gray-800 px-2 py-1 rounded font-mono">0:00</span>
          {isSelected && (
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          )}
        </div>
        <span className="bg-gray-800 px-2 py-1 rounded font-mono">
          {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default WaveformDisplay;