// Defining Interactables
var cityInput = document.querySelector('.input-field');
var searchBtn = document.querySelector('.search-btn');

// BUTTON FUNCTIONLITY
searchBtn.addEventListener('click', function () {
  var city = $(this).siblings('.input-field').val();
  console.log(city); 
});
