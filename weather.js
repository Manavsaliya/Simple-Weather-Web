const cityInput = document.querySelector("#search-in");
const submit = document.querySelector(".submit");
const errorDis = document.querySelector(".errorDis");

const cityDis = document.querySelector(".city-name");
const tempDis = document.querySelector(".temp");
const humidityDis = document.querySelector(".humidity");
const descDis = document.querySelector(".desc");
const emojiDis = document.querySelector(".emoji");
const feelLike = document.querySelector(".feel-like");
const dayNight = document.querySelector(".day-night");

const apiKey = "Enter Your API key Here";

const handleSubmit = async () => {
  let cityName = cityInput.value;

  if (cityName) {
    try {
      const weatherData = await getWeatherData(cityName);
      displayWeatherInfo(weatherData);
      inputFocus();
      clearError();
    } catch (err) {
      inputFocus();
      clearWeatherInfo();
      errorDisplay(err);
    }
  } else {
    clearWeatherInfo();
    errorDisplay("Please enter city");
  }
};

window.addEventListener("load", () => {
  cityInput.value = "Surat";
  handleSubmit();
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmit();
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSubmit();
  }
});

function inputFocus() {
  cityInput.value = "";
  cityInput.blur();
}

function clearError() {
  errorDis.textContent = "";
}

function clearWeatherInfo() {
  cityDis.textContent = "";
  tempDis.textContent = "";
  feelLike.textContent = "";
  humidityDis.textContent = "";
  descDis.textContent = "";
  emojiDis.textContent = "";
  dayNight.textContent = "";
}

async function getWeatherData(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  let response = await fetch(url);

  if (!response.ok) {
    clearWeatherInfo();
    throw new Error(`${cityInput.value} Not Found`);
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity, feels_like },
    weather: [{ description, id, icon }],
  } = data;

  cityDis.textContent = `${city}`;
  tempDis.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDis.textContent = `Humidity: ${humidity}%`;
  feelLike.textContent = `Feels-Like: ${(feels_like - 273.15).toFixed(1)}°C`;
  dayNight.textContent = formateDayNight(icon);
  descDis.textContent = `${description}`;
  emojiDis.textContent = getWeatherEmoji(id, icon);
}

function formateDayNight(dnId) {
  let formateDN = dnId[dnId.length - 1];

  if (formateDN == "d") {
    return "Day";
  } else if (formateDN == "n") {
    return "Night";
  }
}

function getWeatherEmoji(emojiId, emoIcon) {
  {
    switch (true) {
      case emojiId >= 200 && emojiId < 300:
        if (emoIcon == "11d" || emoIcon == "11n") {
          return "🌩️";
        }
      case emojiId >= 300 && emojiId < 400:
        if (emoIcon == "09d" || emoIcon == "09n") {
          return "☔";
        }
      case emojiId >= 500 && emojiId < 600:
        if (emoIcon == "10d" || emoIcon == "10n") {
          return "🌦️";
        } else if (emoIcon == "13d" || emoIcon == "13n") {
          return "❄️";
        } else if (emoIcon == "09d" || emoIcon == "09n") {
          return "🌨️";
        }
      case emojiId >= 600 && emojiId < 700:
        if (emoIcon == "13d" || emoIcon == "13n") {
          return "🌨️";
        }

      case emojiId >= 700 && emojiId < 800:
        if (emojiId == 741 && emoIcon == "50d") {
          return "🌫️";
        } else if (emojiId == 711 && emoIcon == "50d") {
          return "💨";
        } else if (emojiId == 781 && emoIcon == "50d") {
          return "🌪️";
        } else if (emoIcon == "50d") {
          return "🌬️";
        } else if (emoIcon == "50n") {
          return "🌫️";
        }

      case emojiId == 800:
        if (emoIcon == "01d") {
          return "☀️";
        } else if (emoIcon == "01n") {
          return "🌑";
        }
      case emojiId >= 801 && emojiId < 810:
        if (emoIcon == "02d") {
          return "⛅";
        } else if (emoIcon == "02n") {
          return "  ";
        } else if (emoIcon == "03d") {
          return "☁️";
        } else if (emoIcon == "03n") {
          return "☁️";
        } else if (emoIcon == "04n") {
          return "🌑";
        } else if (emoIcon == "04d") {
          return "☁️";
        }
      default:
        return "❓";
    }
  }
}

function errorDisplay(message) {
  errorDis.textContent = `${message}`;
}
