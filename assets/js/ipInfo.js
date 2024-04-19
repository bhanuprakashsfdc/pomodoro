
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip-address').textContent = data.ip;
        })
        .catch(error => {
            console.error('Error fetching IP:', error);
            document.getElementById('ip-address').textContent = 'Error fetching IP';
        });

        const ip = data.ip;
        const url = `http://ip-api.com/json/${ip}`;
    
        document.addEventListener('DOMContentLoaded', function () {
            const ip = data.ip;
          //  const ip = '106.213.116.204';  // Example IP address
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
                    document.getElementById('timezoneval').textContent = data.timezone;
                    document.getElementById('isp').textContent = data.isp;
                    document.getElementById('org').textContent = data.org;
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to fetch IP information. See console for details.');
                });
        });
});

document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;