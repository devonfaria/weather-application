# Devon Faria - Weather Dashboard

[Link to working page](https://devonfaria.github.io/weather-application/)

## Table of Contents

* [Description](#description)
* [Visuals](#visuals)
* [Support](#support)
* [Contributions](#contributions)

## Description

Welcome to the daily Weather Dashboard application! This application will allow you to search for a city, and retrieve current weather conditions and a 5-Day Forecast.

When you search a city, the javascript will attempt to pull the city coordinates from Open Weather API. If it is found, the application will begin fetching weather data to generate the HTML elements that appear on the right, and create a saved search button in the search bar. If not, it will show a heading "Results for '' were not found."

The current weather bar will show a large jumbotron with the searched city name, current date, and a list of the current temperature, wind, humidity, and UVI conditions. An icon will appear next to the header that coorelates with the weather condition. The UVI value will either have a green, yellow, or red box around it, indicating safe, moderate, and severe UVI conditions. Data pulled from Open Weather API.

Underneath the current weather box, the application will generate 5 Daily Forecast boxes. Each will have the following day's date and temp, wind, and humidity conditions with a weather icon to match.

Searched cities will be stored in localStorage so that upon reload, all of the previously ssearched cities have a button to quickly revisit the weather. No duplicates will be stored.

## Visuals

The following layout is what you can expect to see on your browser.

![alt text](./assets/images/weather-dashboard.gif)

This is the error that will display if you submit nothing into the input field.

![alt text](./assets/images/bad-request.png)

## Support

Contact me at devonfaria@gmail.com if you need assistance downloading or activating this repository.

## Contributions

A huge thank you to Anthony Cooper who has been extra diligent is explaining core topics during these last few lectures, when it was most important. 
