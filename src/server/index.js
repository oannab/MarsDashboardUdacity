require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser') 
const fetch = require('node-fetch')
const path = require('path')



const app = express()
const port = 3000 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
app.get('/', function (req, res) {
    res.send('Hello World!');
  });
*/

app.use('/', express.static(path.join(__dirname, '../public')))



// Picture of the day
app.get('/apod', async (req, res) => {
  	const { apod } = req.params
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/${apod}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        	res.send(image)
    } catch (err) {
        console.log('error:', err);
    }
})

// Rover data for each/selected
app.get('/rover/:rover_name', async (req, res) => {
  	const { rovers } = req.params
    try {
        let rover = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${req.params.rover_name}/photos?sol=1000&a?api_key=${process.env.API_KEY}`)
            .then(res => res.json())           
            res.send(rover) //send to caller (FE)

    } catch(err) {
        console.log('error:', err);
    }
})

// Get rover's photos by rover's name
app.get('/rover/:rover_photos', async (req, res) => {
  	const { roverPhotos } = req.params
    try {
        let iamges = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${req.params.rover_photos}/photos?sol=1000&a?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            res.send(images); 
    } catch (err) {
        console.log('error:', err);
    }
})



app.listen(port, () => console.log(`Server is running on localhost3000`))