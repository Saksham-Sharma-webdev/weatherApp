const apiKey = "";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const wicon = document.querySelector(".weather-icon");

let audioElement = new Audio();
audioElement.loop = true;



wicon.addEventListener("click", function () {
  if (!audioElement.src) {
    console.log("No audio loaded yet");
    return;
  }
  console.log(audioElement.src)

  if (audioElement.paused) {
    audioElement.play().catch(err => console.log(err));
  } else {
    audioElement.pause();
  }
});




async function updateWeather(place) {
  let data;
  try {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiURL);
    data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
    return;
  }

  if (!data.id) {
    console.log("City not found");
    searchBox.value = "";
    return;
  }

  document.querySelector(".weather").style.display = "block";

  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind-speed").innerHTML =
    Math.round(data.wind.speed) + " km/h";

  console.log(data.weather[0].id);
  const wid = data.weather[0].id;
  console.log(typeof wid);
  let icon;

  if (wid >= 200 && wid < 300) {
    icon = "thunder";
  } else if (wid >= 300 && wid < 400) {
    icon = "drizzle";
  } else if (wid >= 500 && wid < 600) {
    icon = "rain";
  } else if (wid >= 600 && wid < 700) {
    icon = "snow";
  } else if (wid >= 700 && wid < 800) {
    icon = "mist";
  } else if (wid === 800) {
    icon = "clear";
  } else if (wid > 800 && wid < 900) {
    icon = "clouds";
  }
  wicon.src = `./images/${icon}.png`;

  audioElement.src = `./music/${icon}.mp3`;
  console.log(audioElement.src)
  audioElement.load()
}

searchBtn.addEventListener("click", function () {
  updateWeather(searchBox.value);
});
