// Personal API Key for OpenWeatherMap API
const API_KEY = ",&appid=d24bf70d6dae818a6893be61edd0ae3c&units=metric";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
// the URL of the server to post data
const server = "http://localhost:3000";

// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

/**
 * Generate Data function to generate API
 */
const generateData = () => {
  //get value after click on the button
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getData return promise
  getData(zip).then((data) => {
    //making sure from the received data to execute rest of the steps
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const addData = {
        newDate,
        city,
        temp: Math.round(temp),
        description,
        feelings,
      };
      postData(server + "/add", addData);
      updatingUI();
    }
  });
};

// Function invoke API
document.getElementById("generate").addEventListener("click", generateData);

//GET data function
const getData = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + API_KEY);
    const data = await res.json();
    return data;
  } catch (error) {}
};

//  POST data function
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {}
};

// Updating UI to generate to web pages
const updatingUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();
    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp + "&degC";
    document.getElementById("description").innerHTML = savedData.description;
    document.getElementById("content").innerHTML = savedData.feelings;
  } catch (error) {}
};
