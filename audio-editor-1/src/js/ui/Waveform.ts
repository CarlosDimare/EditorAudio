// filepath: /audio-editor/audio-editor/src/js/ui/Waveform.ts

export class Waveform {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;
    }

    public drawWaveform(data: Float32Array) {
        const width = this.canvas.width;
        const height = this.canvas.height;
        this.context.clearRect(0, 0, width, height);
        this.context.beginPath();

        const sliceWidth = width / data.length;
        let x = 0;

        for (let i = 0; i < data.length; i++) {
            const v = data[i] * 0.5; // Normalize to canvas height
            const y = (1 + v) * height / 2;

            if (i === 0) {
                this.context.moveTo(x, y);
            } else {
                this.context.lineTo(x, y);
            }
            x += sliceWidth;
        }

        this.context.lineTo(width, height / 2);
        this.context.strokeStyle = '#ffffff';
        this.context.stroke();
    }
}