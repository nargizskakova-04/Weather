const express = require('express');
const https = require('https');
const app = express();
const city = "Astana";

const apiKey = "2ffe3ae70da0dcdf0d88442954523dcd";
const lat = 51;
const lon = 71;
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Astana&units=metric&appid=2ffe3ae70da0dcdf0d88442954523dcd';

app.get('/', function(req, res){
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<h1>Temperature is ${temp} </h1>`);
            res.write(`<h1>The weather is currently ${weatherdescription}</h1>`);
            res.write(`<img src="${imageUrl}" alt="weather icon">`);
            res.send;

        })
    })
})

app.listen(3000, function(req,res){
    console.log('server is running on 3000')
})