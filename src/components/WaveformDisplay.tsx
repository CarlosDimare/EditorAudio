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

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw waveform
    const centerY = rect.height / 2;
    const barWidth = rect.width / waveformData.length;

    // Set colors based on state
    let waveformColor = '#4ade80'; // Default green
    if (isMuted) {
      waveformColor = '#6b7280'; // Gray when muted
    } else if (isSelected) {
      waveformColor = '#22c55e'; // Brighter green when selected
    }

    ctx.fillStyle = waveformColor;
    ctx.strokeStyle = waveformColor;

    waveformData.forEach((amplitude, index) => {
      const x = index * barWidth;
      const barHeight = Math.abs(amplitude) * (rect.height / 2);
      
      // Draw positive part
      if (amplitude > 0) {
        ctx.fillRect(x, centerY - barHeight, barWidth - 0.5, barHeight);
      }
      
      // Draw negative part
      if (amplitude < 0) {
        ctx.fillRect(x, centerY, barWidth - 0.5, barHeight);
      }
    });

    // Draw center line
    ctx.strokeStyle = '#404040';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(rect.width, centerY);
    ctx.stroke();

  }, [waveformData, isSelected, isMuted]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-24 bg-gray-800 rounded border border-gray-600"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Time markers */}
      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
        <span>0:00</span>
        <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default WaveformDisplay;