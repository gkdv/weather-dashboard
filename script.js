var apiKey = '25f5253d7be788ad89940c40b9d3c859';
// on click event for passing in search city input for ajax call.
$('button').on('click', function (event) {
    event.preventDefault();
    var cityName = $('#citySearch').val();
    $("form").trigger("reset");
    apiCall(cityName);
    listCity(cityName);
    forecastWeather(cityName);
})

//function passes in city name from above to run ajax call for all the information needed
function apiCall(cityName) {

    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=' + apiKey + '&q=' + cityName + '&units=imperial'

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        clearCurrentCity();
        console.log(response)
        // variables needed for current weather

        var cityName = response.name;
        var cityDate = response.dt_txt;
        var cityTemp = response.main.temp;
        var cityHumidity = response.main.humidity;
        var cityWind = response.wind.speed;

        // process for getting the UV index for city. Make another ajax call based on lat and long from first ajax call to get respective UV index value.
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        var returnDays = 5; //returns 5 day forecast JSON format index of 0.
        var queryURLuvi = 'http://api.openweathermap.org/data/2.5/uvi/forecast?id=524901&APPID=' + apiKey + '&lat=' + cityLat + '&lon=' + cityLon + '&cnt=' + returnDays
        $.ajax({
            url: queryURLuvi,
            method: 'GET'
        }).then(function (uvi) {
            console.log(uvi);
            var cityUVI = uvi[0].value;
            function logUVIvalue(uvi) {
                $('#uv-index').append(`<h3>UV index: ${cityUVI}</h3>`)
            }
            logUVIvalue();
        })

        function logResults(response) {
            $('#city').append(`<h1>City: ${cityName}</h1>`)
            $('#date').append(`<h3>Date: ${cityDate}</h3>`)
            $('#temp').append(`<h3>Temperature: ${cityTemp} F</h3>`)
            $('#humidity').append(`<h3>Humidity: ${cityHumidity} RH</h3>`)
            $('#wind-speed').append(`<h3>Wind Speed: ${cityWind} mph</h3>`)
        }
        logResults();
        iconImage(response);


    });

}

// function clears current city information from current city information div.
function clearCurrentCity() {
    $('#city').html('')
    $('#date').html('')
    $('#temp').html('')
    $('#humidity').html('')
    $('#wind-speed').html('')
}

// appends new city from search to a list under the search bar.
function listCity(cityName) {
    $('.list-group').append(`<a class="list-group-item list-group-item-action" href="#list-item-3">${cityName}</a>`)
}
// function for creating icon image for current weather div.
function iconImage(response) {
    var iconCode = response.weather[0].icon;
    var iconDescription = response.weather[0].description;
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    $('#icon-image').append(`<div id="icon"><img id="wicon" src="" alt="Weather icon"></div>`);
    $('#icon-image').append(`<h3>${iconDescription}</h3>`);
    $('#wicon').attr('src', iconURL);
}
// function grabbing forecast weather data.
function forecastWeather(cityName) {
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=' + apiKey + '&q=' + cityName + '&units=imperial'

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var dates = [];
        var iconCodes = [];
        var temps = [];
        var humidities = [];
        var descriptions = [];
    
        for (i = 4; i < (response.list).length; i+=8) {
            var date = response.list[i].dt_txt;
            var iconCode = response.list[i].weather[0].icon;
            var description = response.list[i].weather[0].description;
            var temp = response.list[i].main.temp;
            var humidity = response.list[i].main.humidity;

            temps.push(temp)
            dates.push(date)
            iconCodes.push(iconCode)
            humidities.push(humidity)
            descriptions.push(description)
        }
        console.log(dates)    
        console.log(temps)    
        console.log(iconCodes)    

        for (i = 0; i < ($('#forecastCards').children()).length; i++){
            var divIndex = $('#forecastCards').children().eq([i]);
            var datesString = dates[i].toString();
            var datesSlice = datesString.slice(8,10);
            var image = iconCodes[i];
            var iconURL = "http://openweathermap.org/img/wn/" + image + "@2x.png";

            divIndex.append(`<div id="icon"><img id="wicon-forecast" src="${iconURL}" alt="Weather icon"></div>`);
            // $('#wicon-forecast').attr('src', iconURL);
            
            divIndex.append(`<p><small>${descriptions[i]}</small></p>`);
            divIndex.append(`<p><small>${datesSlice}th</small></p>`)
            divIndex.append(`<p><small>${temps[i]} F</small></p>`)
            divIndex.append(`<p><small>${humidities[i]} RH</small></p>`)
            divIndex.append(`<p><small>${descriptions[i]}</small></p>`)

        }
    })
}