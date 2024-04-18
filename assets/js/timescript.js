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
    document.title = pageName + " Time is " + timeString + " - Pomodoro24.com";
    document.getElementById('locationName').textContent = pageName;

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