/**
 * NEXUS BOOT LOADER & BACKGROUND PARTICLE ENGINE
 * Optimized with 32 particles on mobile screens for 60 FPS performance.
 */

function initBootSequence() {
    const cryptoWrapper = document.getElementById('crypto-preloader');
    const loaderWrapper = document.getElementById('loader-wrapper');

    if (!cryptoWrapper || !loaderWrapper) return;

    const navEntries = window.performance && window.performance.getEntriesByType && window.performance.getEntriesByType("navigation");
    const navType = navEntries && navEntries.length > 0 ? navEntries[0].type : '';
    const isReload = (navType === 'reload' || navType === 1);
    const hasBooted = sessionStorage.getItem('nexus_booted') === 'true';

    if (hasBooted && !isReload) {
        cryptoWrapper.style.display = 'none';
        loaderWrapper.style.display = 'none';
        window.nexusBootCompleted = true;
        window.dispatchEvent(new CustomEvent('nexus:bootComplete'));
        return;
    }

    cryptoWrapper.style.display = 'block';
    const cryptoCanvas = document.getElementById('crypto-canvas');
    
    if (cryptoCanvas) {
        const cCtx = cryptoCanvas.getContext('2d');
        cryptoCanvas.width = window.innerWidth;
        cryptoCanvas.height = window.innerHeight;
        const hex = '0123456789ABCDEFxX';
        const fontSize = 14;
        const columns = Math.floor(cryptoCanvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function drawCrypto() {
            cCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            cCtx.fillRect(0, 0, cryptoCanvas.width, cryptoCanvas.height);
            cCtx.fillStyle = '#FFFFFF';
            cCtx.font = fontSize + 'px monospace';
            for (let i = 0; i < drops.length; i++) {
                const text = hex.charAt(Math.floor(Math.random() * hex.length));
                cCtx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > cryptoCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        const cryptoInterval = setInterval(drawCrypto, 33);

        setTimeout(() => cryptoWrapper.classList.add('glitch-effect'), 700);
        setTimeout(() => {
            clearInterval(cryptoInterval);
            cryptoWrapper.style.display = 'none';
            loaderWrapper.style.display = 'flex';
            startMainLoadingBar();
        }, 1300);
    }

    function startMainLoadingBar() {
        const loaderText = document.getElementById('loader-text');
        const progressFill = document.getElementById('progress-fill');
        let progress = 0;
        
        const loaderInterval = setInterval(() => {
            progress++;
            if (progressFill) progressFill.style.width = progress + '%';
            if (loaderText) {
                if (progress === 1) loaderText.innerText = "> LOADING_PROGRAM_FILES_X86...";
                else if (progress === 25) loaderText.innerText = "> SPAWNING_METERPRETTER_SESSION...";
                else if (progress === 50) loaderText.innerText = "> AUTHENTICATING_USER_CREDENTIALS...";
                else if (progress === 75) loaderText.innerText = "> CONFIRMED_HUMAN...";
                else if (progress === 100) loaderText.innerText = "> WELCOME_TO_THE_FUTURE";
            }
            if (progress >= 100) {
                clearInterval(loaderInterval);
                setTimeout(() => {
                    loaderWrapper.style.opacity = '0';
                    setTimeout(() => {
                        loaderWrapper.style.display = 'none';
                        sessionStorage.setItem('nexus_booted', 'true');
                        window.nexusBootCompleted = true;
                        window.dispatchEvent(new CustomEvent('nexus:bootComplete'));
                    }, 800);
                }, 500);
            }
        }, 30);
    }
}

// ==========================================
// BACKGROUND PARTICLES ENGINE
// ==========================================
function initBackgroundParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 1.5 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#00F0FF';
            ctx.fill();
        }
    }

    function initParticles() {
        // REDUCE PARTICLE COUNT ON MOBILE (32 PARTICLES ON < 640px)
        const isMobile = window.innerWidth < 640;
        const count = isMobile ? 32 : Math.min(Math.floor(window.innerWidth / 15), 70);
        particles = Array.from({ length: count }, () => new Particle());
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.3 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.75;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

function runWhenReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

runWhenReady(() => {
    try {
        initBootSequence();
    } catch (e) {
        console.error("[NEXUS_ERR] Boot sequence error:", e);
        window.nexusBootCompleted = true;
        window.dispatchEvent(new CustomEvent('nexus:bootComplete'));
    }
    try {
        initBackgroundParticles();
    } catch (e) {
        console.error("[NEXUS_ERR] Particle engine error:", e);
    }
});