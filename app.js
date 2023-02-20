const express = require("express");
const app = express();
const port = 3000;
const https = require("https");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));


app.get("https://mayookhep.github.io/weatherapp/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});
app.post("https://mayookhep.github.io/weatherapp/", function (req, res) {

    const city = req.body.cityName;
    const apikey = "1f5cf389f56b1082705c629cdaa99efd";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + units;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const discription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(discription);
            res.write("<h1> weather is currently " + discription + "</h1>");
            res.write("<h3> the temperature in " + city+" is " + temp + "</h3>")
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });
    // res.send("server is up and running"+description)

});








app.listen(port, function () {
    console.log("server is running on port 3000")
});
