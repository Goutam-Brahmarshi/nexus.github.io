export class AudioManager {
    constructor() {
        this.muted = localStorage.getItem('nexus_muted') === 'true' || true; // Default mute to respect autoplay rules
        this.tracks = {
            hover: '[AUDIO_PLACEHOLDER: ui_hover_blip.mp3]',
            type: '[AUDIO_PLACEHOLDER: mechanical_keystroke.mp3]',
            boot: '[AUDIO_PLACEHOLDER: synth_power_on.mp3]',
            success: '[AUDIO_PLACEHOLDER: success_chime.mp3]',
            error: '[AUDIO_PLACEHOLDER: error_buzz.mp3]'
        };
    }

    play(track) {
        if (this.muted) return;
        // Prefer reduced motion check usually overlaps with people disliking sudden noises
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Dummy implementation for future expansion
        console.log(`[Audio Event]: Playing ${this.tracks[track]}`);
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('nexus_muted', this.muted);
        return this.muted;
    }
}