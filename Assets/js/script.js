// Defining Interactables
var cityInput = document.querySelector('.input-field');
var searchBtn = document.querySelector('.search-btn');
var weatherBlock = document.querySelector('.weather-bar');
var currentWeatherHeader = $('.current-weather').children('h2');
// Array for localStorage
var totalSearches = JSON.parse(localStorage.getItem('searches')) || [];
console.log(totalSearches);
// Array to store API array for populating the current weather creation
var cityWeatherData = ['temp', 'wind', 'humidity', 'uvi']
var forecastWeatherData = ['temp', 'wind', 'humidity',]




// DEFINING FUNCTIONS
// Storing input from input field
var searchCity = function () {
  var container = document.querySelector('.button-container');
  // Captures the input text of the adjoining input field
  var city = $(this).siblings('.input-field').val();
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
  buttonNew.textContent = city;
  container.appendChild(buttonNew);
  };
};

// Create Current Weather Field
var displayWeather = function () {
  // Element Creation Variables
  var currentDiv = document.createElement('div');
  var currentHeader = document.createElement('h2');
  var generalForecastHeader = document.createElement('h3');

  // ADDING CONTENT TO CURRENT WEATHER
  // Current Weather Div
  currentDiv.classList.add('current-weather');

  // City Name & Date Header
  currentHeader.textContent = 'Arden';
  
  // Appending dynamically created children to elements
  currentDiv.append(currentHeader);

// LOOP CREATING CURRENT WEATHER CONDITIONS
  for (var i = 0; i < 4; i++) {
    var newP = document.createElement('p');
    newP.textContent = cityWeatherData[i];
    currentDiv.append(newP);
  };
  // 5-DAY FORECAST HEADER
  generalForecastHeader.textContent = '5-Day Forecast';

  weatherBlock.append(currentDiv);
  weatherBlock.append(generalForecastHeader);
  // FORECAST CONDITIONS
  for (var i = 0; i < 5; i++) {
    var newForecastDiv = document.createElement('div');
    var newForecastHeader = document.createElement('h4');

    newForecastDiv.classList.add('forecast-day');
    newForecastHeader.textContent = 'Forecast';
    newForecastDiv.append(newForecastHeader);

    for (var j = 0; j < 3; j++) {
    newP.textContent = forecastWeatherData[i];
    newForecastDiv.append(newP);
    };
    weatherBlock.append(newForecastDiv);
  };
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




// Template literal for API Key Generation
// var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;
var api = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&appid=7725fe6ddb0f977753dda606bc09c452';

// Chicago test API
// 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&appid=7725fe6ddb0f977753dda606bc09c452'




// Fetching current information from Weather API
var getAPI = function () {
  var requestUrl = api;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // This is how I will reference the data needed
      console.log(data.current.temp);
      console.log(data.current.wind_gust);
      console.log(data.current.humidity);
      console.log(data.current.uvi);
    });
};
getAPI();

// BUTTON FUNCTIONALITY
// Search button
searchBtn.addEventListener('click', searchCity);

// for (var i = 0; i < totalSearches.length; i++) {
//   var buttonField = document.createElement('button');
//   buttonField.classList.add('searched-city-button');
//   buttonField.textContent = totalSearches[i];
// };