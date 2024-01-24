const express = require('express');
const https = require('https');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
    const city = req.body.cityName;
    const apiKey = "2ffe3ae70da0dcdf0d88442954523dcd"; 
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const feelsLike = weatherData.main.feels_like;
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const windSpeed = weatherData.wind.speed;
            const countryCode = weatherData.sys.country;
            const latitude = weatherData.coord.lat;
            const longitude = weatherData.coord.lon;

            const query = `?city=${city}&temp=${temp}&desc=${weatherDescription}&icon=${icon}&feelsLike=${feelsLike}&humidity=${humidity}&pressure=${pressure}&windSpeed=${windSpeed}&countryCode=${countryCode}&lat=${latitude}&lon=${longitude}`;
            res.redirect('/weather' + query);
        });
    });
});

app.get('/weather', function(req, res){
    res.sendFile(__dirname + '/weather.html');
});

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});
