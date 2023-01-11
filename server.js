const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey =''


app.use(express.static('public')); //This code allows us to access all of the static files within the ‘public’ folder.
app.use(bodyParser.urlencoded({ extended: true }));//using body-parser we can make use of the req.body object.
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})
/* Instead of using res.send, we use res.render when working with a templating language. res.render will render our view, then send the equivalent HTML to the client. */

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
        request(url, function (err, response, body) {
            if(err){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
        }
        }
    });
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

//API KEY b98c0341a593f86222fad6be59f04483