var apiKey = '25f5253d7be788ad89940c40b9d3c859'
// on click event for passing in search city input for ajax call.
$('button').on('click', function (event) {
    event.preventDefault();
    var cityName = $('#citySearch').val();
    $("form").trigger("reset");
    apiCall(cityName);
})
function apiCall(cityName) {

    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=' + apiKey + '&q=' + cityName + '&units=imperial'

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        // variables needed for current weather

        var cityName = response.city.name;
        var cityDate = response.list[0].dt_txt;
        var cityTemp = response.list[0].main.temp;
        var cityHumidity = response.list[0].main.humidity;
        var cityWind = response.list[0].wind.speed;
        // var for icon image of current weather
        // process for getting the UV index for city. Make another ajax call based on lat and long from first ajax call to get respective UV index value.
        var cityLat = response.city.coord.lat;
        var cityLon = response.city.coord.lon;
        var returnDays = 5; //returns 5 day forecast JSON format index of 0.
        var queryURLuvi = 'http://api.openweathermap.org/data/2.5/uvi/forecast?id=524901&APPID=' + apiKey + '&lat=' + cityLat + '&lon=' + cityLon + '&cnt=' + returnDays
        $.ajax({
            url: queryURLuvi,
            method: 'GET'
        }).then(function (uvi) {
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

    });

}