let startTime = 0;
let intervalId = null;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

startBtn.addEventListener('click', () => {
  if (intervalId) return;
  const start = Date.now() - startTime;
  intervalId = setInterval(() => {
    startTime = Date.now() - start;
    display.textContent = formatTime(startTime);
  }, 100);
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
});