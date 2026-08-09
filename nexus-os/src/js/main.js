// This centralizes CSS and JS into a single bundle
import '../css/nexus.css';
import { App } from './AppManager.js';
import { initSecureTerminal } from './TerminalUI.js';
import { FxEngine } from './FxEngine.js';
import { BadgeHUD } from './Achievements.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Base Logic
    initSecureTerminal();
    
    // 2. Init Audio (Awaiting User Interaction)
    document.body.addEventListener('click', () => {
        // Ensure Audio context unlocks on first interaction
        if(window.NEXUS_INIT !== true) {
            App.audio.play('hover'); // Initial test
            window.NEXUS_INIT = true;
        }
    }, { once: true });

    // 3. Init Effects and Badges
    FxEngine.init();
    BadgeHUD.checkPageVisit();
});