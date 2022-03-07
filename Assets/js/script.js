// Defining Interactables
var cityInput = document.querySelector('.input-field');
var searchBtn = document.querySelector('.search-btn');
var totalSearches = [];
// JSON.parse(localStorage.getItem('searches')) ||



// DEFINING FUNCTIONS
// Storing input from input field
var searchCity = function () {
  var city = $(this).siblings('.input-field').val();
  console.log(city);
  totalSearches.push(city);
  console.log(totalSearches);
  var storage = JSON.stringify(totalSearches);
  localStorage.setItem('searches', totalSearches);
  buttonCreation();
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

for (var i = 0; i < totalSearches.length; i++) {
  var buttonField = document.createElement('button');
  buttonField.classList.add('searched-city-button');
  buttonField.textContent = totalSearches[i];
};