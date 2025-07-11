export class Delay {
    private delayTime: number; // in seconds
    private feedback: number; // feedback level

    constructor(delayTime: number = 0.5, feedback: number = 0.5) {
        this.delayTime = delayTime;
        this.feedback = feedback;
    }

    setDelayTime(time: number): void {
        this.delayTime = time;
    }

    setFeedback(feedback: number): void {
        this.feedback = feedback;
    }

    getDelayTime(): number {
        return this.delayTime;
    }

    getFeedback(): number {
        return this.feedback;
    }

    applyEffect(audioContext: AudioContext, source: AudioBufferSourceNode): AudioBufferSourceNode {
        const delayNode = audioContext.createDelay();
        delayNode.delayTime.value = this.delayTime;

        const feedbackGain = audioContext.createGain();
        feedbackGain.gain.value = this.feedback;

        source.connect(delayNode);
        delayNode.connect(feedbackGain);
        feedbackGain.connect(delayNode); // Feedback loop
        feedbackGain.connect(audioContext.destination); // Output to destination

        return source;
    }
}