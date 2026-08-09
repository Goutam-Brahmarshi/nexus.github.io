/**
 * NEXUS SYNCHRONOUS COMPONENT ENGINE
 * Configured with Android-friendly bottom navbar, icons-only mobile dock, and full-screen mobile CLI.
 */

const NexusComponents = {
    // 1. TOP-LEFT BRAND & SCRAMBLE SUBTITLE
    brand: `
        <div class="brand-container">
            <div class="glitch" id="glitch-name" data-text="NEXUS">NEXUS</div>
            <div class="brand-title" id="scramble-text">SECURITY ENGINEER</div>
        </div>
    `,

    // 2. UBUNTU DOCK (HORIZONTAL ON MOBILE, ICONS ONLY ON < 640px)
    navbar: `
        <nav aria-label="System OS Dock" class="fixed right-6 top-1/2 -translate-y-1/2 z-40 bg-bgDark/50 backdrop-blur-xl border border-cyberBlue/30 rounded-2xl py-4 px-2.5 shadow-[0_0_35px_rgba(0,0,0,0.8)] flex flex-col items-center gap-5 transition-all duration-300 hover:border-cyberBlue/60 responsive-dock">
            <button id="term-trigger" aria-label="Open CLI Application" class="group flex flex-col items-center gap-1.5 focus:outline-none">
                <div class="w-10 h-10 rounded-xl bg-black/60 border border-gray-800 group-hover:border-cyberBlue group-hover:bg-cyberBlue/10 flex items-center justify-center transition-all">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-cyberBlue group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <span class="font-mono text-[10px] tracking-widest text-gray-400 group-hover:text-cyberBlue transition-colors hidden sm:inline-block">/terminal</span>
            </button>
            <a href="index.html" data-nav-link="index.html" class="group flex flex-col items-center gap-1.5">
                <div class="w-10 h-10 rounded-xl bg-black/60 border border-gray-800 group-hover:border-cyberBlue group-hover:bg-cyberBlue/10 flex items-center justify-center transition-all">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-cyberBlue group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <span class="font-mono text-[10px] tracking-widest text-gray-400 group-hover:text-cyberBlue transition-colors hidden sm:inline-block">/home</span>
            </a>
            <a href="about.html" data-nav-link="about.html" class="group flex flex-col items-center gap-1.5">
                <div class="w-10 h-10 rounded-xl bg-black/60 border border-gray-800 group-hover:border-termGreen group-hover:bg-termGreen/10 flex items-center justify-center transition-all">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-termGreen group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <span class="font-mono text-[10px] tracking-widest text-gray-400 group-hover:text-termGreen transition-colors hidden sm:inline-block">/about</span>
            </a>
            <a href="courses.html" data-nav-link="courses.html" class="group flex flex-col items-center gap-1.5">
                <div class="w-10 h-10 rounded-xl bg-black/60 border border-gray-800 group-hover:border-cyberBlue group-hover:bg-cyberBlue/10 flex items-center justify-center transition-all">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-cyberBlue group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <span class="font-mono text-[10px] tracking-widest text-gray-400 group-hover:text-cyberBlue transition-colors hidden sm:inline-block">/courses</span>
            </a>
            <a href="logs.html" data-nav-link="logs.html" class="group flex flex-col items-center gap-1.5">
                <div class="w-10 h-10 rounded-xl bg-black/60 border border-gray-800 group-hover:border-yellow-500 group-hover:bg-yellow-500/10 flex items-center justify-center transition-all">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <span class="font-mono text-[10px] tracking-widest text-gray-400 group-hover:text-yellow-500 transition-colors hidden sm:inline-block">/logs</span>
            </a>
            <a href="contact.html" data-nav-link="contact.html" class="group flex flex-col items-center gap-1.5">
                <div class="w-10 h-10 rounded-xl bg-black/60 border border-gray-800 group-hover:border-exploitRed group-hover:bg-exploitRed/10 flex items-center justify-center transition-all">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-exploitRed group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span class="font-mono text-[10px] tracking-widest text-gray-400 group-hover:text-exploitRed transition-colors hidden sm:inline-block">/contact</span>
            </a>
        </nav>
    `,

    // 3. SYSTEM STATUS WIDGET & TRIGGER (TOP-RIGHT MOBILE, BOTTOM-LEFT DESKTOP)
    sysStatus: `
        <div id="sys-trigger" onclick="toggleSysMon()" class="cyber-hud-btn-wrapper top-6 right-4 sm:top-auto sm:right-auto sm:bottom-6 sm:left-6">
            <div class="cyber-hud-btn">
                <span class="status-led"></span>
                SYS STATUS
            </div>
        </div>
        <div id="sys-widget" class="fixed top-20 right-4 sm:top-auto sm:right-auto sm:bottom-20 sm:left-6 w-72 optical-lens rounded-xl p-4 z-40 font-mono hidden border border-cyberBlue/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all">
            <div class="flex items-center justify-between border-b border-gray-800 pb-2 mb-3 text-xs text-gray-400">
                <span class="text-white font-bold">// SYS_MONITOR_v2.4</span>
                <button onclick="toggleSysMon()" class="hover:text-exploitRed transition-colors font-bold">[X]</button>
            </div>
            <canvas id="sys-graph" class="w-full h-12 bg-black/80 border border-gray-800 rounded mb-3"></canvas>
            <div class="space-y-1.5 text-xs text-gray-300">
                <div class="flex justify-between"><span>SYS_LOAD:</span> <span id="sys-load" class="text-termGreen font-bold">12%</span></div>
                <div class="flex justify-between"><span>DOWNLINK:</span> <span id="encryption-val" class="text-cyberBlue font-bold">100 Mbps</span></div>
                <div class="flex justify-between"><span>NET_SOURCE:</span> <span id="net-source" class="text-white font-bold">RESOLVING...</span></div>
                <div class="flex justify-between"><span>MEMORY:</span> <span id="ram-val" class="text-yellow-500 font-bold">N/A</span></div>
            </div>
            <button id="mitigate-btn" onclick="runMitigation()" class="w-full mt-4 bg-exploitRed/10 border border-exploitRed text-exploitRed hover:bg-exploitRed hover:text-black py-1.5 rounded font-bold text-xs tracking-widest uppercase transition-all box-glow-red">[ MITIGATE THREATS ]</button>
        </div>
    `,

    // 4. CLI TERMINAL MODAL (NEXUS CYBER BLUE DARK THEME)
    terminal: `
        <div id="term-modal" class="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-bgDark/80 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300">
            <div id="term-window" class="w-full h-full sm:h-[420px] sm:max-w-2xl nexus-terminal-window rounded-none sm:rounded-xl overflow-hidden flex flex-col relative">
                <div id="term-header" class="nexus-terminal-header px-4 py-3 sm:py-2.5 flex items-center justify-between font-mono text-xs cursor-move">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-cyberBlue animate-ping inline-block mr-1"></span>
                        <span class="font-bold tracking-wider text-cyberBlue">goutam@nexus-security:~# cli-subsystem</span>
                    </div>
                    <button id="close-term" aria-label="Close Terminal" class="text-gray-400 hover:text-exploitRed hover:drop-shadow-[0_0_8px_rgba(255,0,60,0.8)] font-mono font-bold text-sm tracking-widest px-2 transition-all cursor-pointer">
                        [X]
                    </button>
                </div>
                <div id="term-output" class="p-4 font-mono text-xs sm:text-sm text-cyberBlue flex-1 overflow-y-auto nexus-scroll space-y-1.5">
                    <div class="font-bold text-white">NexusSec OS v4.88 (x86_64-pc-linux-gnu)</div>
                    <div>Type <span class="text-termGreen font-semibold">'help'</span> for a list of available commands.</div>
                    <div class="text-gray-600">----------------------------------------------------</div>
                </div>
                <div class="p-3 nexus-terminal-input-bar font-mono text-xs sm:text-sm flex items-center gap-2">
                    <span class="text-termGreen font-bold">&gt;_</span>
                    <input id="term-input" type="text" autocomplete="off" spellcheck="false" placeholder="Enter command..." class="w-full bg-transparent text-white focus:outline-none placeholder-gray-600 font-mono font-medium" />
                    <span class="nexus-box-cursor"></span>
                </div>
            </div>
        </div>
    `,

    // 5. MATRIX BOOT LOADER
    loader: `
        <div id="crypto-preloader"><canvas id="crypto-canvas"></canvas></div>
        <div id="loader-wrapper">
            <div class="loader-container">
                <div class="loader-log" id="loader-text">&gt; SYSTEM_BOOT_SEQUENCE_INITIATED...</div>
                <div class="progress-bar-shell"><div class="progress-bar-fill" id="progress-fill"></div></div>
                <div class="secure-boot">SECURE_BOOT_VERIFIED</div>
            </div>
        </div>
    `,

    init: function() {
        const insert = (id, html) => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = html;
        };

        insert('loader-root', this.loader);
        insert('brand-root', this.brand);
        insert('navbar-root', this.navbar);
        insert('status-root', this.sysStatus);
        insert('terminal-root', this.terminal);

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const activeLink = document.querySelector(`nav a[data-nav-link="${currentPath}"]`);
        if (activeLink) {
            const iconBox = activeLink.querySelector('div');
            const textSpan = activeLink.querySelector('span');
            if (iconBox) iconBox.className = "w-10 h-10 rounded-xl bg-cyberBlue/10 border border-cyberBlue flex items-center justify-center transition-all box-glow-blue scale-105";
            if (textSpan) textSpan.className = "font-mono text-[10px] tracking-widest text-cyberBlue transition-colors font-bold hidden sm:inline-block";
        }

        window.dispatchEvent(new CustomEvent('nexus:componentsLoaded'));
    }
};

NexusComponents.init();