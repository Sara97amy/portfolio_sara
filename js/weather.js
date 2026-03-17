async function getWeather() {

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "d460b875a4f7f31a722c38d627ecc822";
  const city = "Göteborg";
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=sv`;

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Nätverksrespons var inte ok");
    }

    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const location = data.name;
    const id = data.weather[0].id;

    let icon;
    if (id === 800) icon = "☀️";
    else if (id >= 801) icon = "☁️";
    else if (id >= 600) icon = "❄️";
    else if (id >= 300) icon = "🌧️";
    else if (id >= 200) icon = "⛈️";
    else icon = "🌫️";

    const sign = temp > 0 ? "+" : "";

    const weatherInfoElement = document.getElementById("weather-data");
    weatherInfoElement.innerHTML = `${location} ${sign}${temp}° ${icon}`;
    weatherInfoElement.style.opacity = "0.6";

  } catch (error) {
    console.error("Det gick inte att hämta väderdata:", error);
  }

}

getWeather();
setInterval(getWeather, 60000);