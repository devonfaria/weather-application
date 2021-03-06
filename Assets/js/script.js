// Defining Interactables
var cityFormEl = document.getElementById('city-form');
var cityInputEl = document.querySelector('.input-field');
var cityButtonEl;
var searchBtn = document.querySelector('.search-btn');
var weatherBlock = document.querySelector('.weather-bar');
// Array for localStorage
var totalSearches = JSON.parse(localStorage.getItem('searches')) || [];


// DEFINING FUNCTIONS

// FUNCTION: SENDS CITY NAME TO GET COORDINATES FUNCTION AND CLEARS ANY WEATHER INFO
var handleSubmission = function (event) {
  event.preventDefault();
  // removes HTML from weather bar
  document.querySelector('.weather-bar').innerHTML = '';
  var city = cityInputEl.value.trim();
  // Translates city name to coordinates
  getCoordinates(city);
};

// FUNCTION: TRANSLATES CITY NAME TO COORDINATES FOR API PULLS, OR ALERTS TO SEARCHES NOT FOUND
var getCoordinates = function (city) {
  var weatherBar = document.querySelector('.weather-bar');
  var cityName = city;
  var apiCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=7725fe6ddb0f977753dda606bc09c452`;
  fetch(apiCoordinates)
    .then(function (response) {
      if (response.ok) {
      response.json()
      .then(function (data) {
        if (!data.length) {
          // If no city was found by input name, post 'no results found'
          var notFound = document.createElement('h2');
          notFound.textContent = `Results for '${city}' were not found.`
          weatherBar.append(notFound);
          return;
        } else {
          // Creates button for unique cities and then starts page generation
          addButton(cityName);
          createCurrentWeather(city, data[0].lat, data[0].lon);
          createForecast(data[0].lat, data[0].lon);
        };
      });
      } else {
        var notFound = document.createElement('h2');
        notFound.textContent = `Results for '  ' were not found.`;
        weatherBar.append(notFound);
      }
  });
};

// FUNCTION: Adds city name to button and local storage if new
var addButton = function (city) {
  var container = document.querySelector('.button-container');

  // conditional: add city to localStorage if not already there, and creates a button for unique entries
  if (totalSearches.includes(`${city}`)) {
    return;
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

// FUNCTION: CREATING CURRENT WEATHER BOX
// Fetching current information from Weather API, and then using it to populate the current weather conditions in the large box
var createCurrentWeather = function (city, lat, lon) {
  // creates current weather box
  var currentDiv = document.createElement('div');
  currentDiv.classList.add('current-weather');

  // Pulls forecast data
  var apiCurrent = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,alerts&appid=7725fe6ddb0f977753dda606bc09c452`;
  fetch(apiCurrent)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentHeaderEl = document.createElement('h2');
      var imgEl = document.createElement('img');
      currentHeaderEl.classList.add('current-header');

      // Weather icon code from API fetch completes Icon URL
      imgEl.src = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

      // Pulling unix date from API, converting in moment.js, then adding to header content
      var dateString = moment.unix(data.current.dt).format("MM/DD/YYYY");
      currentHeaderEl.textContent = `${city}  (${dateString}) `;

      // Appending current weather header and weather icon
      currentDiv.append(currentHeaderEl, imgEl);

      // Array of current weather condition to pass into <p> generation loop
      var apiPull = [`Temperature: ${data.current.temp}?? F`, `Wind Speed: ${data.current.wind_speed} MPH`, `Humidity: ${data.current.humidity}%`];

      // Loop creating and appending current weather conditions
      for (var i = 0; i < 3; i++) {
        var newP = document.createElement('p');
        newP.textContent = apiPull[i];
        currentDiv.append(newP);
      };
      var newUVI = document.createElement('p');
      // Conditional that assigns the color of UV Index
      if (data.current.uvi < 3) {
        newUVI.innerHTML = 'UVI Index: ' + `<span class='safe'>${data.current.uvi}%</span>`;
      } else if(data.current.uvi > 5){
        newUVI.innerHTML = 'UVI Index: ' + `<span class='severe'>${data.current.uvi}%</span>`;
      } else {
        newUVI.innerHTML = 'UVI Index: ' + `<span class='moderate'>${data.current.uvi}%</span>`;
      };
    currentDiv.append(newUVI);
    });
  // Adding current weather div to weather bar
  weatherBlock.append(currentDiv);
  // Calls function to create "5 Day Forecast" Header
  addForecastHeader();
};

// FUNCTION: CREATE FORECAST SECTION HEADER
var addForecastHeader = function () {
  var newForecastHeader = document.createElement('h3');
  newForecastHeader.textContent = '5-Day Forecast';
  // Appends forecast header to weather bar
  weatherBlock.append(newForecastHeader);
};

// FUNCTION: CREATES DAILY FORECAST
// Uses loop and API calls to generate next five days of forecast conditions and places data into div elements
var createForecast = function (lat, lon) {
  var forecastSectionEl = document.createElement('section');
  forecastSectionEl.classList.add('forecast-container', 'row', 'justify-content-between');
  var apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely,alerts&appid=7725fe6ddb0f977753dda606bc09c452`;
  fetch(apiForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Loop creating daily forecast elements and populating them
      for (var i = 1; i < 6; i++) {
        var forecastEl = document.createElement('div');
        forecastEl.classList.add('forecast-day', 'col');
        var forecastHeaderEl = document.createElement('h2');
        var imgEl = document.createElement('img');
        forecastHeaderEl.classList.add('forecast-header');
        imgEl.src = `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;

        // Pulling unix date from API, converting in moment.js, then adding to header content
        var dateString = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
        forecastHeaderEl.textContent = `${dateString}`;

        // Appending date header and weather icon
        forecastEl.append(forecastHeaderEl, imgEl);

        // Array of forecast condition strings for content generation
        var apiPull = [`Temp: ${data.daily[i].temp.day}?? F`, `Wind: ${data.daily[i].wind_speed} MPH`, `Humidity: ${data.daily[i].humidity}%`];

        // Loop creating  and appending daily weather conditions to parent div
        for (var j = 0; j < 3; j++) {
          var newP = document.createElement('p');
          newP.textContent = apiPull[j];
          forecastEl.append(newP);
        };
      
          
          // Adding daily forecast weather div to weather bar
        forecastSectionEl.append(forecastEl);
      };
    });
    // Adds forecase section to weather bar
    weatherBlock.append(forecastSectionEl);
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
// Calls button loading from localStorage
buttonCreation();

// BUTTON FUNCTIONALITY

// Search button
cityFormEl.addEventListener('submit', handleSubmission);
// Generated City Buttons
$(document).on('click', '.searched-city-button', function (event) {
  document.querySelector('.weather-bar').innerHTML = '';
  var cityName = $(this).attr('id');
  getCoordinates(cityName);
});
