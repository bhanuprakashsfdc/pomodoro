const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

function updateAnalogClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsDegrees = ((seconds / 60) * 360) + 90; // Offset by 90 degrees to start at the top
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

setInterval(updateAnalogClock, 1000);
updateAnalogClock(); // Initialize to set the correct time immediately


function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12; // Convert hour to 12-hour format
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${amPm}`;
    document.getElementById('clock').textContent = timeString;
    document.title = "Time is " + timeString +" - Pomodoro24.com ";
}

setInterval(updateClock, 1); // Update the time approximately every millisecond
updateClock(); // Initialize to set time immediately on page load

function updateliveClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12; // Convert hour to 12-hour format
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${amPm}`;
    document.getElementById('clock').textContent = timeString;
    document.title = "Time is " + timeString +" - Pomodoro24.com ";
}

setInterval(updateliveClock, 1); // Update the time approximately every millisecond
updateliveClock(); // Initialize to set time immediately on page load