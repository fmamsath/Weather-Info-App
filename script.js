function getWeatherAndSendSMS() {
            const apiKey = '6466978706d7f17d89f4063e78b21c57';
            const location = document.getElementById('locationInput').value;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Unable to retrieve weather data. Please check the location and try again.');
                    }
                    return response.json();
                })
                .then(data => {
                    const weatherBox = document.getElementById('weatherBox');
                    const weatherContent = document.getElementById('weatherContent');
                    const dateAndTime = document.getElementById('dateAndTime');

                    const currentDate = new Date();
                    const formattedDate = currentDate.toISOString().split('T')[0];
                    const formattedTime = currentDate.toLocaleTimeString();

                    dateAndTime.innerText = `Date: ${formattedDate}, Time: ${formattedTime}`;

                    weatherContent.innerHTML = `
                        Weather Info for ${data.name}, ${data.sys.country}:
                        Temperature: ${data.main.temp} °C
                        Humidity: ${data.main.humidity} %
                        Weather: ${data.weather[0].description}
                    `;

                    weatherBox.style.display = 'block';
                    weatherBox.scrollIntoView({ behavior: 'smooth' });

                    const forecastButton = document.querySelector('.btn-secondary');
                    forecastButton.style.animation = 'shake 0.5s ease-in-out';
                    forecastButton.addEventListener('animationend', () => {
                        forecastButton.style.animation = '';
                    });

                    sendMessage();
                    displayWindyMap(data.coord.lat, data.coord.lon);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    displayError(error.message);
                });
        }

        function sendMessage() {
            // Your existing code for sending SMS
        }

function displayWindyMap(latitude, longitude) {
    const windyMap = document.getElementById('windyMap');
    windyMap.innerHTML = `
        <iframe
            width="100%"
            height="100%"
            frameborder="0"
            src="https://embed.windy.com/embed2.html?lat=${latitude}&lon=${longitude}&detailLat=${latitude}&detailLon=${longitude}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
        ></iframe>
    `;
}
