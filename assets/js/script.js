var card1 = document.getElementById("#1");
var card2 = document.getElementById("#2");

// get current time from moment
var time = moment();
// places the date in the main header 
$("#momentDate").text(time.format("DD/MM/YYYY"));

// Add your own API key between the ""
var APIKey = "bd5a66ab99bbf1e26c28bc82ed4a9f87";


$("#search-button").on("click", function(event) {
  // takes information from the text box with id 'search-input'
  event.preventDefault();
 
  //sets a vat with the contents of the text entry box (e.g. a place name)
  var location = $("#search-input").val();

  //makes sure that data has been entered. ends the function if there is no data.
  if (location === "") {
    console.log("nope");
    return 0;
  }
  
  //gets infomation for the location including lat and long which are needed for the 5 day forcast.
  var coordinateConverter =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&appid=" +
    APIKey;
  // console.log(coordinateConverter);

  //converts API data into an array using an ajax (Asynchronous JavaScript And XML) function
  $.ajax({
    url: coordinateConverter,
    method: "GET",
  }).then(function (fiveDayResponse) {
    console.log(fiveDayResponse);

    // creates lat and long vars from the response values from the coordinateConverter.
    var lat = fiveDayResponse[0].lat;
    var long = fiveDayResponse[0].lon;

    // uses lat and long to call a 5 day forcast from the API
    var fiveDayForcast =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      long +
      "&appid=" +
      APIKey;
    //converts this data into an array using ajax
    $.ajax({
      url: fiveDayForcast,
      method: "GET",
    }).then(function (fiveDayForcastResponse) {
      console.log(fiveDayForcastResponse);
      
     
function logsTempEtc () {
      //  creates several vars to log city,humiditiy and temp data from current day. 
      var city = fiveDayResponse[0].name;
      console.log(city);
      $("#city").text(city);

      var humidity = fiveDayForcastResponse.list[0].main.humidity;
      $("#humidity").text("Relative humidity: " + humidity + "%");
      console.log("humidity " + humidity + "%");

      var wind = fiveDayForcastResponse.list[0].wind.speed;
      $("#wind").text("Wind speed: " + wind + " m/s");

      //converts the kelvin to celcius
      var kelvinToCelciusConverter = 273.15;
      var KelvinTemp = fiveDayForcastResponse.list[0].main.temp;
      var celciusTemp = (KelvinTemp - kelvinToCelciusConverter).toFixed(2);
      $("#temp").text("temperature: " + celciusTemp + " ºC");
      
    //Adds info to data card 1
      
    // $("#card-title1").text(fiveDayForcastResponse.list[8].dt_txt.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2-$3-$1'));

      $("#card-title1").text(fiveDayForcastResponse.list[7].dt_txt);
      $("#cardTemp1").text("temp: " + fiveDayForcastResponse.list[7].main.temp + " ºC");
      $("#cardHumidity1").text("humidity: " + fiveDayForcastResponse.list[7].main.humidity + "%");
      $("#cardWind1").text("Wind: " + fiveDayForcastResponse.list[7].wind.speed + " m/s");
                
      $("#card-title2").text(fiveDayForcastResponse.list[15].dt_txt);
      $("#cardTemp2").text("temp: " + fiveDayForcastResponse.list[15].main.temp + " ºC");
      $("#cardHumidity2").text("humidity: " + fiveDayForcastResponse.list[15].main.humidity + "%");
      $("#cardWind2").text("Wind: " + fiveDayForcastResponse.list[15].wind.speed + " m/s");
           
      $("#card-title3").text(fiveDayForcastResponse.list[23].dt_txt);
      $("#cardTemp3").text("temp: " + fiveDayForcastResponse.list[23].main.temp + " ºC");
      $("#cardHumidity3").text("humidity: " + fiveDayForcastResponse.list[23].main.humidity + "%");
      $("#cardWind3").text("Wind: " + fiveDayForcastResponse.list[23].wind.speed + " m/s");
               
      $("#card-title4").text(fiveDayForcastResponse.list[31].dt_txt);
      $("#cardTemp4").text("temp: " + fiveDayForcastResponse.list[31].main.temp + " ºC");
      $("#cardHumidity4").text("humidity: " + fiveDayForcastResponse.list[31].main.humidity + "%");
      $("#cardWind4").text("Wind: " + fiveDayForcastResponse.list[31].wind.speed + " m/s");  
           
      $("#card-title5").text(fiveDayForcastResponse.list[39].dt_txt);
      $("#cardTemp5").text("temp: " + fiveDayForcastResponse.list[39].main.temp + " ºC");
      $("#cardHumidity5").text("humidity: " + fiveDayForcastResponse.list[39].main.humidity + "%");
      $("#cardWind5").text("Wind: " + fiveDayForcastResponse.list[39].wind.speed + " m/s");
           

    }
    logsTempEtc ();

     
    });
  });

  function createButtons () {
  //creates new buttons on each location searched for in the div with the id 'history'
  var historyButtonsDiv = document.getElementById("history");

  // creating button element
  var newButton = document.createElement("button");
  //sets the attributes of the buttons to bootstrap configs
  newButton.setAttribute("class", "btn btn-secondary btn-block");

  // creating text to be displayed on button (the place name entered)
  var newButtonText = document.createTextNode(location);
  // appends text to button
  newButton.appendChild(newButtonText);
  // appending button to div
  historyButtonsDiv.appendChild(newButton);

  // How to save added buttons to local storage?? 
  // on click save all of capitals div to local storage?? 
  
}

createButtons(); 

});



// //saving the city buttons using local storage

// function saveToLocalStorage () {

// //creates an array to hold city buttons data 
// var citiesEntered = []

// //iterates through the array
// for (var i = 0; i < citiesEntered.length; i++) {
//   var citiesEnteredArray = citiesEntered[i]; 
// }


// citiesEntered.push(newButtonsText);

// localStorage.setItem("citiesEntered", JSON.stringify(citiesEnteredArray));

// console.log(citiesEnteredArray);

// }

// saveToLocalStorage (); 

function cardsFiveDayForcast (valuesObj) {

  

}

cardsFiveDayForcast(); 

// var citiesInput = document.querySelector("#search-input");
// var citiesForm = document.querySelector("#search-form");
// var citiesHistoryList = document.querySelector("history");
// // var todoCountSpan = document.querySelector("#todo-count");

// var citiesSearchedFor = [];

// init();

// function renderCitiesSearchFor() {
//   // Clear todoList element and update todoCountSpan
//   // citiesHistoryList.innerHTML = "";
//   // todoCountSpan.textContent = todos.length;

//   // Render a new li for each city
//   for (var i = 0; i < citiesSearchedFor.length; i++) {
//     var city = citiesSearchedFor[i];

//     var li = document.createElement("li");
//     li.textContent = bum;
//     li.setAttribute("data-index", i);

//     var button = document.createElement("button");
//     button.textContent = "Complete";

//     li.appendChild(button);    //<li data-index="1">LearnCSS <button>Complete</button></li>
//     citiesHistoryList.appendChild(li);
//   }
// }
// renderCitiesSearchFor();

// function init() {
//   // Get stored todos from localStorage
//   // Parsing the JSON string to an object
//   var storedCities = JSON.parse(localStorage.getItem("savedCities"));

//   // If todos were retrieved from localStorage, update the todos array to it
//   if (storedCities !== null) {
//     citiesSearchedFor = storedCities;
//   }

//     console.log(storedCities); 
//   // Render todos to the DOM
//   renderCitiesSearchFor();
// }

// function storeCities() {
//   // Stringify and set "todos" key in localStorage to todos array
//   localStorage.setItem("savedCities", JSON.stringify(citiesSearchedFor));
// }

// // When form is submitted...
// citiesForm.addEventListener("submit", function(event) {
//   event.preventDefault();

//   var citiesText = citiesInput.value.trim();

//   // Return from function early if submitted todoText is blank
//   if (citiesText === "") {
//     return;
//   }

//   // Add new todoText to todos array, clear the input
//   citiesSearchedFor.push(citiesText);
//  citiesInput.value = "";

//   // Store updated todos in localStorage, re-render the list
//   storeCities();
//   renderCitiesSearchFor();
// });

// // When a element inside of the todoList is clicked...
// todoList.addEventListener("click", function(event) {
//   var element = event.target;

//   // If that element is a button...
//   if (element.matches("button") === true) {
//     // Get its data-index value and remove the todo element from the list
//     var index = element.parentElement.getAttribute("data-index");
//     todos.splice(index, 1);

//     // Store updated todos in localStorage, re-render the list
//     storeTodos();
//     renderTodos();
//   }
// });




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
//       https://openweathermap.org/weather-conditions  

