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


// DEFINING FUNCTIONS

// FUNCTION: SENDS CITY NAME TO GET COORDINATES FUNCTION, AND CREATES BUTTONS FOR UNIQUE ENTRIES
var searchCity = function (event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  var container = document.querySelector('.button-container');
  // Translates city name to coordinates
  getCoordinates(city);
  // CONDITIONAL: add city to localStorage if not already there, and creates a button for unique entries
  if (totalSearches.includes(`${city}`)) {
    // remove item from array
    console.log('Already has city');
  } else {
    // Adds city to beginning of array in localStorage if not already there, and creates a button for unique entries
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

// FUNCTION: TRANSLATES CITY NAME TO COORDINATES
var getCoordinates = function (city) {
  var apiCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=7725fe6ddb0f977753dda606bc09c452`;
  fetch(apiCoordinates).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(city);
        createCurrentWeather(city, data[0].lat, data[0].lon);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

// CREATING CURRENT WEATHER BOX
// Fetching current information from Weather API, and then using it to populate the current weather conditions in the large box
var createCurrentWeather = function (city, lat, lon) {
  var currentDiv = document.createElement('div');
  currentDiv.classList.add('current-weather');
  var apiCurrent = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=7725fe6ddb0f977753dda606bc09c452`;
  fetch(apiCurrent)
    .then(function (response) {
      console.log(response.ok);
      return response.json();
    })
    .then(function (data) {
      var currentHeaderEl = document.createElement('h2');
      var imgEl = document.createElement('img');
      currentHeaderEl.classList.add('current-header');

      // Adds HTML address to source for generated image element, inserting weather icon code into HTML for API fetch
      imgEl.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

      // Pulling unix date from API, converting in moment.js, then adding to header content
      var dateString = moment.unix(data.current.dt).format("MM/DD/YYYY");
      currentHeaderEl.textContent = `${city}  (${dateString}) `;

      // Appending current weather header and weather icon
      currentDiv.append(currentHeaderEl, imgEl);

      // array of current weather condition to pass into <p> generation loop
      var apiPull = [`Temperature: ${data.current.temp} Kelvin`, `Wind Speed: ${data.current.wind_speed} MPH`, `Humidity: ${data.current.humidity}%`, `UVI Index: ${data.current.uvi}`];

      // Loop creating  and appending current weather conditions
      for (var i = 0; i < 4; i++) {
      var newP = document.createElement('p');
      newP.textContent = apiPull[i];
      currentDiv.append(newP);
      };
    });
  // Adding current weather div to weather bar
  weatherBlock.append(currentDiv);
  // Calls function to create "5 Day Forecast" Header and forecast div elements
  addForecastSection();
};

// var apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7725fe6ddb0f977753dda606bc09c452`;

// Fetching forecast information from Weather API
var fetchForecastWeather = function (lat, lon) {
  var forcastDay = [];
  fetch(apiForecast)
    .then(function (response) {
      console.log(response.ok);
      return response.json();
    })
    .then(function (data) {
      forcastDay = [data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi];
      console.log(forcastDay);
      return forcastDay;
    });
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

// CALL TO CREATE WEATHER BAR CONTENT
var addForecastSection = function () {
  // Element Creation Variables
  var newForecastHeader = document.createElement('h3');
  var forecastSectionEl = document.createElement('section');
  // Creates and appends current weather box (need to pass current weather API)
  // adds "5-Day Forecast" header
  newForecastHeader.textContent = '5-Day Forecast';
  // adds class to forecast container div
  forecastSectionEl.classList.add('forecast-container');
  // appends forecast header and div to weather bar
  weatherBlock.append(newForecastHeader, forecastSectionEl);
  // Creates daily forecast on loop (need to pass forecast API data)
  createForecast();
};

// Creates buttons for stored cities on page load
var buttonCreation = function () {
  var container = document.querySelector('.button-container');
  for (var i = 0; i < totalSearches.length; i++) {
    var buttonField = document.createElement('button');
    buttonField.classList.add('searched-city-button');
    buttonField.setAttribute('id', `${totalSearches[i]}`);
    buttonField.textContent = totalSearches[i];
    container.appendChild(buttonField);
  };
};
// Calls button loading
buttonCreation();


var apiFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=7725fe6ddb0f977753dda606bc09c452'
// Chicago test API
// 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely,alerts&appid=7725fe6ddb0f977753dda606bc09c452'



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