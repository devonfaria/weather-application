// Defining Interactables
var cityInput = document.querySelector('.input-field');
var searchBtn = document.querySelector('.search-btn');
var weatherBlock = document.querySelector('.weather-bar');
var currentWeatherHeader = $('.current-weather').children('h2');
// Array for localStorage
var totalSearches = JSON.parse(localStorage.getItem('searches')) || [];
console.log(totalSearches);


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

// Populate Current Weather Field
var displayWeather = function () {
  var newDiv = document.createElement('div');
  var newHeader = document.createElement('h2')
  // May have to loop
  var newP = document.createElement('p');

  // currentWeatherHeader.textContent = 'Arden';
  // console.log(currentWeatherHeader.textContent);

  // Current Weather Div
  newDiv.classList.add('current-weather');

  // Header Styling
  newHeader.textContent = 'Arden';

  // Paragraph Styling
  newP.textContent = 'Arden 2';

  // Appending dynamically created children to elements
  newDiv.append(newHeader, newP);
  weatherBlock.append(newDiv);
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

// Fetching information from Weather API
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