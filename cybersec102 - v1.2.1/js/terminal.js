/**
 * NEXUS CLI TERMINAL ENGINE // CYBER BLUE DARK THEME + TYPEWRITER
 */
function initTerminalEngine() {
    const termModal = document.getElementById('term-modal');
    const termWindow = document.getElementById('term-window');
    const termHeader = document.getElementById('term-header');
    const termTrigger = document.getElementById('term-trigger');
    const closeTerm = document.getElementById('close-term');
    const termInput = document.getElementById('term-input');
    const termOutput = document.getElementById('term-output');

    if (!termModal || !termInput || !termOutput) return;

    // 1. OPEN / CLOSE MODAL CONTROLS
    function toggleModal(show) {
        if (show) {
            termModal.classList.remove('opacity-0', 'pointer-events-none');
            termInput.focus();
        } else {
            termModal.classList.add('opacity-0', 'pointer-events-none');
        }
    }

    if (termTrigger) termTrigger.addEventListener('click', () => toggleModal(true));
    if (closeTerm) closeTerm.addEventListener('click', () => toggleModal(false));
    termModal.addEventListener('click', (e) => {
        if (e.target === termModal) toggleModal(false);
    });

    // 2. ULTRA-SMOOTH WINDOW DRAGGING (DESKTOP >= 640px)
    let isDragging = false;
    let dragOffsetX = 0, dragOffsetY = 0;

    if (termHeader && termWindow) {
        termHeader.addEventListener('mousedown', (e) => {
            if (window.innerWidth < 640) return;
            isDragging = true;
            const rect = termWindow.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;

            termWindow.style.position = 'fixed';
            termWindow.style.margin = '0';
            termWindow.style.left = `${rect.left}px`;
            termWindow.style.top = `${rect.top}px`;
            termWindow.style.transition = 'none';
            document.body.style.userSelect = 'none';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const nextLeft = e.clientX - dragOffsetX;
            const nextTop = e.clientY - dragOffsetY;
            termWindow.style.left = `${nextLeft}px`;
            termWindow.style.top = `${nextTop}px`;
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.userSelect = '';
            }
        });
    }

    // 3. COMMAND HISTORY ENGINE
    const cmdHistory = [];
    let historyIndex = -1;

    // 4. CD NAVIGATION WITH 0.6s DELAY
    const pageRoutes = {
        'home': 'index.html',
        '/home': 'index.html',
        'index': 'index.html',
        '/': 'index.html',
        'about': 'about.html',
        '/about': 'about.html',
        'courses': 'courses.html',
        '/courses': 'courses.html',
        'logs': 'logs.html',
        '/logs': 'logs.html',
        'contact': 'contact.html',
        '/contact': 'contact.html',
        'why-cybersec': 'why-cybersec.html',
        'why-me': 'why-me.html'
    };

    function handleCdCommand(destination) {
        const cleanDest = destination ? destination.toLowerCase().trim() : '';
        const targetUrl = pageRoutes[cleanDest] || (cleanDest.endsWith('.html') ? cleanDest : null);
        if (!targetUrl) {
            appendOutput(`cd: no such file or directory: <span class="text-exploitRed font-bold">${destination || 'undefined'}</span>`, false);
            return;
        }
        appendOutput(`<span class="text-yellow-500 font-bold animate-pulse">&gt; [NAVIGATING TO /${cleanDest.replace('.html', '')}...]</span>`, true);
        termInput.disabled = true;
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    }

    // 5. COMMAND REGISTRY (CYBER BLUE & TERMINAL GREEN ACCENTS)
    const commands = {
        help: 'Available commands:<br>&nbsp;&nbsp;<span class="text-termGreen font-bold">whoami</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Print active operator profile<br>&nbsp;&nbsp;<span class="text-termGreen font-bold">cd &lt;page&gt;</span> &nbsp;&nbsp;&nbsp;- Navigate pages (<span class="text-white font-semibold">about, courses, logs, contact, home</span>)<br>&nbsp;&nbsp;<span class="text-termGreen font-bold">status</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Display network &amp; security telemetry<br>&nbsp;&nbsp;<span class="text-termGreen font-bold">boot</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Run system re-initialization sequence<br>&nbsp;&nbsp;<span class="text-termGreen font-bold">clear | cls</span> &nbsp;- Clear terminal display<br>&nbsp;&nbsp;<span class="text-termGreen font-bold">exit</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Close active CLI session',
        whoami: 'goutam@nexus-security <span class="text-white font-bold">[Role: SECURITY_ENGINEER]</span> // <span class="text-termGreen font-bold">Level: ROOT_ACCESS</span>',
        status: 'System Operational // <span class="text-termGreen font-bold">Firewall: ACTIVE</span> | <span class="text-cyberBlue font-bold">Optical Refraction: ENABLED</span> | <span class="text-yellow-500 font-bold">Uplink: SECURED</span>',
        boot: 'Re-initializing security modules... <span class="text-termGreen font-bold">[OK]</span><br>Loading offensive kernels... <span class="text-termGreen font-bold">[OK]</span><br><span class="text-cyberBlue font-bold">System armed.</span>',
        clear: () => { termOutput.innerHTML = ''; return null; },
        cls: () => { termOutput.innerHTML = ''; return null; },
        exit: () => { toggleModal(false); return null; }
    };

    // 6. INPUT KEYDOWN HANDLER
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
                historyIndex++;
                termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                termInput.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                termInput.value = '';
            }
        } else if (e.key === 'Enter' && termInput.value.trim() !== '') {
            const fullCmd = termInput.value.trim();
            cmdHistory.push(fullCmd);
            historyIndex = -1;
            termInput.value = '';

            const echoDiv = document.createElement('div');
            echoDiv.innerHTML = `<span class="text-termGreen font-bold">&gt;_</span> <span class="text-white font-semibold">${fullCmd}</span>`;
            termOutput.appendChild(echoDiv);

            const args = fullCmd.split(' ');
            const primaryCmd = args[0].toLowerCase();
            const param = args[1];

            if (primaryCmd === 'cd' || primaryCmd === 'goto') {
                handleCdCommand(param);
            } else {
                const response = commands[primaryCmd];
                if (typeof response === 'function') {
                    const res = response();
                    if (res) appendOutput(res, true);
                } else if (response) {
                    appendOutput(response, true);
                } else {
                    appendOutput(`Command not found: <span class="text-exploitRed font-bold">${primaryCmd}</span>. Type <span class="text-termGreen font-semibold">'help'</span>.`, true);
                }
            }
            termOutput.scrollTop = termOutput.scrollHeight;
        }
    });

    // 7. HTML-SAFE TYPEWRITER ANIMATION ENGINE
    function appendOutput(html, animate = true) {
        const div = document.createElement('div');
        div.className = 'text-cyberBlue leading-relaxed';
        termOutput.appendChild(div);

        if (!animate) {
            div.innerHTML = html;
            termOutput.scrollTop = termOutput.scrollHeight;
            return;
        }

        const tokens = html.split(/(<[^>]*>)/g);
        let currentHtml = '';
        let tokenIndex = 0;
        let charIndex = 0;

        function typeNext() {
            if (tokenIndex >= tokens.length) {
                termOutput.scrollTop = termOutput.scrollHeight;
                return;
            }

            const token = tokens[tokenIndex];

            if (token.startsWith('<') && token.endsWith('>')) {
                currentHtml += token;
                div.innerHTML = currentHtml;
                tokenIndex++;
                typeNext();
            } else {
                if (charIndex < token.length) {
                    currentHtml += token[charIndex];
                    div.innerHTML = currentHtml;
                    charIndex++;
                    termOutput.scrollTop = termOutput.scrollHeight;
                    setTimeout(typeNext, 8); // 8ms per character
                } else {
                    charIndex = 0;
                    tokenIndex++;
                    typeNext();
                }
            }
        }
        typeNext();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalEngine);
} else {
    initTerminalEngine();
}