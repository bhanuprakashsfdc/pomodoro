let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

// Sound effects
const timerTick = new Audio('assets/audio/timer.wav');
const alarm = new Audio('assets/audio/alarm.wav');

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
  document.body.style.backgroundColor = "#BB4949";
  const container = document.querySelector('.container');
  container.style.backgroundColor = "#C25C5C";
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
  document.body.style.backgroundColor = "#39848A";
  const container = document.querySelector('.container');
  container.style.backgroundColor = "#4E9296";
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
  document.body.style.backgroundColor = "#397097";
  const container = document.querySelector('.container');
  container.style.backgroundColor = "#4F80A2";
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      timerTick.play(); 
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
          alarm.play();
        }
      }
    }, 1000);
  }
});

function toggleMenu() {
    var nav = document.querySelector('.header-nav');
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
    } else {
        nav.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
  var currentYear = new Date().getFullYear(); // Get the current year
  document.getElementById('year').textContent = currentYear; // Set the current year in the span
});

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  const timeString = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1); // Update the time as fast as possible, roughly every millisecond
updateClock(); // Initialize to set time immediately on page load