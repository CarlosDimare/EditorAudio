// filepath: /audio-editor/audio-editor/src/js/effects/Compressor.ts

export class Compressor {
    private threshold: number;
    private ratio: number;

    constructor() {
        this.threshold = -24; // Default threshold in dB
        this.ratio = 4; // Default ratio
    }

    setThreshold(value: number): void {
        this.threshold = value;
    }

    setRatio(value: number): void {
        this.ratio = value;
    }

    process(input: Float32Array): Float32Array {
        const output = new Float32Array(input.length);
        for (let i = 0; i < input.length; i++) {
            if (input[i] > this.threshold) {
                output[i] = this.threshold + (input[i] - this.threshold) / this.ratio;
            } else {
                output[i] = input[i];
            }
        }
        return output;
    }
}