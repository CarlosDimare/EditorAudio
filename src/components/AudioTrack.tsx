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
        bg-gray-800 border border-gray-600 rounded-lg overflow-hidden
        transition-all duration-200 hover:border-gray-500
        ${track.isSelected ? 'ring-2 ring-blue-400 border-blue-400 shadow-lg shadow-blue-400/20' : ''}
      `}
      onClick={handleTrackSelect}
    >
      <div className="flex">
        {/* Left Controls Column - Dedicated area for all controls */}
        <div className="w-72 bg-gray-900 border-r border-gray-600 p-5 flex-shrink-0">
          <TrackControls
            track={track}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={handleMuteToggle}
            onSoloToggle={handleSoloToggle}
            onNormalize={handleNormalize}
          />
        </div>

        {/* Timeline Area - Clean separation from controls */}
        <div className="flex-1 p-6 bg-gray-850">
          <div className="space-y-4">
            {/* Waveform Display */}
            <WaveformDisplay
              waveformData={track.waveformData}
              isSelected={track.isSelected}
              isMuted={track.isMuted}
              duration={track.duration}
            />
            
            {/* Track Label positioned directly below waveform */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              <div className="text-sm text-gray-300 font-medium">
                {track.name}
              </div>
              <div className="text-xs text-gray-500">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTrack;