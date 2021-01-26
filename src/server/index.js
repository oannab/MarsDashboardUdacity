require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser') 
const fetch = require('node-fetch')
const path = require('path')
//const fs = require('fs');

//import Glide from '@glidejs/glide'

//new Glide('.glide').mount()

/*fs.readFile('nasa_near_earth_object_API.txt', (err, data) => { 
    if (err) console.log(err); 
    console.log(data.toString()); 
});*/


const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World!');
  });
app.listen(port)

app.use('/', express.static(path.join(__dirname, '../public')))



// your API calls

const weatherAPI = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`)


const spirit = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${date}&api_key=${process.env.API_KEY}`
//test next3 rows:::
const roverUrl= `https://api.nasa.gov/mars-photos/api/v1/rovers`; `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY`
const nasaApiRoversData = await fetch(`${roverUrl}?api_key=${process.env.API_KEY}`);
const nasaApiPhotosData = await fetch(`${roverUrl}/${name}/photos?sol=1000&page=1&api_key=${process.env.API_KEY}`);
// weather : https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
const { date }
// example API call



// Picture of the day
app.get('/apod', async (req, res) => { 
    try {
        let imageDay = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ imageDay })
    } catch (err) {
        console.log('error:', err);
    }
})

// Rover data
app.get('/rover', async (req, res) => {
    
    try {
        let roverData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${req.query.name.toLowerCase()}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ roverData })    
    } catch(err) {
        console.log('error:', err)
    }
})


//Rover photo

app.get('/rover-photos', async (req, res) => {
    try {
        let roverPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.name.toLowerCase()}/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ roverPhotos })    
    } catch(err) {
        console.log('error:', err)
    }
})


app.listen(port, () => console.log(`show rovers`))