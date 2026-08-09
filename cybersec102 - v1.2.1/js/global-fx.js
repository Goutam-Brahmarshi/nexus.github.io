/**
 * GOUTAM // GLOBAL FX & SYSTEMS CONTROLLER
 * Handles: Page Transitions, Power Management, OG Tags, and Easter Eggs
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. OPEN GRAPH (SOCIAL) META TAGS
       ========================================== */
    const head = document.head;
    const ogTags = `
        <meta property="og:title" content="GOUTAM // THE NEXUS MINDSET">
        <meta property="og:description" content="Elite Cybersecurity Operations & Training. Learn to break systems and build defenses.">
        <meta property="og:image" content="assets/hacker-preview.png">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
    `;
    head.insertAdjacentHTML('beforeend', ogTags);


    /* ==========================================
       2. CONSOLE ASCII ART (THE BANANA EASTER EGG)
       ========================================== */
    const banana = `
      //\\
      V  \\
       \\  \\_
        \\,'.\`-.
         |\\ \`. \`.
         ( \\  \`. \`-.                        _,.-:\\
          \\ \\   \`.  \`-._             __..--' ,-';/
           \\ \`.   \`-.   \`-..___..---'   _.--' ,'/
            \`. \`.    \`-._        __..--'    ,' /
              \`. \`-_     \`\`--..''       _.-' ,'
                \`-_ \`-.___        __,--'   ,'
                   \`-.__  \`----"""    __.-'
                        \`--..____..--'
    `;
    console.log("%c" + banana, "color: #EAB308; font-family: monospace; font-weight: bold;");
    console.log("%c[!] ROOT ACCESS DETECTED. AUTHORIZED PERSONNEL ONLY.", "color: #FF003C; font-size: 16px; font-weight: bold;");
    console.log("%cUse clearance code BANANA15 at checkout for 15% off all tactical operations.", "color: #00FF66; font-size: 14px;");


    /* ==========================================
       3. LOW POWER MODE (GPU PROTECTION)
       ========================================== */
    let isLowPower = false;
    
    // Inject the heavy CSS disable rules
    const lpmStyle = document.createElement('style');
    lpmStyle.innerHTML = `
        body.low-power-mode * {
            box-shadow: none !important;
            text-shadow: none !important;
            backdrop-filter: none !important;
            animation: none !important;
            transition: none !important;
        }
        body.low-power-mode canvas, 
        body.low-power-mode .ambient-blob-1, 
        body.low-power-mode .ambient-blob-2,
        body.low-power-mode .crt-overlay {
            display: none !important;
        }
    `;
    document.head.appendChild(lpmStyle);

    function toggleLowPower() {
        isLowPower = !isLowPower;
        const desktopDot = document.getElementById('lpm-dot-desktop');
        const desktopText = document.getElementById('lpm-text-desktop');
        const mobileBtn = document.getElementById('lpm-mobile-btn');
        
        if(isLowPower) {
            document.body.classList.add('low-power-mode');
            if(desktopDot) { desktopDot.classList.replace('bg-gray-600', 'bg-termGreen'); desktopText.innerText = 'ON'; desktopText.classList.add('text-termGreen'); }
            if(mobileBtn) { mobileBtn.innerHTML = '[ LOW_POWER_MODE: ON ]'; mobileBtn.classList.add('text-termGreen'); }
        } else {
            document.body.classList.remove('low-power-mode');
            if(desktopDot) { desktopDot.classList.replace('bg-termGreen', 'bg-gray-600'); desktopText.innerText = 'OFF'; desktopText.classList.remove('text-termGreen'); }
            if(mobileBtn) { mobileBtn.innerHTML = '[ LOW_POWER_MODE: OFF ]'; mobileBtn.classList.remove('text-termGreen'); }
        }
    }

    // Inject Desktop Navbar Toggle (Top of screen)
    const desktopLpmBar = document.createElement('div');
    desktopLpmBar.className = "hidden md:flex justify-end px-6 py-1 bg-black/90 border-b border-gray-900 fixed top-0 w-full z-[100] backdrop-blur-md";
    desktopLpmBar.innerHTML = `
        <button id="lpm-toggle-desktop" class="font-mono text-[9px] text-gray-500 hover:text-white transition-colors flex items-center gap-2 tracking-widest cursor-pointer">
            <span class="w-1.5 h-1.5 bg-gray-600 rounded-full" id="lpm-dot-desktop"></span> LOW_POWER_MODE: <span id="lpm-text-desktop">OFF</span>
        </button>
    `;
    document.body.prepend(desktopLpmBar);
    
    // Adjust Navbar down slightly so the new top bar doesn't overlap it
    const navRoot = document.getElementById('navbar-root');
    if(navRoot) navRoot.style.paddingTop = "24px";

    document.getElementById('lpm-toggle-desktop').addEventListener('click', toggleLowPower);

    // Inject Mobile Toggle (Wait 1 second for components.js to render Sys Status)
    setTimeout(() => {
        const mobileToggleHtml = `<button id="lpm-mobile-btn" class="font-mono text-[10px] text-gray-500 mt-2 block w-full text-center hover:text-white tracking-widest">[ LOW_POWER_MODE: OFF ]</button>`;
        const statusRoot = document.getElementById('status-root');
        if(statusRoot) {
            statusRoot.insertAdjacentHTML('beforeend', mobileToggleHtml);
            document.getElementById('lpm-mobile-btn').addEventListener('click', toggleLowPower);
        }
    }, 1000);


    /* ==========================================
       4. GLITCH PAGE TRANSITIONS
       ========================================== */
    const glitchStyles = document.createElement('style');
    glitchStyles.innerHTML = `
        .glitch-transition-overlay {
            position: fixed; inset: 0; background: #05070A; z-index: 99999;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: opacity 0.15s ease;
        }
        .glitch-transition-overlay.active { opacity: 1; pointer-events: all; }
        .glitch-anim-text { color: #00F0FF; font-family: monospace; font-size: 1.5rem; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; }
    `;
    document.head.appendChild(glitchStyles);

    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-transition-overlay';
    glitchOverlay.innerHTML = `<div class="glitch-anim-text" id="glitch-txt">ESTABLISHING_ROUTING_TABLE...</div>`;
    document.body.appendChild(glitchOverlay);

    // Random hex generator for transition text
    function scrambleTransitionText() {
        const txt = document.getElementById('glitch-txt');
        const chars = "0123456789ABCDEF!@#$%^&*";
        setInterval(() => {
            let rnd = "";
            for(let i=0; i<25; i++) rnd += chars[Math.floor(Math.random() * chars.length)];
            txt.innerText = rnd;
        }, 50);
    }

    // Intercept clicks on links
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            // Only trigger on internal html links that don't open in new tabs
            if (href && href.endsWith('.html') && anchor.getAttribute('target') !== '_blank') {
                e.preventDefault();
                glitchOverlay.classList.add('active');
                if(!isLowPower) scrambleTransitionText();
                
                // Wait 450ms then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 450);
            }
        });
    });


    /* ==========================================
       5. CHEAT CODES (Konami, sudo, root)
       ========================================== */
    const cheatModal = document.createElement('div');
    cheatModal.id = "cheat-modal";
    cheatModal.style.cssText = "display:none; position:fixed; inset:0; z-index:100000; background:rgba(255,0,60,0.15); backdrop-filter:blur(8px); align-items:center; justify-content:center; padding: 20px;";
    cheatModal.innerHTML = `
        <div style="background:#0A0E17; border:1px solid #FF003C; padding:40px; text-align:center; max-width:500px; box-shadow: 0 0 50px rgba(255,0,60,0.3);">
            <div style="color:#FF003C; font-family:monospace; font-size:10px; letter-spacing:3px; margin-bottom:10px;">SYSTEM_OVERRIDE_DETECTED</div>
            <h2 style="color:#FFF; font-family:monospace; font-size:2rem; margin-bottom:15px; font-weight:bold;">ROOT ACCESS GRANTED</h2>
            <p style="color:#9CA3AF; font-family:sans-serif; margin-bottom:30px; font-size: 14px; line-height: 1.6;">You bypassed standard protocols. Use this encrypted clearance code at checkout for 15% off all tactical operations.</p>
            <div style="background:rgba(255,0,60,0.1); border-left: 4px solid #FF003C; color:#FFF; font-family:monospace; font-size:1.5rem; font-weight:bold; padding:15px; letter-spacing:2px; margin-bottom:30px;">
                ROOTACCESS15
            </div>
            <button onclick="document.getElementById('cheat-modal').style.display='none'" style="background:transparent; border:1px solid #4B5563; color:#9CA3AF; padding:12px 30px; font-family:monospace; font-size:12px; letter-spacing:2px; cursor:pointer; text-transform:uppercase; transition: all 0.2s;">
                [ CLOSE_TERMINAL ]
            </button>
        </div>
    `;
    document.body.appendChild(cheatModal);

    let keyBuffer = '';
    const secretCodes = ['sudo', 'root', 'arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightba'];
    
    window.addEventListener('keydown', (e) => {
        keyBuffer += e.key.toLowerCase();
        if(keyBuffer.length > 100) keyBuffer = keyBuffer.slice(-50); // keep buffer manageable
        
        if (secretCodes.some(code => keyBuffer.endsWith(code))) {
            document.getElementById('cheat-modal').style.display = 'flex';
            keyBuffer = ''; // reset buffer
        }
    });

});