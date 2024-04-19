document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('yearSelect');
    const currentDateTime = document.getElementById('currentDateTime');
    
    // Populate the year dropdown
    for (let year = 1900; year <= 2999; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        yearSelect.appendChild(option);
        if (year === new Date().getFullYear()) {
            option.selected = true;
        }
    }

    // Display current date and time
    function updateCurrentDateTime() {
        const now = new Date();
        currentDateTime.textContent = `Today's Date and Time: ${now.toLocaleString()}`;
    }

    // Call this function every second to update the clock
    setInterval(updateCurrentDateTime, 1000);
    updateCurrentDateTime();

    // Generate calendar for the selected year
    function generateCalendar(year) {
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.innerHTML = ''; // Clear previous calendars

        // Today's date components
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDate = today.getDate();
        alert('today:::'+today);
        // Months and weekdays
        const months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        months.forEach((month, monthIndex) => {
            const firstDay = new Date(year, monthIndex, 1);
            const lastDay = new Date(year, monthIndex + 1, 0);

            const table = document.createElement('table');
            const caption = table.createCaption();
            caption.textContent = month + " " + year;

            const thead = table.createTHead();
            const headerRow = thead.insertRow();
            daysOfWeek.forEach(day => {
                const th = document.createElement('th');
                th.textContent = day;
                headerRow.appendChild(th);
            });

            const tbody = table.createTBody();
            let row = tbody.insertRow();
            for (let i = 0; i < firstDay.getDay(); i++) {
                row.insertCell();
            }

            for (let day = 1; day <= lastDay.getDate(); day++) {
                if ((row.cells.length % 7) === 0) row = tbody.insertRow();
                const cell = row.insertCell();
                cell.textContent = day;

                // Highlight today's date if the current table represents this month and year
                if (day === currentDate && monthIndex === currentMonth && year === currentYear) {
                    cell.classList.add('today');                
                }
            }
            calendarDiv.appendChild(table);
        });
    }

    // Initial calendar generation
    generateCalendar(yearSelect.value);

    // Update calendar when the selected year changes
    yearSelect.addEventListener('change', () => {
        generateCalendar(yearSelect.value);
    });
});
