// Defining Interactables
var cityFormEl = document.getElementById('city-form');
var cityInputEl = document.querySelector('.input-field');
var cityButtonEl;
var searchBtn = document.querySelector('.search-btn');
var weatherBlock = document.querySelector('.weather-bar');
var currentWeatherHeader = $('.current-weather').children('h2');
// Array for localStorage
var totalSearches = JSON.parse(localStorage.getItem('searches')) || [];

// Array to store API array for populating the current weather creation
var cityWeatherData = ['temp', 'wind', 'humidity', 'uvi']
var forecastWeatherData = ['temp', 'wind', 'humidity',]
var currentDay = [];



// DEFINING FUNCTIONS
// Storing input from input field
var searchCity = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  var container = document.querySelector('.button-container');

// ADD API GEOGRAPHICAL FUNCTION HERE

// CONDITIONAL: ADDS CITY TO LOCALSTORAGE ARRAY IF NOT ALREADY THERE, AND THEN ADDS A BUTTON IN ADDITION
  if (totalSearches.includes(`${city}`)) {
    // remove item from array
    console.log('Already has city');
  } else {
    // Adds the city to the beginning of the array
  totalSearches.unshift(city);
  // Stores totalSearches in localStorage
  var storage = JSON.stringify(totalSearches);
  localStorage.setItem('searches', storage);
  // Adds button for newly search city
  var buttonNew = document.createElement('button');
  buttonNew.classList.add('searched-city-button');
  buttonNew.setAttribute('id', `${city}`);
  buttonNew.textContent = city;
  container.appendChild(buttonNew);
  };
};

// CREATES THE DAILY FORECAST DIVS
var createForecast = function () {
  for (var i = 0; i < 5; i++) {
    var newForecastDiv = document.createElement('div');
    var newForecastHeader = document.createElement('h4');
    newForecastDiv.classList.add('forecast-day');
    newForecastHeader.textContent = 'Forecast';
    newForecastDiv.append(newForecastHeader);

    for (var j = 0; j < 3; j++) {
    var newDetail = document.createElement('p');
    newDetail.textContent = forecastWeatherData[j];
    newForecastDiv.append(newDetail);
    weatherBlock.append(newForecastDiv);
    };
  };
};

// CREATES CURRENT WEATHER DIV
var createCurrent = function () {
  var currentDiv = document.createElement('div');
  var currentHeader = document.createElement('h2');
  currentDiv.classList.add('current-weather');
  // City Name & Date Header
  currentHeader.textContent = 'Arden';
  // Append to 
  currentDiv.append(currentHeader);
  // Loop creating current weather conditions
  for (var i = 0; i < 4; i++) {
    var newP = document.createElement('p');
    newP.textContent = cityWeatherData[i];
    currentDiv.append(newP);
  };
  weatherBlock.append(currentDiv);
};

// CREATE WEATHER BAR CONTENT
var displayWeather = function () {
  // Element Creation Variables
  var newForecastHeader = document.createElement('h3');
  var newForecastDiv = document.createElement('div');
  // Creates and appends current weather box (need to pass current weather API)
  createCurrent();
  // adds "5-Day Forecast" header
  newForecastHeader.textContent = '5-Day Forecast';
  // adds class to forecast container div
  newForecastDiv.classList.add('forecast-container');
  // appends forecast header and div to weather bar
  weatherBlock.append(newForecastHeader, newForecastDiv);

  // Creates daily forecast on loop (need to pass forecast API data)
  createForecast();
};

displayWeather();

// Creates buttons for stored cities on page load
var buttonCreation = function () {
  var container = document.querySelector('.button-container');
  for (var i = 0; i < totalSearches.length; i++) {
    var buttonField = document.createElement('button');
    buttonField.classList.add('searched-city-button');
    buttonField.textContent = totalSearches[i];
    container.appendChild(buttonField);
  };
};
// Calls button loading
buttonCreation();


// API CALLS

// Template literal for API Key Generation
// var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;
var apiCurrent = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&appid=7725fe6ddb0f977753dda606bc09c452';
var apiFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=7725fe6ddb0f977753dda606bc09c452'
// Chicago test API
// 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&appid=7725fe6ddb0f977753dda606bc09c452'




// Fetching current information from Weather API
var getAPI = function () {
  var requestUrl = apiCurrent;
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.ok);
      return response.json();
    })
    .then(function (data) {
      currentDay = [data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi];
      return currentDay;
    });
    console.log(currentDay);
};
getAPI();

console.log(currentDay);


// BUTTON FUNCTIONALITY - NEED TO ADD CITY BUTTON FUNCTIONALITY
// Search button
cityFormEl.addEventListener('submit', searchCity);
// cityButtonEl.addEventListener('click', function () {
//  document.querySelector('.searched-city-button') = city;
// });

// for (var i = 0; i < totalSearches.length; i++) {
//   var buttonField = document.createElement('button');
//   buttonField.classList.add('searched-city-button');
//   buttonField.textContent = totalSearches[i];
// };