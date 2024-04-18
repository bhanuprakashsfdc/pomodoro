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

// Define the website name as a global constant
const WEBSITE_NAME = "Pomodoro24.com";
function getPageName() {
    const path = window.location.pathname;
    const page = path.split("/").pop();  // Gets the last part of the path
    let pageName = page.split('.')[0].replace(/-/g, ' ');  // Removes the file extension and replaces dashes with spaces

    // Capitalize the first letter of each word
    pageName = pageName.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
    return pageName;  // Returns the capitalized page name
}

function updateClock() {
    // Create a new Date object for the current time in London
    var timeZone = "Africa/Algiers";
    var now = new Date();
    var Time = new Date(now.toLocaleString("en-US", {timeZone: timeZone}));
    let hours = Time.getHours();
    const minutes = String(Time.getMinutes()).padStart(2, '0');
    const seconds = String(Time.getSeconds()).padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; // Convert hour to 12-hour format
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${amPm}`;
    document.getElementById('clock').textContent = timeString;

    // Set the document title including the page name
    const pageName = getPageName();
    document.title = pageName + " Time is " + timeString + " - "+WEBSITE_NAME;
    document.getElementById('locationName').textContent = pageName;

    // Set meta description content
    const descriptionContent = `${pageName} and time is ${timeString} - Pomodoro24.com`;
    document.querySelector('meta[name="description"]').setAttribute('content', descriptionContent);

    // Date information
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[Time.getDay()];
    const date = Time.getDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[Time.getMonth()];
    const year = Time.getFullYear();
    // Calculate week number
    const start = new Date(Time.getFullYear(), 0, 0);
    const diff = Time - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const week = Math.floor(diff / oneWeek);
    document.getElementById('weekInfo').textContent = dayOfWeek;
    document.getElementById('dayInfo').textContent = date;
    document.getElementById('monthInfo').textContent = month;
    document.getElementById('yearInfo').textContent = year;
    document.getElementById('weeknumInfo').textContent = week;


    const cities = [
        { id: 1, name: 'San Jose', timeZone: 'America/Los_Angeles' },
        { id: 2, name: 'New York', timeZone: 'America/New_York' },
        { id: 3, name: 'London', timeZone: 'Europe/London' },
        { id: 4, name: 'Dubai', timeZone: 'Asia/Dubai' },
        { id: 5, name: 'Kolkata', timeZone: 'Asia/Kolkata' },
        { id: 6, name: 'Singapore', timeZone: 'Asia/Singapore' },
        { id: 7, name: 'Melbourne', timeZone: 'Australia/Melbourne' },
        { id: 8, name: 'Tokyo', timeZone: 'Asia/Tokyo' }
    ];
    
    cities.forEach(city => {
        const cityTime = new Date(now.toLocaleString("en-US", {timeZone: city.timeZone}));
        let cityHours = cityTime.getHours();
        const cityMinutes = String(cityTime.getMinutes()).padStart(2, '0');
     //   const citySeconds = String(cityTime.getSeconds()).padStart(2, '0');
        const cityAmPm = cityHours >= 12 ? 'PM' : 'AM';
        cityHours = cityHours % 12;
        cityHours = cityHours ? cityHours : 12;
        const cityTimeString = `${cityHours}:${cityMinutes} ${cityAmPm}`;
      document.querySelector(`#city${city.id} .city-time`).textContent = cityTimeString;
      document.querySelector(`#city${city.id} .city-name`).textContent = city.name; 
    });
}
setInterval(updateClock, 1000); // Update the time every second for consistency
updateClock(); // Initialize to set time immediately on page load