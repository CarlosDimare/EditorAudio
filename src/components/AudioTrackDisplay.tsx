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
    if (track) {
      // Simulate normalization by adjusting waveform data
      const normalizedWaveform = track.waveformData.map(value => {
        const maxValue = Math.max(...track.waveformData.map(Math.abs));
        return maxValue > 0 ? (value / maxValue) * 0.95 : value;
      });
      
      updateTrack(trackId, { 
        waveformData: normalizedWaveform,
        volume: 85 // Set to a normalized volume level
      });
    }
  };

  return (
    <div className="space-y-4">
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

// Generate sample waveform data
function generateWaveformData(): number[] {
  const data: number[] = [];
  for (let i = 0; i < 1000; i++) {
    const amplitude = Math.random() * 0.8 - 0.4;
    const frequency = Math.sin(i * 0.02) * 0.3;
    data.push(amplitude + frequency);
  }
  return data;
}

export default AudioTrackDisplay;