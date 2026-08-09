// XSS PREVENTION AUDIT: Removing all `innerHTML` and parsing strings safely
export function initSecureTerminal() {
    const input = document.getElementById('term-input');
    const output = document.getElementById('term-output');

    if (!input || !output) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            if (!val) return;
            
            const line = document.createElement('div');
            // Safe assignment, defeats DOM-based XSS!
            line.textContent = `nexus@root:~$ ${val}`; 
            line.className = "text-white font-bold mb-2";
            
            output.appendChild(line);
            processCommand(val, output);
            
            input.value = '';
            output.scrollTop = output.scrollHeight;
        }
    });
}

function processCommand(cmd, outputWrapper) {
    const response = document.createElement('div');
    response.className = "text-cyberBlue mb-4";
    
    switch (cmd.toLowerCase()) {
        case 'help':
            response.textContent = `AVAILABLE COMMANDS: clear, about, access_ctf`;
            break;
        case 'clear':
            outputWrapper.textContent = '';
            return;
        default:
            response.textContent = `zsh: command not found: ${cmd}`;
    }
    
    outputWrapper.appendChild(response);
}