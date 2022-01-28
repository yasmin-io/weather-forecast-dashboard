//api key
var APIkey = "c337b3a4723bde09488f1f166a5cac8c";

var searchForm = document.querySelector(".search-form");
var citySearched = document.querySelector("#city-searched");

function getCurrentAndForecast(lat, lon) {
  // Url for OpenWeather API Call
  // Using Lat and Lon variables from the 'getCityCoordinates' function.
  // This function dynamically uses information for the API call to work.
  // To avoid Over-Fetching I excluded = Minutely, Hourly and Alerts.
  var urlForInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${APIkey}`;

  fetch(urlForInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      console.log(responseData);
      //   first -> get the current weather to display

      // then you can worry about getting the future forecast to display
    });
}
function getCityCoordinates(city) {
  // Api Link
  var urlForCoords = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

  fetch(urlForCoords)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      var lat = responseData.coord.lat;
      var lon = responseData.coord.lon;

      console.log(lat, lon);
      getCurrentAndForecast(lat, lon);
    });
}
function getWeatherDetails(event) {
  event.preventDefault();

  // Setting the user's search as a variable and removing any spaces.
  // We will then use this information in the next function by passing it through as a parameter.
  if (citySearched.value) {
    var city = citySearched.value.trim();
    getCityCoordinates(city);
  } else {
    // If the user clicks search without entering a city, they will get an alert pop up.
    alert("Please Search a city!");
  }
}

//local storage function saveHisory
//create a button for takes the stuff and trioms and mkaes a button

searchForm.addEventListener("submit", getWeatherDetails);
