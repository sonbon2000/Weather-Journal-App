// Personal API Key for OpenWeatherMap API
const API_KEY = "&APPID=e23122c5062eb361eb2aa6ee3762e1db&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Creating a new date instance dynamically with JS
// Convert date
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

// Get Element
const inputZip = document.querySelector("#zip").value;
const button = document.querySelector("#submit");
const textAreaResult = document.querySelector("#data-render");

//GET data function
const getData = async () => {
  try {
    const url = `${baseURL}${inputZip}${API_KEY}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

//  POST data function
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

/**
 * Generate Data function to generate API
 */
const generateData = () => {
  // getData return promise
  getData().then((data) => {
    //making sure from the received data to execute rest of the steps
    if (data) {
      postData("/addWeatherData", {
        temperature: data.main.temp,
        date: convertDate(data.dt),
        userResponse: feelings,
      });
      render();
    }
  });
};

// Function invoke API
button.addEventListener("click", generateData);

// Render UI to Pages
const render = async () => {
  const res = await fetch("/all");
  try {
    const data = await res.json();
    textAreaResult.textContent = `Date: ${data.date}`;
    textAreaResult.textContent = `Temperature(°C): ${data.temperature}`;
    textAreaResult.textContent = `Feelings: ${data.userResponse}`;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
