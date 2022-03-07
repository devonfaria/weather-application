// Defining Interactables
var cityInput = document.querySelector('.input-field');
var searchBtn = document.querySelector('.search-btn');
var totalSearches = JSON.parse(localStorage.getItem('searches')) || [];



// DEFINING FUNCTIONS
// Storing input from input field
var searchCity = function () {
  var city = $(this).siblings('.input-field').val();
  console.log(city);
  totalSearches.push(city);
  console.log(totalSearches);
  var storage = JSON.stringify(totalSearches);
  localStorage.setItem('searches', totalSearches);
}

// BUTTON FUNCTIONALITY
// Search button
searchBtn.addEventListener('click', searchCity);
