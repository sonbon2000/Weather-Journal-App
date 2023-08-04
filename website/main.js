// Set up Personal Infor
const API_KEY = "06f40b330b9c3a4210db6559e399ba03";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Get element
const button = document.querySelector("#generate");
const nameRes = document.querySelector("#name");
const tempRes = document.querySelector("#temp");
const inputCities = document.querySelector("#cities");

// Function call API
button.addEventListener("click", searchWeather);

function searchWeather() {
  getWeatherData(baseURL, inputCities.value, API_KEY)
    .then(function (data) {
      // Add data
      postWeatherData("/add", {});
    })
    .then(() => render());
}

// Function GET
const getWeatherData = async (baseURL, cities, API_KEY) => {
  const url = `${baseURL}${cities}&appid=${API_KEY}`;
  const res = await fetch(url);
  try {
    const allData = await res.json();
    return allData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function POST
const postWeatherData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Render UI
const render = async () => {
  const request = await fetch("/all");
  try {
    const res = await request.json();
    nameRes.textContent = `Cities name: ${res?.name}`;
    tempRes.textContent = `Temperature: ${res?.main?.temp}`;
  } catch (error) {
    console.log("error", error);
  }
};
