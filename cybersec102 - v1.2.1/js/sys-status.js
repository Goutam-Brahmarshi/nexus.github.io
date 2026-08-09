/**
 * NEXUS SYSTEM TELEMETRY & MONITOR ENGINE
 * Complete v1.2.2 fix: properly matched syntax braces and single-click toggle.
 */

function initSystemStatus() {
    const sysWidget = document.getElementById('sys-widget');
    const sysTrigger = document.getElementById('sys-trigger');
    const sysGraph = document.getElementById('sys-graph');

    if (!sysWidget || !sysTrigger || !sysGraph) return;

    const sysCtx = sysGraph.getContext('2d');
    sysGraph.width = 256;
    sysGraph.height = 48;

    // 1. SINGLE WIDGET TOGGLE (Fired solely by onclick="toggleSysMon()" in components.js)
    window.toggleSysMon = function() {
        if (sysWidget.classList.contains('hidden')) {
            sysWidget.classList.remove('hidden');
            sysWidget.classList.add('active');
        } else {
            sysWidget.classList.add('hidden');
            sysWidget.classList.remove('active');
        }
    };

    // 2. LIVE TELEMETRY GRAPH
    const dataPoints = Array(45).fill(24);
    function drawGraph() {
        sysCtx.fillStyle = 'rgba(10, 14, 23, 0.9)';
        sysCtx.fillRect(0, 0, sysGraph.width, sysGraph.height);
        sysCtx.beginPath();
        sysCtx.moveTo(0, dataPoints[0]);
        for (let i = 1; i < dataPoints.length; i++) {
            sysCtx.lineTo(i * (sysGraph.width / 45), dataPoints[i]);
        }
        sysCtx.strokeStyle = '#00F0FF';
        sysCtx.lineWidth = 1.5;
        sysCtx.stroke();
        dataPoints.shift();
        dataPoints.push(Math.random() * 36 + 6);
        requestAnimationFrame(drawGraph);
    }
    drawGraph();

    // 3. REAL METRICS (IP, BATTERY, NETWORK DOWNLINK)
    async function updateRealMetrics() {
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            const netSourceEl = document.getElementById('net-source');
            if (netSourceEl) netSourceEl.innerText = ipData.ip;
        } catch {
            const netSourceEl = document.getElementById('net-source');
            if (netSourceEl) netSourceEl.innerText = "127.0.0.1";
        }

        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                const updateBattery = () => {
                    const sysLoadEl = document.getElementById('sys-load');
                    if (sysLoadEl) sysLoadEl.innerText = `${Math.floor(battery.level * 100)}%`;
                };
                updateBattery();
                battery.addEventListener('levelchange', updateBattery);
            });
        }

        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
            const updateConn = () => {
                const encValEl = document.getElementById('encryption-val');
                if (encValEl) encValEl.innerText = `${conn.downlink} Mbps`;
            };
            updateConn();
            conn.addEventListener('change', updateConn);
        }
    }

    setInterval(() => {
        const ramEl = document.getElementById('ram-val');
        if (!ramEl) return;
        if (window.performance && window.performance.memory) {
            ramEl.innerText = `${(performance.memory.usedJSHeapSize / Math.pow(1024, 2)).toFixed(1)} MB`;
        } else {
            ramEl.innerText = `${(Math.random() * 250 + 200).toFixed(1)} MB`;
        }
    }, 2000);

    updateRealMetrics();

    // 4. MITIGATION PURGE SIMULATION
    window.runMitigation = function() {
        const btn = document.getElementById('mitigate-btn');
        const dot = document.getElementById('status-dot');
        if (!btn || !dot) return;

        btn.innerText = "[ PURGING THREATS... ]";
        btn.className = "w-full mt-4 bg-termGreen/20 border border-termGreen text-termGreen py-1.5 rounded font-bold text-xs tracking-widest uppercase transition-all";
        dot.className = "w-2 h-2 rounded-full bg-exploitRed shadow-[0_0_8px_#FF003C] animate-ping";

        setTimeout(() => {
            btn.innerText = "[ SYSTEM PURGED // SECURE ]";
            dot.className = "w-2 h-2 rounded-full bg-termGreen shadow-[0_0_8px_#00FF66] animate-pulse";
            setTimeout(() => {
                btn.innerText = "[ MITIGATE THREATS ]";
                btn.className = "w-full mt-4 bg-exploitRed/10 border border-exploitRed text-exploitRed hover:bg-exploitRed hover:text-black py-1.5 rounded font-bold text-xs tracking-widest uppercase transition-all";
            }, 2500);
        }, 1500);
    };
} // <-- Correctly closes initSystemStatus()

function runWhenReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
} // <-- Correctly closes runWhenReady()

runWhenReady(() => {
    try {
        initSystemStatus();
    } catch (e) {
        console.error("[NEXUS_ERR] System status init failed:", e);
    }
});

// 4. MITIGATION PURGE SIMULATION
    window.runMitigation = function() {
        const btn = document.getElementById('mitigate-btn');
        const widget = document.getElementById('sys-widget');
        if (!btn || !widget) return;
        
        btn.innerText = "[ PURGING THREATS... ]";
        btn.className = "w-full mt-4 bg-termGreen/20 border border-termGreen text-termGreen py-1.5 rounded font-bold text-xs tracking-widest uppercase transition-all";
        widget.style.borderColor = "#FF003C";
        widget.style.boxShadow = "0 0 35px rgba(255, 0, 60, 0.4)";
        
        setTimeout(() => {
            btn.innerText = "[ SYSTEM PURGED // SECURE ]";
            widget.style.borderColor = "#00FF66";
            widget.style.boxShadow = "0 0 35px rgba(0, 255, 102, 0.3)";
            
            setTimeout(() => {
                btn.innerText = "[ MITIGATE THREATS ]";
                btn.className = "w-full mt-4 bg-exploitRed/10 border border-exploitRed text-exploitRed hover:bg-exploitRed hover:text-black py-1.5 rounded font-bold text-xs tracking-widest uppercase transition-all";
                widget.style.borderColor = "";
                widget.style.boxShadow = "";
            }, 2500);
        }, 1500);
    };