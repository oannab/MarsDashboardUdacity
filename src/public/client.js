//Set store to ImmutableJS
let store = Immutable.Map({
    apod: "",
    rovers: Immutable.List(["Curiosity", "Opportunity", "Spirit"]),
  });
  
  // add our markup to the page
  const root = document.getElementById("root");
  
  const updateStore = (store, newState) => {
    store = store.merge(newState);
    render(root, store);
  };
  
  //Render the page by changing root's innerHTML
  const render = async (root, state) => {
    root.innerHTML = App(state);
  };
  
  // create content
  const App = (state) => {
    const rovers = state.get("rovers");
    const apod = state.get("apod");
  
    //After update the store with a new rover "photos" property, if "photos" exists, return the contents inside "photos"
    if (state.get("photos")) {
      return selectedRovers(state);
    }
  
    //After update the store with daily image data from API, if "image" object exists and is insde "apod" property,
    //then call the function to show the daily image contents
    if (apod) {
      return DisplayApod(state);
    }
  
    return `
          <header>
          
          <div class="title">
          <h1>Mars Rover Dashboard</h1>
          </div>
              
              ${roverButton(rovers)}
              <br>
              <p>
                ${apodButton(apod)}
                 </p>
          </header>
          <footer></footer>
      `
  };
  
  // listening for load event because page should load before any JS is called
  window.addEventListener('load', () => {
    render(root, store)
  })
  
  // ------------------------------------------------------  COMPONENTS & HOF/
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
  
  //When each rover is clicked, get the value for each rover called inside getRoverData from API
  const selectRoverButton = (event) => getRoverData(event.value);
  
  //Render each rover after it has been selected
  const selectedRovers = (state) => {
   // console.log(state.get("photos"))
   // console.log(state.getIn(["photos", "rover", "name"]))
    // new var which will contain info for each rover
    const roverData = state.get("photos").find(roverData => roverData.get("rover"));
  
    //call the HOF which displays rover details with imagery
    return DisplayRovers(roverData, state);
    
  };
  
  //Rover layout to be rendered
  const DisplayRovers = (roverData, state) => {
  // getIn to access multiple 
    return `
    <div class="roverDivData">
      <ul class="roverData">
        <li>Name: ${roverData.getIn(["rover", "name"])}</li>
        <li>Launch Date: ${roverData.getIn(["rover", "launch_date"])}</li>
        <li>Landing Date: ${roverData.getIn(["rover", "landing_date"])}</li>
        <li>Status: ${roverData.getIn(["rover", "status"])}</li>
        <li>Earth Date of Latest Photos: ${roverData.get("earth_date")}</li>
      </ul>
    </div>
    <div class="roverPhotosRender">
    ${RoverPhotosGrid(state)}
    </div>
    <p>
      <button onclick="menuButton()" class="menuButton">Home Page</button>
    </p>
    `
  };
  
  
  //Go back to landing page
  const menuButton = () => {
    //Remove data logged inside store, then render root's innerHTML
    store = store.remove("photos", "apod");
    render(root, store);
  };
  
  //Get for each rover corresponding imagery
  const RoverPhotosGrid = (state) => {
  
    return (state.get("photos")).map(photo => RoverImg(photo.get("img_src"))
      ).reduce((acc, curr) => acc + curr);
  
  };
  
  //create container for photos to be displayed
  const RoverImg = (src) => `<img src="${src}" class="roverImg">`;
  
  //If APOD button is clicked, get the value from API
  const selectApodButton = (e) => getImageOfTheDay(e.value);
  
  //Show daily image contents after the apod button is clicked
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
      <p>
        <button onclick="menuButton()" class="menuButton">Home Page</button>
      </p>
    </main>
    
    `
  };
  
  
  
  // Example of a pure function that renders infomation requested from the backend
  const ImageOfTheDay = (apod) => {
  
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    //store images
    const photodate = new Date(apod.getIn(["image", "date"]))
  
  
    // check if the photo of the day is actually type video!
    if (apod.getIn(["image", "media_type"]) === "video") {
      return (`
              <p>See today's featured video <a href="${apod.getIn(["image", "url"])}">here</a></p>
              <p>${apod.getIn(["image", "title"])}</p>
              <p>${apod.getIn(["image", "explanation"])}</p>
          `);
    } else if (apod.getIn(["image", "code"]) === 404) {
      return (`
              <p>${apod.getIn(["image", "msg"])}</p>
              <p>Please check back after a few hours.</p>
          `);
    } else {
      return (`
              <img src="${apod.getIn(["image", "url"])}" height="350px" width="100%" />
              <p>${apod.getIn(["image", "explanation"])}</p>
  
          `);
    }
  };
  
  
  
  // ------------------------------------------------------  API CALLS
  
  // Example API call
  const getImageOfTheDay = async (apod) => {
   
    try {
      await fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/${apod}`)
        .then(res => res.json())
        .then(apod => updateStore(store, {
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
  