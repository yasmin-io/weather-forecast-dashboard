//api key
var APIkey = "c337b3a4723bde09488f1f166a5cac8c";

var searchForm = document.querySelector(".search-form");
var citySearched = document.querySelector("#city-searched");

function getCurrentAndForecast(lat, lon) {
  var urlForInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${APIkey}`;

  fetch(urlForInfo)
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      console.log(responseData);
    });
  //use lat and lon to get current and future weather
  //var urlForCurrentAndForecast = ""
  // variable above will use the paramters lat and lon + the API Key and anything we exclude
  //fetch(var urlForCurrentAndForecast).then(){
  // return response.json();}???
  //.the ( function (
  //   first -> get the current weather to display
  // then you can worry about getting the future forecast to display
}
function getCityCoordinates(city) {
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
  // If nothing gets clicked, create an if statement for if nothing is entered an alert pops up!
  console.log(event);
  event.preventDefault();

  var city = citySearched.value.trim();
  getCityCoordinates(city);
}

//local storage function saveHisory
//create a button for takes the stuff and trioms and mkaes a button

searchForm.addEventListener("submit", getWeatherDetails);
