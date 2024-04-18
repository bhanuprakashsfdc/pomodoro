document.addEventListener('DOMContentLoaded', function () {
    const ip = '106.213.116.204';  // Example IP address
    const url = `http://ip-api.com/json/${ip}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.status === 'fail') {
                throw new Error('Failed to fetch IP data: ' + data.message);
            }
            document.getElementById('ip').textContent = data.query;
            document.getElementById('city').textContent = data.city;
            document.getElementById('region').textContent = data.regionName;
            document.getElementById('country').textContent = data.country;
            document.getElementById('zip').textContent = data.zip;
            document.getElementById('lat').textContent = data.lat;
            document.getElementById('lon').textContent = data.lon;
            document.getElementById('timezone').textContent = data.timezone;
            document.getElementById('isp').textContent = data.isp;
            document.getElementById('org').textContent = data.org;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch IP information. See console for details.');
        });
});

function startSpeedTest() {
    const startTime = (new Date()).getTime();
    const downloadSize = 5000000; // Size of the file in bytes (e.g., 5MB)
    const url = 'https://yourserver.com/path/to/your/5mbtestfile'; // URL to a 5 MB test file

    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const endTime = (new Date()).getTime();
            const duration = (endTime - startTime) / 1000; // Duration in seconds
            const bitsLoaded = downloadSize * 8;
            const speedBps = (bitsLoaded / duration).toFixed(2);
            const speedKbps = (speedBps / 1024).toFixed(2);
            const speedMbps = (speedKbps / 1024).toFixed(2);

            document.getElementById('download-speed').textContent = speedMbps + ' Mbps';
        })
        .catch(error => {
            console.error('Error during speed test:', error);
            document.getElementById('download-speed').textContent = 'Test failed';
        });
}
