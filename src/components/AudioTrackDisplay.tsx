import React, { useState } from 'react';
import AudioTrack from './AudioTrack';
import { Track } from '../types/audio';

const AudioTrackDisplay: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      name: 'Vocal Track',
      volume: 75,
      isMuted: false,
      isSolo: false,
      isSelected: true,
      waveformData: generateWaveformData(),
      duration: 180,
    },
    {
      id: '2',
      name: 'Guitar Lead',
      volume: 60,
      isMuted: false,
      isSolo: false,
      isSelected: false,
      waveformData: generateWaveformData(),
      duration: 180,
    },
    {
      id: '3',
      name: 'Bass Line',
      volume: 80,
      isMuted: true,
      isSolo: false,
      isSelected: false,
      waveformData: generateWaveformData(),
      duration: 180,
    },
    {
      id: '4',
      name: 'Drum Kit',
      volume: 90,
      isMuted: false,
      isSolo: false,
      isSelected: false,
      waveformData: generateWaveformData(),
      duration: 180,
    },
  ]);

  const updateTrack = (trackId: string, updates: Partial<Track>) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === trackId ? { ...track, ...updates } : track
      )
    );
  };

  const selectTrack = (trackId: string) => {
    setTracks(prevTracks =>
      prevTracks.map(track => ({
        ...track,
        isSelected: track.id === trackId,
      }))
    );
  };

  const normalizeTrack = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;

    // Enhanced normalization algorithm
    const maxAbsValue = Math.max(...track.waveformData.map(Math.abs));
    
    if (maxAbsValue === 0) return; // Prevent division by zero
    
    // Target peak level (0.95 to prevent clipping)
    const targetPeak = 0.95;
    const normalizationFactor = targetPeak / maxAbsValue;
    
    // Apply normalization to waveform data
    const normalizedWaveform = track.waveformData.map(value => 
      value * normalizationFactor
    );
    
    // Calculate new volume level based on normalization
    const volumeAdjustment = Math.min(100, Math.round(track.volume * normalizationFactor));
    const newVolume = Math.max(1, volumeAdjustment); // Ensure minimum volume of 1
    
    updateTrack(trackId, { 
      waveformData: normalizedWaveform,
      volume: newVolume
    });

    // Visual feedback for normalization
    console.log(`Track "${track.name}" normalized: ${maxAbsValue.toFixed(3)} → ${targetPeak}, Volume: ${track.volume}% → ${newVolume}%`);
  };

  return (
    <div className="space-y-6">
      {/* Header with track count */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-400">
          <span className="text-sm">
            {tracks.length} tracks • {tracks.filter(t => t.isSelected).length} selected
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Solo: {tracks.filter(t => t.isSolo).length} • 
          Muted: {tracks.filter(t => t.isMuted).length}
        </div>
      </div>

      {/* Track list */}
      {tracks.map((track) => (
        <AudioTrack
          key={track.id}
          track={track}
          onUpdateTrack={updateTrack}
          onSelectTrack={selectTrack}
          onNormalizeTrack={normalizeTrack}
        />
      ))}
    </div>
  );
};

// Enhanced waveform data generation with more realistic patterns
function generateWaveformData(): number[] {
  const data: number[] = [];
  const length = 1200; // Increased resolution for smoother display
  
  for (let i = 0; i < length; i++) {
    // Create more realistic waveform with multiple frequency components
    const baseFreq = Math.sin(i * 0.01) * 0.4;
    const highFreq = Math.sin(i * 0.05) * 0.2;
    const noise = (Math.random() - 0.5) * 0.3;
    const envelope = Math.sin((i / length) * Math.PI) * 0.8; // Fade in/out
    
    const amplitude = (baseFreq + highFreq + noise) * envelope;
    data.push(Math.max(-1, Math.min(1, amplitude))); // Clamp to [-1, 1]
  }
  
  return data;
}

export default AudioTrackDisplay;