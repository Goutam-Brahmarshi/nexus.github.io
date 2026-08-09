/**
 * NEXUS BRAND GLITCH & ROLE SCRAMBLE ENGINE
 * Automatically removes long titles ('FORENSIC INVESTIGATOR') on small mobile screens.
 */

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{} =+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="text-termGreen">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

function initBrandEffects() {
    const glitchElement = document.getElementById('glitch-name');
    const roleElement = document.getElementById('scramble-text');
    const cypherHeading = document.getElementById('cypher-heading');

    if (cypherHeading && cypherHeading.dataset.text) {
        const triggerHeroScramble = () => {
            new TextScramble(cypherHeading).setText(cypherHeading.dataset.text);
        };

        if (window.nexusBootCompleted) {
            setTimeout(triggerHeroScramble, 100);
        } else {
            window.addEventListener('nexus:bootComplete', triggerHeroScramble, { once: true });
        }
    }

    if (glitchElement) {
        let hoverInterval = null;
        setInterval(() => {
            if (!glitchElement.classList.contains('is-hovered')) {
                glitchElement.classList.add('is-glitching');
                setTimeout(() => glitchElement.classList.remove('is-glitching'), 400);
            }
        }, 2000);

        glitchElement.addEventListener('mouseenter', () => {
            glitchElement.classList.add('is-hovered');
            glitchElement.classList.remove('is-glitching');
            hoverInterval = setInterval(() => {
                const top1 = Math.floor(Math.random() * 80);
                const bottom1 = Math.floor(Math.random() * (100 - top1));
                const top2 = Math.floor(Math.random() * 80);
                const bottom2 = Math.floor(Math.random() * (100 - top2));
                const shiftXBefore = (Math.random() * 30 - 15).toFixed(1);
                const shiftYBefore = (Math.random() * 10 - 5).toFixed(1);
                const shiftXAfter = (Math.random() * 30 - 15).toFixed(1);
                const shiftYAfter = (Math.random() * 10 - 5).toFixed(1);
                glitchElement.style.setProperty('--clip-before', `inset(${top1}% 0 ${bottom1}% 0)`);
                glitchElement.style.setProperty('--clip-after', `inset(${top2}% 0 ${bottom2}% 0)`);
                glitchElement.style.setProperty('--shift-x-before', `${shiftXBefore}px`);
                glitchElement.style.setProperty('--shift-y-before', `${shiftYBefore}px`);
                glitchElement.style.setProperty('--shift-x-after', `${shiftXAfter}px`);
                glitchElement.style.setProperty('--shift-y-after', `${shiftYAfter}px`);
                const mainJitterX = (Math.random() * 6 - 3).toFixed(1);
                const mainJitterY = (Math.random() * 4 - 2).toFixed(1);
                glitchElement.style.transform = `scale(1.04) translate(${mainJitterX}px, ${mainJitterY}px) skewX(${(Math.random() * 6 - 3).toFixed(1)}deg)`;
            }, 40);
        });

        glitchElement.addEventListener('mouseleave', () => {
            clearInterval(hoverInterval);
            glitchElement.classList.remove('is-hovered');
            glitchElement.removeAttribute('style');
        });
    }

    if (roleElement) {
        let titles = [
            "SECURITY ENGINEER",
            "SECURITY ANALYST",
            "SECURITY RESEARCHER",
            "SECURITY ARCHITECT",
            "FORENSIC INVESTIGATOR",
            "PENETRATION TESTER",
            "INCIDENT RESPONDER",
            "ETHICAL HACKER",
            "MALWARE ANALYST"
        ];

        // REMOVE LONG TITLE ON MOBILE PHONES (< 640px)
        if (window.innerWidth < 640) {
            titles = titles.filter(t => t !== "FORENSIC INVESTIGATOR");
        }

        let titleIndex = 0;
        const roleFx = new TextScramble(roleElement);

        const runCycle = () => {
            roleFx.setText('0110 1011 0011').then(() => {
                setTimeout(() => {
                    titleIndex = (titleIndex + 1) % titles.length;
                    roleFx.setText(titles[titleIndex]);
                }, 800);
            });
        };

        roleFx.setText(titles[titleIndex]);
            setInterval(runCycle, 4000);
        }
    } // <-- ADD THIS MISSING BRACE TO CLOSE initBrandEffects()

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBrandEffects);
    } else {
        initBrandEffects();
    }