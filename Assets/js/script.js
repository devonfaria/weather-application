// Defining Interactables
var cityInput = document.querySelector('.input-field');
var searchBtn = document.querySelector('.search-btn');
var totalSearches = [];
// JSON.parse(localStorage.getItem('searches')) ||



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
  // buttonCreation();
  };
};

var buttonCreation = function () {
  var container = document.querySelector('.button-container');
  for (var i = 0; i < totalSearches.length; i++) {
    var buttonField = document.createElement('button');
    buttonField.classList.add('searched-city-button');
    buttonField.textContent = totalSearches[i];
    container.appendChild(buttonField);
  };
};

// BUTTON FUNCTIONALITY
// Search button
searchBtn.addEventListener('click', searchCity);

// for (var i = 0; i < totalSearches.length; i++) {
//   var buttonField = document.createElement('button');
//   buttonField.classList.add('searched-city-button');
//   buttonField.textContent = totalSearches[i];
// };