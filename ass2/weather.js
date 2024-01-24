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
    

    https.get(url, function(weatherResponse){
        let weatherData = '';
        weatherResponse.on("data", function(data){
            weatherData += data;
        });
        weatherResponse.on("end", function(){
            const weatherJson = JSON.parse(weatherData);
            const temp = weatherJson.main.temp;
            const weatherDescription = weatherJson.weather[0].description;
            const icon = weatherJson.weather[0].icon;
            const feelsLike = weatherJson.main.feels_like;
            const humidity = weatherJson.main.humidity;
            const pressure = weatherJson.main.pressure;
            const windSpeed = weatherJson.wind.speed;
            const countryCode = weatherJson.sys.country;
            const uvApiKey = 'openuv-3xsowrlrs61fbl-io'
            const latitude = weatherJson.coord.lat;
            const longitude = weatherJson.coord.lon;
            const uvUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;
            const uvOptions = {
                headers: {'x-access-token': uvApiKey}
            };
            const moonPhaseApiKey = "f07785bf3bbc4edd93f5dbc0d94d979f"; // Ваш ключ API от ipgeolocation.io
            const moonPhaseUrl = `https://api.ipgeolocation.io/astronomy?apiKey=${moonPhaseApiKey}&lat=${latitude}&long=${longitude}`;
            console.log("Moon Phase URL:", moonPhaseUrl);
            https.get(moonPhaseUrl, function(moonResponse){
            let moonData = '';
            moonResponse.on('data', function(chunk){
                moonData += chunk;
            });

            moonResponse.on('end', function(){
                const moonJson = JSON.parse(moonData);
                const moonrise = moonJson.moonrise;
                const moonset = moonJson.moonset;
                const sunrise = moonJson.sunrise;
                const sunset = moonJson.sunset;
                console.log("Moon Rise:", moonrise);

                const uvUrl = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;
                const uvOptions = {
                    headers: {'x-access-token': uvApiKey}
                };
                https.get(uvUrl, uvOptions, function(uvResponse){
                    let uvData = '';
                    uvResponse.on('data', function(chunk){
                        uvData += chunk;
                    });

                    uvResponse.on('end', function(){
                        const uvJson = JSON.parse(uvData);
                        const uvIndex = uvJson.result.uv;

                        const query = `?city=${encodeURIComponent(city)}&temp=${temp}&desc=${encodeURIComponent(weatherDescription)}&icon=${icon}&feelsLike=${feelsLike}&humidity=${humidity}&pressure=${pressure}&windSpeed=${windSpeed}&countryCode=${countryCode}&lat=${latitude}&lon=${longitude}&uvIndex=${uvIndex}&moonrise=${encodeURIComponent(moonrise)}&moonset=${encodeURIComponent(moonset)}&sunrise=${encodeURIComponent(sunrise)}&sunset=${encodeURIComponent(sunset)}`;
                        res.redirect('/weather' + query);
                    });
                }).on('error', function(e){
                    console.error(`Ошибка при запросе к OpenUV: ${e.message}`);
                });
            });
        }).on('error', function(e){
            console.error(`Ошибка при запросе к API фазы луны: ${e.message}`);
        });
        });
    });
});

app.get('/weather', function(req, res){
    res.sendFile(__dirname + '/weather.html');
});

app.listen(3000, function(){
    console.log('Server is running on port 3000');
});


