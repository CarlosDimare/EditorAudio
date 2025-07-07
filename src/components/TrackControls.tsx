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
    <div className="space-y-6">
      {/* Track Name Header */}
      <div className="border-b border-gray-700 pb-3">
        <h3 className="text-white font-semibold text-base truncate">
          {track.name}
        </h3>
        <div className={`text-xs mt-1 ${track.isSelected ? 'text-blue-400' : 'text-gray-500'}`}>
          {track.isSelected ? 'Selected Track' : 'Click to select'}
        </div>
      </div>

      {/* Solo and Mute Buttons - Organized in dedicated control area */}
      <div className="space-y-3">
        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Track Controls
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSoloToggle();
            }}
            className={`
              px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200
              ${track.isSolo 
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30 hover:bg-yellow-400' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
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
              px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200
              ${track.isMuted 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-400' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }
            `}
          >
            MUTE
          </button>
        </div>
      </div>

      {/* Volume Control - Enhanced design in dedicated area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            Volume
          </h4>
          <span className="text-sm text-white font-mono bg-gray-800 px-2 py-1 rounded">
            {track.volume}%
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={track.volume}
            onChange={(e) => {
              e.stopPropagation();
              onVolumeChange(parseInt(e.target.value));
            }}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer volume-slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${track.volume}%, #374151 ${track.volume}%, #374151 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* Normalize Button - Enhanced functionality */}
      <div className="space-y-3">
        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Audio Processing
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNormalize();
          }}
          className={`
            w-full px-4 py-3 text-sm font-semibold rounded-md transition-all duration-200
            ${track.isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
            }
          `}
          disabled={!track.isSelected}
        >
          {track.isSelected ? 'Normalize Track' : 'Select to Normalize'}
        </button>
      </div>

      {/* Track Information */}
      <div className="space-y-2 pt-4 border-t border-gray-700">
        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Track Info
        </h4>
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-mono">
              {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={`font-medium ${
              track.isMuted ? 'text-red-400' : 
              track.isSolo ? 'text-yellow-400' : 
              'text-green-400'
            }`}>
              {track.isMuted ? 'Muted' : track.isSolo ? 'Solo' : 'Active'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackControls;