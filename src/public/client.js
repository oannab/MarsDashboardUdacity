// yarn start
// http:localhost:3000
//https://www.freecodecamp.org/news/heres-how-you-can-actually-use-node-environment-variables-8fdf98f53a0a/#:~:text=env%20files%20allow%20you%20to,in%20there%20on%20different%20lines.&text=To%20read%20these%20values%2C%20there,the%20dotenv%20package%20from%20npm.

//filter(), map(), reduce()


const { Immutable } = require('immutable');

const { List } = require('immutable');
const { Map } = require('immutable');
const { fromJS } = require('immutable');

//https://api.nasa.gov/planetary/apod?api_key=XLEGvcubeqKBhXgHfFeGEGFclnxOdLLlUJb0UggR
//https://api.nasa.gov/planetary/apod?api_key=XLEGvcubeqKBhXgHfFeGEGFclnxOdLLlUJb0UggR
require('dotenv').config();


let store = {
    data: '',
    apod: '',
    whichRover: Immutable.List(['Curiosity', 'Opportu nity', 'Spirit']),
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(apod)}
                ${RoverData(state, roverdetails)}
                ${RoverPhotos(state, photoslide)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const RoverData = (state, roverDetails) => {
    let { rover } = state;
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }
    //
    return `
        <h1>Hello!</h1>
    `
}
const showRoverPhoto = (state, photoSlide, url, roverName) => {
    return (`
    <img class="image" src="${url}" `)
}

const RoverPhotos = (state , phhotos) => {
    const { roverPhoto } = Object.keys(photos).find(key => key === roverName)

    fetch(`http://localhost:3000/rover-photos?name=${roverName}`)
    .then(res => res,json())
    .then(roverPhoto => updateStore(store, { roverPhoto }))
}


//array of photos requested

// create Rover photo gallery
// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}


// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return data
}



