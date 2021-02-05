require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser') 
const fetch = require('node-fetch')
const path = require('path')



const app = express()
const port = 3000 || process.env.PORT 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World!');
  });
app.listen(port)

app.use('/', express.static(path.join(__dirname, '../public')))

app.listen(port, () => console.log(`Server is running on localhost3000`))

// your API calls

//const weatherAPI =  fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`)


//const spirit = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${date}&api_key=${process.env.API_KEY}`
//test next3 rows:::
//const roverUrl= `https://api.nasa.gov/mars-photos/api/v1/rovers`; `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY`
//
//const nasaApiRoversData =  fetch(`${roverUrl}?api_key=${process.env.API_KEY}`);
//const nasaApiPhotosData =  fetch(`${roverUrl}/${name}/photos?sol=1000&page=1&api_key=${process.env.API_KEY}`);
// weather : https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
//const { date }
// example API call



// Picture of the day
app.get('/apod', async (req, res) => { 
    try {
        let imageDay = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            res.send({ imageDay })
            console.log({ imageDay })
    } catch (err) {
        console.log('error:', err);
    }
})

// Rover data for each/selected
app.get('/rover', async (req, res) => {
    
    try {
        let roverData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.name}/photos?sol=1000&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ roverData })    
        console.log({ roverData })
    } catch(err) {
        console.log('error:', err)
    }
})

//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
//https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.name}/latest_photos?api_key=${process.env.API_KEY}
//https://api.nasa.gov/mars-photos/api/v1/manifests/${req.query.name}?api_key=${process.env.API_KEY}
//Rover photo for selected

app.get('/rover-photos', async (req, res) => {
    try {
        let rovPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.name}/photos?sol=1000&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            res.send({ rovPhotos }) 
            console.log({ rovPhotos }) 
    } catch(err) {
        console.log('error:', err)
    }
})


/////////////---------------------------------------
/* require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser') 
const fetch = require('node-fetch')
const path = require('path')



const app = express()
const port = 3000 || process.env.PORT 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World!');
  });
app.listen(port)

app.use('/', express.static(path.join(__dirname, '../public')))

app.listen(port, () => console.log(`Server is running on localhost3000`))

// your API calls

//const weatherAPI =  fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`)

//-USE: FROM U Q/https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=10&api_key=${process.env.API_KEY}
//https://knowledge.udacity.com/questions/365124 API HTTP
//beforechanging with one above:  https://api.nasa.gov/mars-photos/api/v1/rovers/${state.rovers}/photos?sol=1000&api_key=${process.env.API_KEY}`)

//const spirit = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${date}&api_key=${process.env.API_KEY}`
//test next3 rows:::
//const roverUrl= `https://api.nasa.gov/mars-photos/api/v1/rovers`; `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY`
//
//const nasaApiRoversData =  fetch(`${roverUrl}?api_key=${process.env.API_KEY}`);
//const nasaApiPhotosData =  fetch(`${roverUrl}/${name}/photos?sol=1000&page=1&api_key=${process.env.API_KEY}`);
// weather : https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0
//const { date }
// example API call



// Picture of the day
app.get('/apod', async (req, res) => { 
    try {
        let imageDay = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            res.send({ imageDay })
            console.log({ imageDay })
    } catch (err) {
        console.log('error:', err);
    }
})

// Rover data for each/selected
app.get('/rover', async (req, res) => {
    
    try {
        let roverData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${state.rovers}/photos?sol=1000&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ roverData })    
        console.log({ roverData })
    } catch(err) {
        console.log('error:', err)
    }
})


//Rover photo for selected

app.get('/rover-photos', async (req, res) => {
    try {
        let rovPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${state.rovers}/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            res.send({ rovPhotos }) 
            console.log({ rovPhotos }) 
    } catch(err) {
        console.log('error:', err)
    }
})


*/