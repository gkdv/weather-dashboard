var apiKey = '25f5253d7be788ad89940c40b9d3c859'
var cityName = 'denver'

var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=' + apiKey + '&q=' + cityName + '&units=imperial'

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Create CODE HERE to Log the queryURL
    console.log(response)
    var response = response.list[0].main.temp;
    console.log(response)
    // console.log(response.list.main.temp);
    // $('body').append(response)
    // $('body').text(JSON.stringify(response))
    // // Create CODE HERE to log the resulting object
    // function logResults(response){
    //   $('.city').append(`<h1>City: ${response.name}</h1>`)
    //   $('.wind').append(`<h1>Wind Speed: ${response.wind.speed}</h1>`)
    //   $('.humidity').append(`<h1>Humidity: ${response.main.humidity}</h1>`)
    //   $('.temp').append(`<h1>Temperature: ${response.main.temp}</h1><h1>Temperature in Fahrenheit: ${tempKelvin(response)}</h1>`)
    // }
    // logResults(response);
    // // Create CODE HERE to transfer content to HTML
    // // Create CODE HERE to calculate the temperature (converted from Kelvin)
    // // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    // function tempKelvin (response){
    // var tempKelvin = ((((Math.floor(response.main.temp))-273.15)*1.8)+32);
    // tempKelvin = tempKelvin.toFixed([0])
    //   return tempKelvin
    // }
    // // Create CODE HERE to dump the temperature content into HTML

  });
