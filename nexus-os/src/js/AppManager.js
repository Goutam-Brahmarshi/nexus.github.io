import { AudioManager } from './AudioManager.js';

class AppManager {
    constructor() {
        this.audio = new AudioManager();
        this.originalTitle = document.title;
        this.isLowPower = false;
        
        // Observers / Canvas Registry
        this.pausableProcesses = [];
        this.keyBuffer = '';

        this.initEventListeners();
    }

    initEventListeners() {
        // Tab-away Easter Egg & Loop Pausing (Performance/Security Audit Request)
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                document.title = "[!] INTRUSION_DETECTED - " + this.originalTitle;
                this.pauseHeavyLoops();
            } else {
                document.title = this.originalTitle;
                this.resumeHeavyLoops();
            }
        });

        // Smart Link Interceptor (Allows opening tabs)
        document.body.addEventListener("click", (e) => {
            const anchor = e.target.closest('a');
            if (!anchor || anchor.target === '_blank') return;
            if (e.ctrlKey || e.metaKey || e.button === 1) return; // Ignore modifiers
            
            const href = anchor.getAttribute('href');
            if (href && href.endsWith('.html')) {
                e.preventDefault();
                this.audio.play('success');
                document.getElementById('glitch-transition-overlay')?.classList.add('active');
                setTimeout(() => window.location.href = href, 450);
            }
        });

        // Patched Keydown Cheat Buffer (Doesn't block user input typing!)
        window.addEventListener('keydown', (e) => {
            // BUG FIX: Prevent buffer matching when user is typing in forms/terminal
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return; 
            
            this.keyBuffer += e.key.toLowerCase();
            if (this.keyBuffer.length > 50) this.keyBuffer = this.keyBuffer.slice(-50);
            
            if (this.keyBuffer.includes('root') || this.keyBuffer.includes('sudo')) {
                alert(`ROOT GRANTED: MENTION CODE [PERSONAL_INFO: Promocode] TO INSTRUCTOR.`);
                this.keyBuffer = ''; // Reset
            }
        });
    }

    registerProcess(loopFunc) {
        this.pausableProcesses.push(loopFunc);
    }

    pauseHeavyLoops() {
        // Pausing particles, CRT generation etc. to save battery
        window._NEXUS_SYSTEM_PAUSED = true; 
    }

    resumeHeavyLoops() {
        window._NEXUS_SYSTEM_PAUSED = false;
    }

    toggleLowPowerMode() {
        this.isLowPower = !this.isLowPower;
        document.body.classList.toggle('low-power-mode', this.isLowPower);
        if (this.isLowPower) {
            this.pauseHeavyLoops();
        } else {
            this.resumeHeavyLoops();
        }
    }
}

export const App = new AppManager();