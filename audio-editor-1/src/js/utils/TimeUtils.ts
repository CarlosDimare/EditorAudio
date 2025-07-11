// filepath: /audio-editor/audio-editor/src/js/utils/TimeUtils.ts

export function secondsToMilliseconds(seconds: number): number {
    return seconds * 1000;
}

export function millisecondsToSeconds(milliseconds: number): number {
    return milliseconds / 1000;
}

export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}