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
            const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            const feelsLike = weatherData.main.feels_like;
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const windSpeed = weatherData.wind.speed;
            const countryCode = weatherData.sys.country;


            res.write(`<h1>Temperature in ${city} is ${temp} degrees Celsius.</h1>`);
            res.write(`<p>The weather is currently ${weatherDescription}.</p>`);

            res.write(`<p>Feels like: ${feelsLike}°C</p>`);
            res.write(`<p>Humidity: ${humidity}%</p>`);
            res.write(`<p>Pressure: ${pressure} hPa</p>`);
            res.write(`<p>Wind Speed: ${windSpeed} m/s</p>`);
            res.write(`<p>Country Code: ${countryCode}</p>`);
            res.write(`<img src="${imageUrl}" alt="weather icon">`);
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});
