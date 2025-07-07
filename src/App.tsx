import React from 'react';
import AudioTrackDisplay from './components/AudioTrackDisplay';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Audio Track Editor</h1>
        <AudioTrackDisplay />
      </div>
    </div>
  );
}

export default App;