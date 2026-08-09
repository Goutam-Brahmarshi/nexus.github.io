/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: { 
      extend: { 
          colors: { 
            bgDark: '#0A0E17', 
            termGreen: '#00FF66', 
            cyberBlue: '#00F0FF', 
            exploitRed: '#FF003C' 
          }, 
          fontFamily: { 
            mono: ['"Share Tech Mono"', '"JetBrains Mono"', 'monospace'], 
            sans: ['"Inter"', 'sans-serif'] 
          } 
      } 
  }
}