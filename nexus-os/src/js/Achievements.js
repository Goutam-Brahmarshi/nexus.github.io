import { App } from './AppManager.js';

export const BadgeHUD = {
    checkPageVisit() {
        let visits = JSON.parse(localStorage.getItem('nexus_visited_pages')) || [];
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (!visits.includes(currentPage)) {
            visits.push(currentPage);
            localStorage.setItem('nexus_visited_pages', JSON.stringify(visits));
        }

        // Achievement: Explorer (Visited 3 unique pages)
        const hasExplorerBadge = localStorage.getItem('nexus_badge_explorer') === 'true';
        if (visits.length >= 3 && !hasExplorerBadge) {
            localStorage.setItem('nexus_badge_explorer', 'true');
            this.showToast("ACHIEVEMENT UNLOCKED: Digital Explorer (3 Data Nodes accessed)");
            App.audio.play('success');
        }
    },

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-bgDark border-2 border-termGreen px-6 py-3 font-mono text-xs text-termGreen z-[9999] opacity-0 transition-opacity duration-300';
        toast.textContent = `> ${message}`;
        document.body.appendChild(toast);

        // Fade in
        requestAnimationFrame(() => toast.style.opacity = '1');

        // Fade out
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
};