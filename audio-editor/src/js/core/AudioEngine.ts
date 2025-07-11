// filepath: /audio-editor/src/js/core/AudioEngine.ts

export class AudioEngine {
    private audioContext: AudioContext;
    private currentSource: AudioBufferSourceNode | null = null;

    constructor() {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    async loadAudio(url: string): Promise<AudioBuffer> {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return this.audioContext.decodeAudioData(arrayBuffer);
    }

    play(buffer: AudioBuffer): void {
        this.stop(); // Stop any currently playing audio
        this.currentSource = this.audioContext.createBufferSource();
        this.currentSource.buffer = buffer;
        this.currentSource.connect(this.audioContext.destination);
        this.currentSource.start(0);
    }

    pause(): void {
        if (this.audioContext.state === 'running') {
            this.audioContext.suspend();
        }
    }

    stop(): void {
        if (this.currentSource) {
            this.currentSource.stop();
            this.currentSource = null;
        }
        this.audioContext.close();
    }
}