// Personal API Key for OpenWeatherMap API
const API_KEY = "&APPID=e23122c5062eb361eb2aa6ee3762e1db&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Get element
const button = document.querySelector("#generate");
const dateRes = document.querySelector("#date");
const tempRes = document.querySelector("#temp");
const contentRes = document.querySelector("#content");
const inputZip = document.querySelector("#zip");
const inputFeelings = document.querySelector("#feelings");

// Generate date
function convertDate(unixtimestamp) {
  // Months array
  var months_array = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert timestamp to milliseconds
  var date = new Date(unixtimestamp * 1000);

  // Year
  var year = date.getFullYear();

  // Month
  var month = months_array[date.getMonth()];

  // Day
  var day = date.getDate();

  // Display date time in MM/dd/yyyy format
  var convertedTime = month + "/" + day + "/" + year;

  return convertedTime;
}

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
button.addEventListener("click", generateData);

function generateData() {
  getDataApi(baseURL, inputZip.value, API_KEY)
    .then(function (data) {
      // Add data
      postDataApi("/addWeatherData", {
        temperature: data.main.temp,
        date: convertDate(data.dt),
        userResponse: inputFeelings.value,
      });
    })
    .then(() => render());
}

// Async GET
/* Function to GET Web API Data*/
const getDataApi = async (baseURL, zip, API_KEY) => {
  const url = `${baseURL}${zip}${API_KEY}`;
  const res = await fetch(url);
  try {
    const allData = await res.json();
    return allData;
  } catch (error) {
    console.log("error", error);
  }
};

// Async POST
/* Function to POST data */
// Async POST
const postDataApi = async (url = "", data = {}) => {
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

/* Function to update UI */
const render = async () => {
  const request = await fetch("/all");
  try {
    const res = await request.json();
    dateRes.textContent = res.date;
    tempRes.textContent = res.temperature;
    contentRes.textContent = res.userResponse;
  } catch (error) {
    console.log("error", error);
  }
};
