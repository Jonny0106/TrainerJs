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
const newSectionNameInput = document.getElementById('newSectionName');
const addSectionBtn = document.getElementById('addSectionBtn');
const buttonSectionsContainer = document.getElementById('buttonSections');

// Section management
let sectionIdCounter = 1;

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

// Add section button event listener
if (addSectionBtn && newSectionNameInput) {
    addSectionBtn.addEventListener('click', addNewSection);
}

// Section Management Functions
function createButtonSection(name, id) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'container button-section';
    sectionDiv.setAttribute('data-section-id', id);
    
    sectionDiv.innerHTML = `
        <div class="section-header">
            <input type="text" class="section-name-input" value="${name}" />
            <button class="delete-section-btn">Delete</button>
        </div>
        <div class="button-generator">
            <input type="number" class="section-button-count" min="1" value="5" placeholder="Enter number of buttons" />
            <button class="generate-section-btn">Generate Buttons</button>
        </div>
        <div class="color-buttons"></div>
    `;
    
    // Add event listeners for this section
    const deleteBtn = sectionDiv.querySelector('.delete-section-btn');
    const generateBtn = sectionDiv.querySelector('.generate-section-btn');
    const buttonCountInput = sectionDiv.querySelector('.section-button-count');
    const colorButtonsContainer = sectionDiv.querySelector('.color-buttons');
    
    deleteBtn.addEventListener('click', () => deleteSection(id));
    generateBtn.addEventListener('click', () => generateButtons(id, buttonCountInput, colorButtonsContainer));
    
    return sectionDiv;
}

function addNewSection() {
    const name = newSectionNameInput.value.trim();
    if (!name) {
        alert('Please enter a section name');
        return;
    }
    
    sectionIdCounter++;
    const newSection = createButtonSection(name, sectionIdCounter);
    buttonSectionsContainer.appendChild(newSection);
    newSectionNameInput.value = '';
    updateDeleteButtons();
}

function deleteSection(sectionId) {
    const sections = buttonSectionsContainer.querySelectorAll('.button-section');
    if (sections.length <= 1) {
        alert('You must have at least one section');
        return;
    }
    
    const sectionToDelete = buttonSectionsContainer.querySelector(`[data-section-id="${sectionId}"]`);
    if (sectionToDelete) {
        sectionToDelete.remove();
        updateDeleteButtons();
    }
}

function updateDeleteButtons() {
    const sections = buttonSectionsContainer.querySelectorAll('.button-section');
    const deleteButtons = buttonSectionsContainer.querySelectorAll('.delete-section-btn');
    
    deleteButtons.forEach(btn => {
        btn.disabled = sections.length <= 1;
    });
}

function generateButtons(sectionId, buttonCountInput, colorButtonsContainer) {
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
}

// Initialize existing sections with event listeners
document.addEventListener('DOMContentLoaded', () => {
    const existingSections = document.querySelectorAll('.button-section');
    existingSections.forEach(section => {
        const sectionId = section.getAttribute('data-section-id') || '1';
        const deleteBtn = section.querySelector('.delete-section-btn');
        const generateBtn = section.querySelector('.generate-section-btn');
        const buttonCountInput = section.querySelector('.section-button-count');
        const colorButtonsContainer = section.querySelector('.color-buttons');
        
        if (deleteBtn) deleteBtn.addEventListener('click', () => deleteSection(sectionId));
        if (generateBtn) generateBtn.addEventListener('click', () => generateButtons(sectionId, buttonCountInput, colorButtonsContainer));
    });
    
    updateDeleteButtons();
});

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