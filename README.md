# Devon Faria - Weather Dashboard

[Link to working page](https://devonfaria.github.io/weather-application/)

## Table of Contents

* [Description](#description)
* [Visuals](#visuals)
* [Technologies](#technologies)
* [Licenses](#licenses)
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

![weather dashboard landing page](./assets/images/weather-dashboard.gif)

This is the error that will display if you submit nothing into the input field.

![no city found error](./assets/images/bad-request.png)

## Technologies

* HTML
* CSS
* JavaScript
* Open Weather API

## Licenses

The MIT License (MIT)

Copyright (c) 2022 Devon Faria

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Support

Contact me at devonfaria@gmail.com if you need assistance downloading or activating this repository.

## Contributions

A huge thank you to Anthony Cooper who has been extra diligent is explaining core topics during these last few lectures, when it was most important. 
