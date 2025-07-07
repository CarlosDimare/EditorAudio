/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'track-bg': '#2a2a2a',
        'track-border': '#404040',
        'waveform': '#4ade80',
        'waveform-selected': '#22c55e',
        'control-bg': '#1f1f1f',
        'control-border': '#333333',
      }
    },
  },
  plugins: [],
}