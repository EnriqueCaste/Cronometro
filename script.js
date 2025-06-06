let startTime = 0;
let elapsedBeforePause = 0;
let interval;
let isRunning = false;

function formatNumber(num) {
  return num === 0 ? '0' : String(num);
}

function updateCronometro() {
  const now = Date.now();
  const elapsed = elapsedBeforePause + (isRunning ? (now - startTime) : 0);

  const totalSeconds = Math.floor(elapsed / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById('days').textContent = formatNumber(days);
  document.getElementById('hours').textContent = formatNumber(hours);
  document.getElementById('minutes').textContent = formatNumber(minutes);
  document.getElementById('seconds').textContent = formatNumber(seconds);

  // 🔁 Aquí actualizas los círculos:
  setProgress("circle-seconds", seconds, 60);
  setProgress("circle-minutes", minutes, 60);
  setProgress("circle-hours", hours, 24);
  setProgress("circle-days", days % 100, 100);
}


function start() {
  startTime = Date.now();
  interval = setInterval(updateCronometro, 1000);
  isRunning = true;
  const btn = document.getElementById('startStopBtn');
  btn.textContent = 'Parar';
  btn.classList.add('running');
}

function stop() {
  clearInterval(interval);
  elapsedBeforePause += Date.now() - startTime;
  isRunning = false;
  const btn = document.getElementById('startStopBtn');
  btn.textContent = 'Iniciar';
  btn.classList.remove('running');
}

function reset() {
  clearInterval(interval);
  isRunning = false;
  elapsedBeforePause = 0;
  startTime = 0;
  const btn = document.getElementById('startStopBtn');
  btn.textContent = 'Iniciar';
  btn.classList.remove('running');
  updateCronometro();
}

function setProgress(id, value, max) {
  const circle = document.getElementById(id);
  const radius = 70; 
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;
  circle.style.strokeDashoffset = offset;
}

document.getElementById('startStopBtn').addEventListener('click', () => {
  if (isRunning) {
    stop();
  } else {
    start();
  }
});

document.getElementById('resetBtn').addEventListener('click', reset);

updateCronometro();

