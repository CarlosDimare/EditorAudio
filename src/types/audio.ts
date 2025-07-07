export interface Track {
  id: string;
  name: string;
  volume: number;
  isMuted: boolean;
  isSolo: boolean;
  isSelected: boolean;
  waveformData: number[];
  duration: number; // in seconds
}

export interface AudioProject {
  id: string;
  name: string;
  tracks: Track[];
  sampleRate: number;
  bitDepth: number;
}