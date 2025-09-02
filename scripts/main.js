// Timer functionality for TrainerJs
let startTime = 0;
let timerDuration = 10;
let intervalId = null;
let endTimes = [];

// DOM elements
const display = document.getElementById('display');
const resultDisplay = document.getElementById('resultDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const generateBtn = document.getElementById('generateBtn');
const buttonCountInput = document.getElementById('buttonCount');
const colorButtonsContainer = document.getElementById('colorButtons');

// Initialize timer display
if (display) {
    display.textContent = formatTimeFromSeconds(timerDuration);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    return formatTimeFromSeconds(timerDuration - totalSeconds);
}

function formatTimeFromSeconds(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function playBeep() {
    console.log("Timer finished - beep!");
    // Uncomment the following lines to enable audio beep
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // const oscillator = audioCtx.createOscillator();
    // oscillator.type = "sine";
    // oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    // oscillator.connect(audioCtx.destination);
    // oscillator.start();
    // oscillator.stop(audioCtx.currentTime + 0.3);
}

function startTimer() {
    if (intervalId) return; // Prevent multiple timers
    
    const start = Date.now() - startTime;
    intervalId = setInterval(() => {
        startTime = Date.now() - start;
        let totalSeconds = Math.floor(startTime / 1000);
        let timeLeft = timerDuration - totalSeconds;
        
        if (display) {
            display.textContent = formatTimeFromSeconds(timeLeft);
        }

        if (timeLeft <= 0) {
            startTime = 0;
            clearInterval(intervalId);
            intervalId = null;
            playBeep();
            
            if (display) {
                display.textContent = "00:00:00";
            }
        }
    }, 100);
}

function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        
        // Record the end time
        const endTime = Date.now();
        endTimes.push(new Date(endTime).toLocaleTimeString());
        
        if (resultDisplay) {
            resultDisplay.textContent = `Stopped at: ${endTimes[endTimes.length - 1]}`;
        }
    }
}

function resetTimer() {
    clearInterval(intervalId);
    intervalId = null;
    startTime = 0;
    endTimes = [];
    
    if (display) {
        display.textContent = formatTimeFromSeconds(timerDuration);
    }
    
    if (resultDisplay) {
        resultDisplay.textContent = "";
    }
}

// Event listeners
if (startBtn) {
    startBtn.addEventListener('click', startTimer);
}

if (stopBtn) {
    stopBtn.addEventListener('click', stopTimer);
}

if (resetBtn) {
    resetBtn.addEventListener('click', resetTimer);
}

// Dynamic button generation
if (generateBtn && buttonCountInput && colorButtonsContainer) {
    generateBtn.addEventListener('click', () => {
        const count = parseInt(buttonCountInput.value, 10);
        
        if (isNaN(count) || count < 1) {
            alert('Please enter a valid number greater than 0');
            return;
        }
        
        colorButtonsContainer.innerHTML = ''; // Clear existing buttons

        for (let i = 1; i <= count; i++) {
            const btn = document.createElement('button');
            btn.className = 'colorBtn';
            btn.textContent = '5';

            btn.addEventListener('click', () => {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                    startTime = 0;
                } 

                if (btn.textContent === '5' && !btn.classList.contains('red')) {
                    btn.classList.add('red');
                } else {
                    btn.textContent = parseInt(btn.textContent) - 1;
                }
                
                if (btn.textContent === '0') {
                    btn.classList.remove('red');
                    btn.textContent = '5';
                    if (display) {
                        display.textContent = "00:00:00";
                    }
                } else {
                    startTimer();
                }
            });

            colorButtonsContainer.appendChild(btn);
        }
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (intervalId) {
            stopTimer();
        } else {
            startTimer();
        }
    } else if (e.code === 'KeyR') {
        resetTimer();
    }
});

// Show keyboard shortcuts help
console.log('Keyboard shortcuts:');
console.log('Space - Start/Stop timer');
console.log('R - Reset timer');