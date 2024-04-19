// Js utlisites in what is my ip address and my-timezone.html
document.addEventListener('DOMContentLoaded', function () {
    // Fetch the IP address from ipify
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip-address').textContent = data.ip;
            // Using the fetched IP address to get more detailed IP info
            const url = `http://ip-api.com/json/${data.ip}`;

            return fetch(url);  // Return the fetch promise to chain the next .then()
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.status === 'fail') {
               // throw new Error('Failed to fetch IP data: ' + data.message);
            }
            // Update the HTML elements with the received data
            document.getElementById('ip').textContent = data.query;
            document.getElementById('city').textContent = data.city;
            document.getElementById('region').textContent = data.regionName;
            document.getElementById('country').textContent = data.country;
            document.getElementById('zip').textContent = data.zip;
            document.getElementById('lat').textContent = data.lat;
            document.getElementById('lon').textContent = data.lon;
            document.getElementById('timezoneval').textContent = data.timezone;
            document.getElementById('isp').textContent = data.isp;
            document.getElementById('org').textContent = data.org;
        })
        .catch(error => {
            console.error('Error:', error);
         //   alert('Failed to fetch IP information. See console for details.');
        });

    // Set timezone immediately available from the browser's locale settings
    document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
});