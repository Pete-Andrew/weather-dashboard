var cityInput = document.querySelector("#search-input");
// var historyButtonForm = document.querySelector("#search-form");
var historyButtonList = document.querySelector("#history");
var clearHistoryButton = "#clear-history-button";

// localStorage.clear();

var historyButtonsArray = JSON.parse(localStorage.getItem("placeHistory")) || []; 


// get current time from moment
var time = moment();
// places the date in the main header
$("#momentDate").text(time.format("DD-MM-YYYY"));

// Add your own API key between the ""
var APIKey = "bd5a66ab99bbf1e26c28bc82ed4a9f87";

//gets elements and sets their display to "none", which hides the icons and cards
document.getElementById("weatherIcon").style.display = "none";
document.getElementById("forecast").style.display = "none";

function clearHistory() {
  $("#clear-history-button").on("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    location.reload();
  });
}
clearHistory();

  $("#search-button").on("click", function (event) {
    // takes information from the text box with id 'search-input'
    event.preventDefault();

    //sets a var with the contents of the text entry box (e.g. a place name)
    var location = $("#search-input").val();

    //makes sure that data has been entered. ends the function if there is no data.
    if (location === "") {
      console.log("nope");
      return 0;
    }

    //gets elements and sets their display to "", which clears the JS appended style above and makes the divs visible.
    document.getElementById("weatherIcon").style.display = "";
    document.getElementById("forecast").style.display = "";

    pushLocationToArray(location);
    saveToLocalStorage(location);
    createHistoryButtons();
    clickedHistoryButton();
    convertLocationToAPI(location);
  });




function pushLocationToArray(location) {
  //updates the history buttons array by adding location names

  historyButtonsArray.push(location);
  console.log("historyButtonsArray: " + historyButtonsArray);
}
//  pushLocationToArray();

function convertLocationToAPI(location) {
  //gets infomation for the location including lat and long which are needed for the 5 day forcast.
  var coordinateConverter =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&appid=" +
    APIKey;
  // console.log(coordinateConverter);

  //converts API data into an array using an ajax (Asynchronous JavaScript And XML) function
  $.ajax({
    url: coordinateConverter,
    method: "GET",
  }).then(function (fiveDayResponse) {
    // console.log(fiveDayResponse);

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
      logsTempEtc(fiveDayForcastResponse);
      addsInfoToCards(fiveDayForcastResponse);
      console.log("fiveDayForcastResponse: ", fiveDayForcastResponse);
    });

    function logsTempEtc(fiveDayForcastResponse) {
      //  creates several vars to log city,humiditiy and temp data from current day.
      var city = fiveDayResponse[0].name;
      console.log("this is the place name entered: " + city);
      $("#city").text(city);

      var humidity = fiveDayForcastResponse.list[0].main.humidity;
      $("#humidity").text("Relative humidity: " + humidity + "%");
      // console.log("humidity " + humidity + "%");

      var wind = fiveDayForcastResponse.list[0].wind.speed;
      $("#wind").text("Wind speed: " + wind + " m/s");

      //converts the kelvin to celcius
      var kelvinToCelciusConverter = 273.15;
      var KelvinTemp = fiveDayForcastResponse.list[0].main.temp;
      var celciusTemp = (KelvinTemp - kelvinToCelciusConverter).toFixed(2);
      $("#temp").text("temperature: " + celciusTemp + " ºC");

      //adds the weatherIcon
      //gets the code for the weather icon from the API and stores it as a variable
      var weatherIconCode = fiveDayForcastResponse.list[0].weather[0].icon;
      // creates a full URL that links to the weather API icons and renders the above code as an icon
      var weatherIconURL =
        "https://openweathermap.org/img/w/" + weatherIconCode + ".png";

      //sets the attributes of the weatherIcon id as the weatherIconURL.
      $("#weatherIcon").attr("src", weatherIconURL);
    }

    logsTempEtc();

    function addsInfoToCards(fiveDayForcastResponse) {
      //Adds info to data cards
      //really WET code :( Needs to be improved with a loop!

      $("#card-title1").text(
        fiveDayForcastResponse.list[7].dt_txt.replace(
          /(\d{4})\-(\d{2})\-(\d{2}).*/,
          "$3-$2-$1"
        )
      );
      $("#cardHumidity1").text(
        "humidity: " + fiveDayForcastResponse.list[7].main.humidity + "%"
      );
      $("#cardWind1").text(
        "Wind: " + fiveDayForcastResponse.list[7].wind.speed + " m/s"
      );
      var kelvinToCelciusConverter1 = 273.15;
      var KelvinTemp1 = fiveDayForcastResponse.list[7].main.temp;
      var celciusTemp1 = (KelvinTemp1 - kelvinToCelciusConverter1).toFixed(1);
      $("#cardTemp1").text("temp: " + celciusTemp1 + " ºC");

      var weatherIconCode1 = fiveDayForcastResponse.list[7].weather[0].icon;
      // console.log(weatherIconCode1);
      var weatherIconURL1 =
        "https://openweathermap.org/img/w/" + weatherIconCode1 + ".png";
      // console.log(weatherIconURL1);
      $("#weatherIcon1").attr("src", weatherIconURL1);

      $("#card-title2").text(
        fiveDayForcastResponse.list[15].dt_txt.replace(
          /(\d{4})\-(\d{2})\-(\d{2}).*/,
          "$3-$2-$1"
        )
      );
      $("#cardTemp2").text(
        "temp: " + fiveDayForcastResponse.list[15].main.temp + " ºC"
      );
      $("#cardHumidity2").text(
        "humidity: " + fiveDayForcastResponse.list[15].main.humidity + "%"
      );
      $("#cardWind2").text(
        "Wind: " + fiveDayForcastResponse.list[15].wind.speed + " m/s"
      );
      var kelvinToCelciusConverter2 = 273.15;
      var KelvinTemp2 = fiveDayForcastResponse.list[15].main.temp;
      var celciusTemp2 = (KelvinTemp2 - kelvinToCelciusConverter2).toFixed(1);
      $("#cardTemp2").text("temp: " + celciusTemp2 + " ºC");

      var weatherIconCode2 = fiveDayForcastResponse.list[15].weather[0].icon;
      // console.log(weatherIconCode2);
      var weatherIconURL2 =
        "https://openweathermap.org/img/w/" + weatherIconCode2 + ".png";
      // console.log(weatherIconURL2);
      $("#weatherIcon2").attr("src", weatherIconURL2);

      $("#card-title3").text(
        fiveDayForcastResponse.list[23].dt_txt.replace(
          /(\d{4})\-(\d{2})\-(\d{2}).*/,
          "$3-$2-$1"
        )
      );
      $("#cardTemp3").text(
        "temp: " + fiveDayForcastResponse.list[23].main.temp + " ºC"
      );
      $("#cardHumidity3").text(
        "humidity: " + fiveDayForcastResponse.list[23].main.humidity + "%"
      );
      $("#cardWind3").text(
        "Wind: " + fiveDayForcastResponse.list[23].wind.speed + " m/s"
      );
      var kelvinToCelciusConverter3 = 273.15;
      var KelvinTemp3 = fiveDayForcastResponse.list[23].main.temp;
      var celciusTemp3 = (KelvinTemp3 - kelvinToCelciusConverter3).toFixed(1);
      $("#cardTemp3").text("temp: " + celciusTemp3 + " ºC");

      var weatherIconCode3 = fiveDayForcastResponse.list[23].weather[0].icon;
      // console.log(weatherIconCode3);
      var weatherIconURL3 =
        "https://openweathermap.org/img/w/" + weatherIconCode3 + ".png";
      // console.log(weatherIconURL3);
      $("#weatherIcon3").attr("src", weatherIconURL3);

      $("#card-title4").text(
        fiveDayForcastResponse.list[31].dt_txt.replace(
          /(\d{4})\-(\d{2})\-(\d{2}).*/,
          "$3-$2-$1"
        )
      );
      $("#cardTemp4").text(
        "temp: " + fiveDayForcastResponse.list[31].main.temp + " ºC"
      );
      $("#cardHumidity4").text(
        "humidity: " + fiveDayForcastResponse.list[31].main.humidity + "%"
      );
      $("#cardWind4").text(
        "Wind: " + fiveDayForcastResponse.list[31].wind.speed + " m/s"
      );
      var kelvinToCelciusConverter4 = 273.15;
      var KelvinTemp4 = fiveDayForcastResponse.list[31].main.temp;
      var celciusTemp4 = (KelvinTemp4 - kelvinToCelciusConverter4).toFixed(1);
      $("#cardTemp4").text("temp: " + celciusTemp4 + " ºC");

      var weatherIconCode4 = fiveDayForcastResponse.list[31].weather[0].icon;
      // console.log(weatherIconCode4);
      var weatherIconURL4 =
        "https://openweathermap.org/img/w/" + weatherIconCode4 + ".png";
      // console.log(weatherIconURL4);
      $("#weatherIcon4").attr("src", weatherIconURL4);

      $("#card-title5").text(
        fiveDayForcastResponse.list[39].dt_txt.replace(
          /(\d{4})\-(\d{2})\-(\d{2}).*/,
          "$3-$2-$1"
        )
      );
      $("#cardTemp5").text(
        "temp: " + fiveDayForcastResponse.list[39].main.temp + " ºC"
      );
      $("#cardHumidity5").text(
        "humidity: " + fiveDayForcastResponse.list[39].main.humidity + "%"
      );
      $("#cardWind5").text(
        "Wind: " + fiveDayForcastResponse.list[39].wind.speed + " m/s"
      );
      var kelvinToCelciusConverter5 = 273.15;
      var KelvinTemp5 = fiveDayForcastResponse.list[15].main.temp;
      var celciusTemp5 = (KelvinTemp5 - kelvinToCelciusConverter5).toFixed(1);
      $("#cardTemp5").text("temp: " + celciusTemp5 + " ºC");

      var weatherIconCode5 = fiveDayForcastResponse.list[39].weather[0].icon;
      // console.log(weatherIconCode5);
      var weatherIconURL5 =
        "https://openweathermap.org/img/w/" + weatherIconCode5 + ".png";
      // console.log(weatherIconURL5);
      $("#weatherIcon5").attr("src", weatherIconURL5);
    }
    addsInfoToCards();
  });
}

function saveToLocalStorage() {
  //stingifys the historyButtonsArray. A common use of JSON is to exchange data to/from a web server.
  //When sending data to a web server, the data has to be a string. Convert a JavaScript object into a string with JSON.stringify().
  //convert it back from a string with JSON.parse();

  //adds the historyButtonsArray to the local storage
  localStorage.setItem("placeHistory", JSON.stringify(historyButtonsArray));
}

function callFromLocalStorage() {
  var storedButtons = JSON.parse(localStorage.getItem("placeHistory"));
  console.log("storedButtons from local storage: " + storedButtons);

  for (var i = 0; i < storedButtons.length; i++) {
    var storedButtonsRendered = document.createElement("button");
    storedButtonsRendered.setAttribute(
      "class",
      "btn btn-secondary btn-block history-button"
    );

    // historyButtonsRendered.setAttribute("data-index", i);
    storedButtonsRendered.textContent = storedButtons[i];
    storedButtonsRendered.value = storedButtons[i];
    //adds an event listener to the history buttons
    storedButtonsRendered.addEventListener("click", function (event) {
      //reveals cards
      document.getElementById("weatherIcon").style.display = "";
      document.getElementById("forecast").style.display = "";
      //runs the convertLocationToAPI function but passes it the value of the target button.
      convertLocationToAPI(event.target.value);
    });

    historyButtonList.appendChild(storedButtonsRendered);

    // dynamicallyCreateButtonsFromLocalStorage(storedButtons);
  }
}
callFromLocalStorage();

function createHistoryButtons() {
  // var historyButtonsArray2 = JSON.parse(storedButtons);
  var historyButtons = JSON.parse(localStorage.getItem("placeHistory"));

  //clears the buttons list and relogs the buttons so you don't get doubled enteries.
  historyButtonList.innerHTML = "";

  //
  for (var i = 0; i < historyButtons.length; i++) {
    var historyButtonsRendered = document.createElement("button");
    historyButtonsRendered.setAttribute(
      "class",
      "btn btn-secondary btn-block history-button"
    );

    // historyButtonsRendered.setAttribute("data-index", i);
    historyButtonsRendered.textContent = historyButtons[i];

    historyButtonsRendered.value = historyButtons[i];

    historyButtonsRendered.addEventListener("click", function (event) {
      convertLocationToAPI(event.target.value);
    });

    historyButtonList.appendChild(historyButtonsRendered);
  }
}

function clickedHistoryButton() {
  $(".btn-secondary").on("click", function (event) {
    // takes information from the text box with id 'search-input'
    event.preventDefault();

    var buttonName = `${event.target.innerHTML}`;

    console.log("the name of the button clicked on: " + buttonName);
  });
}
clickedHistoryButton();

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
