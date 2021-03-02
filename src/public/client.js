
let store = Immutable.Map({
apod: "",
rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit"]),
});


const root = document.getElementById("root");

const updateStore = (store, newState) => {
store = store.merge(newState);
render(root, store);
};


const render = async (root, state) => {
root.innerHTML = App(state);
};

// Main component which renders entire application/pages
const App = (state) => {
    const rovers = state.get("rovers");
    const apod = state.get("apod");


    //Check the photos exist and have been updates in store, then render rover page
    if (state.get("photos")) {
        return selectedRovers(state)
    }else{ //call API again
        getRoverData(rover_name)
    };


    //If Apod object returns image values, render the page
    if (apod) {
        return DisplayApod(state);
    }else { //wait images to load 
        getImageOfTheDay(apod)
    }

    return `
        <header>
        
        <div class="titleLP">
        <h1>Mars Rover Dashboard</h1>
        </div>
            <div class="buttonsLandingPage">
            ${roverButton(rovers)}
            
            ${apodButton(apod)}
                </div>
        </header>
        <footer></footer>
    `
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS & HOF

//create rover button and link the selectRoverButton function to event
const roverButton = (rovers) => {

    return `<div class="roverButton">
                ${rovers.map(element => (    
                    ` <button class="roverCard" type="button" value=${element} onclick="selectRoverButton(this)">
                <h3>${element}</h3>
            </button>`
                ))
                    .join("")}
            <div>`         
};  


const apodButton = (apod) => {
    return `
    <div class="apodDivData">
    <button class="getApodButton" value="apod" onclick="selectApodButton(this)">
        <h3>Astronomy Picture of the Day</h3>
        </button>
    </div>`
};

//When each rover is clicked, get the value for each rover requested from inside getRoverData from API
const selectRoverButton = (event) => getRoverData(event.value);

//Render each rover after it has been selected
const selectedRovers = (state) => {
    // new var which will contain info for each rover
    const roverData = state.get("photos").find(roverData => roverData.get("rover"));

    //call the HOF which displays rover details with imagery
    return DisplayRovers(roverData, state);

};

//Rover layout to render images fetched from each rover with detailed info of each
const DisplayRovers = (roverData, state) => {
//Access multiple nested values of properties
    return `
    <div class="roverDivData">
        <ul class="roverData">
        <li>Rover name: "${roverData.get("rover").get("name")}"</li>
        <li>Launch date: ${roverData.get("rover").get("launch_date")}</li>
        <li>Landing date: ${roverData.get("rover").get("landing_date")}</li>
        <li>Status: ${roverData.get("rover").get("status")}.to</li>
        <li>Earth Date of Latest Photos: ${roverData.get("earth_date")}</li>
        </ul>
    </div>
    <div class="roverPhotosRender">
    ${RoverPhotosGrid(state)}
    </div>
    <div class="homeBtn">
        <button onclick="menuButton()" class="menuButton">Home Page</button>
    </div>
`
};


//Go back to landing page function
const menuButton = () => {
//Remove data logged inside store, then render root's innerHTML
store = store.remove("photos", "apod");
render(root, store);
};

//Get for each rover corresponding imagery
const RoverPhotosGrid = (state) => {

return (state.get("photos")).map(photo => RoverImg(photo.get("img_src"))
    ).reduce((acc, curr) => acc + curr); //store all inside obj's property 
};

//create container for photos to be displayed
const RoverImg = (src) => `<img src="${src}" class="roverImg">`;

//If APOD button is clicked, get the value from API
const selectApodButton = (e) => getImageOfTheDay(e.value);

//Create Layout page to render APOD image
const DisplayApod = (state) => {
//console.log(state.get("apod"))
    return `
    <main>
        <div class="apodData">
                <h2>Welcome to Astronomy Picture of the Day !</h2>
            </div>
        <section>
            <p>
                One of the most popular websites at NASA is the Astronomy Picture of the Day. 
            </p>
            ${ImageOfTheDay(state.get("apod"))}
        </section>
        <div class="homeBtn">
            <button onclick="menuButton()" class="menuButton">Home Page</button>
        </div>
    </main>`
};



// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

// If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    //store images
    const photodate = new Date(apod.get("image").get("date"))


    // check if the photo of the day is actually type video!
    if (apod.get("image").get("media_type") === "video") {
        return (`
                <p>See today's featured video <a href="${apod.get("image").get("url")}">now</a></p>
                <p>${apod.get("image").get("title")}</p>
                <p>${apod.get("image").get("explanation")}</p>
            `);
    } else {
        return (`
                <img src="${apod.get("image").get("url")}" height="350px" width="100%" />
                <p>${apod.get("image").get("explanation")}</p>

            `);
    }
};



// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = async (apod) => {

    try {
        await fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/${apod}`)
        .then(res => res.json())
        .then(apod => updateStore(store, { //store received information inside 'store' Immutable Object
            apod
        }))
    } catch (err) {
        console.log("errors:", err);
    }
};

// API call to get rover information and photos
const getRoverData = async (rover_name) => {
    try {
        await fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/roverInfo/${rover_name}`)
        .then(res => res.json())
        .then(roverInfo => updateStore(store, roverInfo))
            console.log(roverInfo);
    } catch (error) {
        console.log("errors:", err);
    }
};
