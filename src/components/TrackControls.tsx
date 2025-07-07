import React from 'react';
import { Track } from '../types/audio';

interface TrackControlsProps {
  track: Track;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onSoloToggle: () => void;
  onNormalize: () => void;
}

const TrackControls: React.FC<TrackControlsProps> = ({
  track,
  onVolumeChange,
  onMuteToggle,
  onSoloToggle,
  onNormalize,
}) => {
  return (
    <div className="space-y-4">
      {/* Track Name */}
      <div className="text-white font-semibold text-sm truncate">
        {track.name}
      </div>

      {/* Solo and Mute Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSoloToggle();
          }}
          className={`
            px-3 py-1 text-xs font-medium rounded transition-colors
            ${track.isSolo 
              ? 'bg-yellow-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }
          `}
        >
          SOLO
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMuteToggle();
          }}
          className={`
            px-3 py-1 text-xs font-medium rounded transition-colors
            ${track.isMuted 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }
          `}
        >
          MUTE
        </button>
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400 block">Volume</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="100"
            value={track.volume}
            onChange={(e) => {
              e.stopPropagation();
              onVolumeChange(parseInt(e.target.value));
            }}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-xs text-gray-400 w-8 text-right">
            {track.volume}
          </span>
        </div>
      </div>

      {/* Normalize Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNormalize();
        }}
        className="
          w-full px-3 py-2 text-xs font-medium rounded
          bg-blue-600 text-white hover:bg-blue-700
          transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        disabled={!track.isSelected}
      >
        Normalize
      </button>

      {/* Track Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <div>Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</div>
        <div className={`${track.isSelected ? 'text-blue-400' : ''}`}>
          {track.isSelected ? 'Selected' : 'Click to select'}
        </div>
      </div>
    </div>
  );
};

export default TrackControls;