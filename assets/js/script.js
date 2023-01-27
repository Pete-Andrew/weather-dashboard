

// get current time from moment
var time = moment();
// places the date in the main header 
$("#momentDate").text(time.format("dddd, Do, MMMM"));


// Create and save a reference to new empty table row
var tableRow = $('<tr>')
// Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
var tableDataTitle = $('<td id="title">')
var tableDataYear = $('<td id= "year">')
var tableDataActors = $('<td id="actors">')


// Add your own API key between the ""
var APIKey = "bd5a66ab99bbf1e26c28bc82ed4a9f87";

// Here we are building the URL we need to query the database

$("#search-button").on("click", function(event) {
// takes information from the text box with id 'search-input'
  var location = $("#search-input").val(); 

  event.preventDefault();

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + APIKey;

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  // Create CODE HERE to Log the queryURL
  console.log(queryURL);
  // Create CODE HERE to log the resulting object
  console.log(response);
  
  
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  var celsiusTemperature = Math.floor(response.main.temp - 273.15);
  // Create CODE HERE to transfer content to HTML
  var myTempDiv = $('.temp');
  myTempDiv.text(celsiusTemperature + " degrees Celsius");
  var city = response.name;
  var humidity = response.main.humidity;
  var wind = response.wind.speed;
  $('.city').text("Weather for " + city);
  $('.humidity').text("Relative humidity: " + humidity + "%");
  $('.wind').text("Wind speed: " + wind + " m/s");
  // Hint: To convert from Kelvin to Celsius: C = K - 273.15
  // Create CODE HERE to dump the temperature content into HTML

});

});


// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={}

// # Module 8 Server-Side APIs: Weather Dashboard

// ## Your Task

// Server APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

// Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The link should take you to a guide on how to use the 5 Day Forecast API. You will need to register for an API key in order to use this API. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

// The base URL for your API calls should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.

// **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).
 
// ## User Story

// ```text
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// ## Acceptance Criteria

// * Create a weather dashboard with form inputs.
//   * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
//   * When a user views the current weather conditions for that city they are presented with:
//     * The city name
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//     * The wind speed
//   * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city

//notes: http://osp123.github.io/tutorials/html/weatherAPI.html