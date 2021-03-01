require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
app.get("/roverInfo/:rover_name", async (req, res) => {
  
  const { rover_name } = req.params
 // const url = "https://api.nasa.gov/mars-photos/api/v1/";
  
  try { //first fetch gets data, second photos
    const getRover = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover_name}?api_key=${process.env.API_KEY}`)
      .then(res => res.json());
    const roverPhotos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?sol=1000&api_key=${process.env.API_KEY}`)
      .then(res => res.json());
    res.send(roverPhotos);

  } catch (err) {
    console.log("errors:", err);
  }
})



// example API call
app.get('/apod', async (req, res) => {
  try {
    const image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
      .then(res => res.json());
    res.send({
      image
    });

  } catch (err) {
    console.log("error:", err);
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
