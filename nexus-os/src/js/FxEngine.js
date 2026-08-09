import { App } from './AppManager.js';

export const FxEngine = {
    init() {
        // Respect WCAG Reduced Motion settings
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('[FX] Reduced motion requested. Skipping animations.');
            return;
        }

        this.initParticles();
    },

    initParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // 32 particles for mobile optimization
        const count = window.innerWidth < 640 ? 32 : 70;
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: Math.random() * 1.5 + 1
        }));

        function animate() {
            // STOP ANIMATING IF SYSTEM IS PAUSED (Low Power or Tab-Away)
            if (!window._NEXUS_SYSTEM_PAUSED) {
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = '#00F0FF';
                
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > width) p.vx = -p.vx;
                    if (p.y < 0 || p.y > height) p.vy = -p.vy;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
};