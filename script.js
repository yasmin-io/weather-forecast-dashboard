// My API Key from OpenWeather
var APIkey = "c337b3a4723bde09488f1f166a5cac8c";

var searchForm = document.querySelector(".search-form");
var citySearched = document.querySelector("#city-searched");
var weatherDisplay = document.querySelector(".today");

var today = moment().format("L");

function getCurrentAndForecast(lat, lon) {
  // Url for OpenWeather API Call
  // Using Lat and Lon variables from the 'getCityCoordinates' function.
  // This function dynamically uses information for the API call to work.

  var urlForInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${APIkey}`;

  fetch(urlForInfo) // This is initiating the data request to get the information we will use to display for the user.
    .then(function (response) {
      return response.json();
    })
    .then(function (responseData) {
      console.log(responseData);
      //  Current Weather Display

      // Current City to display as a title above weather.
      // Create variables and elements for the information we want to display.
      var userInput = citySearched.value.trim();
      var currentCityTitle = document.createElement("h2");

      // Ammend information and attributes to the Element.
      // This is adding the users input and Current date (Using moment.js) to the h2 element.
      currentCityTitle.textContent = userInput + " " + today;
      // The current weather display title has an id of 'currentTitle'.
      currentCityTitle.setAttribute("id", "currentTitle");

      // Append the Html selector to the variable cityTitle that holds the information.
      weatherDisplay.appendChild(currentCityTitle);

      // Getting Current Date using moment.js, as the API Url I am using does not provide a date.
    });
}

// Here, we are using this function to get the Coordinates of the city the user wants.
// We can use this to dynamically excute the getCurrentAndForecast function for every unique search.
function getCityCoordinates(city) {
  // Api Link that uses the 'city' variable from getWeatherDetails function
  // & APIkey variable from the global scope.
  // This is the url that will retrieve the information necessary.
  // By adding ',GB' to the URL we are restricting the return to Great Britain only.
  var urlForCoords = `https://api.openweathermap.org/data/2.5/weather?q=${city},GB&appid=${APIkey}`;

  // Fetch function begins the request for information.
  fetch(urlForCoords)
    .then(function (response) {
      // This returns a promise so we have to use .then set the next steps
      return response.json(); // .json changes the return information to an array that we are able to use.
    })
    .then(function (responseData) {
      // This is also a promise so we have to follow with another .then
      // We can now use the response from the request to get the Latitude and Longitude of the city the user requested.
      var lat = responseData.coord.lat;
      var lon = responseData.coord.lon;

      console.log(lat, lon);
      // We are now passing the lat and lon variable information to the next function to get the information needed.
      getCurrentAndForecast(lat, lon);
    });
}

// This function grabs the users input information.
function getWeatherDetails(event) {
  event.preventDefault();

  // Setting the user's search as a variable and removing any spaces.
  // We will then use this information in the next function by passing it through as a parameter.
  if (citySearched.value) {
    var city = citySearched.value.trim();

    // Save to local Storage Attempt or maybe do a seperate function and call in with param city.
    //var cityArray = [city];
    //localStorage.setItem("City:", JSON.stringify(cityArray));

    getCityCoordinates(city);
  } else {
    // If the user clicks search without entering a city, they will get an alert pop up.
    alert("Please Search a city!");
  }
}

//local storage function saveHisory
//create a button for takes the stuff and trioms and mkaes a button

searchForm.addEventListener("submit", getWeatherDetails);
