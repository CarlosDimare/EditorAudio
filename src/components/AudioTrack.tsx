import React from 'react';
import TrackControls from './TrackControls';
import WaveformDisplay from './WaveformDisplay';
import { Track } from '../types/audio';

interface AudioTrackProps {
  track: Track;
  onUpdateTrack: (trackId: string, updates: Partial<Track>) => void;
  onSelectTrack: (trackId: string) => void;
  onNormalizeTrack: (trackId: string) => void;
}

const AudioTrack: React.FC<AudioTrackProps> = ({
  track,
  onUpdateTrack,
  onSelectTrack,
  onNormalizeTrack,
}) => {
  const handleVolumeChange = (volume: number) => {
    onUpdateTrack(track.id, { volume });
  };

  const handleMuteToggle = () => {
    onUpdateTrack(track.id, { isMuted: !track.isMuted });
  };

  const handleSoloToggle = () => {
    onUpdateTrack(track.id, { isSolo: !track.isSolo });
  };

  const handleTrackSelect = () => {
    onSelectTrack(track.id);
  };

  const handleNormalize = () => {
    onNormalizeTrack(track.id);
  };

  return (
    <div 
      className={`
        bg-track-bg border border-track-border rounded-lg overflow-hidden
        transition-all duration-200 hover:border-gray-500
        ${track.isSelected ? 'ring-2 ring-blue-500 border-blue-500' : ''}
      `}
      onClick={handleTrackSelect}
    >
      <div className="flex">
        {/* Left Controls Column */}
        <div className="w-64 bg-control-bg border-r border-control-border p-4 flex-shrink-0">
          <TrackControls
            track={track}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={handleMuteToggle}
            onSoloToggle={handleSoloToggle}
            onNormalize={handleNormalize}
          />
        </div>

        {/* Timeline Area */}
        <div className="flex-1 p-4">
          <div className="space-y-3">
            {/* Waveform Display */}
            <WaveformDisplay
              waveformData={track.waveformData}
              isSelected={track.isSelected}
              isMuted={track.isMuted}
              duration={track.duration}
            />
            
            {/* Track Label positioned below waveform */}
            <div className="text-sm text-gray-300 font-medium pl-2">
              {track.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTrack;