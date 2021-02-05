

let store = {
    apod: '',
    selectedRovers: '',
    data: [],
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    //roversPhoto: new Map([['Curiosity',{}],['Opportunity',{}],['Spirit',{}]])
}

// add our markup to the page
const root = document.getElementById('root')

/*
// Navigation bar to switch between rovers/imageoftheday/weather
const Nav = (rovers, selectedRovers) => { //(rovers)
        const navBar = document.getElementbyClass('navTab')
        const chooseBtn = selected === { selectedRover} ? 'active' : 'inactive'
        <div class="navTab" onclick  updateStore({selectedRover: ${rovers}})
        return `
        <div class="nav">
          <a class="" id="${selected}" href="#">${selectedRover}</a>
          <a class="nav-link" href="#">Opportunity Rover</a>
          <a class="nav-link" href="#">Spirit Rover</a>
          <a class="nav-link" href="#">Image of the Day</a>
        </div>
        `
    
    }
    
*/

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
    console.log("inside UpdateStore")
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

/*
// select rover on nav bar 
function chooseRover (selectedNav) {
    updateStore(store, { selectedRovers: selectedNav })
  	console.log(selectedRovers)
}
window.chooseRover = chooseRover
*/

// create content
const App = (state) => {
    let rovers = state.rovers;
    let data = state.data;
    let selectedRovers = state.selectedRovers;
    let roverPhotos = state.roverPhotos;
    let apod = state.apod;
    console.log("inside App")
    return `
        <header>
		
		</header>
        <main>
            <section>
                <h3>Put things on the page!</h3>
                ${ImageOfTheDay(apod)}
				
				${RoverData(state, getRoverData)}
            </section>
        </main>
        <footer></footer>
    `
}



// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
    console.log("inside window.EventListener")
})



// ------------------------------------------------------  COMPONENTS

/*
const RoverPhotos = (store, getRoverPhotos) => {
  
    const showPhotos = roverPhotos[rovers]
    
    console.log("inside RoverPhotos to call getRP")

    const photoURL = showPhotos.map(photo => photo.img_src)

    //if photos still do not exist, update the condition and store imagery
    if(showPhotos === undefined){
        console.log("Check Rover photos is not null")
        return getRoverPhotos(rovers, state) 
    } else if (showPhotos) {
        console.log("Check Rover photos are loading.just before")
        return `
            <div class="rov-photos">
                ${photoURL}
            </div>    
        `
    } else {
        console.log("no condition met in photo loading.->exiting RoverPhotos")
        return `Hold on while we fetch the images`
    }
}


// Pure function that renders conditional information 
const RoverData = (store, getRoverData) => {
    const storeObj = store.toJS();

    const showRoverInfo = rovers[selectedRovers]

    console.log("inside RoverData to call getRD & RoverPhotos")

    const photoDate = rovers.earth_date
    console.log(photoDate)
    const launch = rovers.launch_date
    console.log(launch)
    const land = rovers.landing_date
    console.log(land)
    const photoTitle = rovers.name
    console.log(photoTitle)
    const missionSts = rovers.status
    
    const photoDsc = `<ul class="rover-info">
                        <li>Rover name: ${showRoverInfo}</li>
                        <li>Rover name: ${showRoverInfo} was launched on: ${launch}</li>
                        <li>Rover name: ${showRoverInfo} has landed on Mars on: ${land}</li>
                        <li>Rover name: The picture was taken on ${photoDate}</li>
                        <li>Rover name: Rover's mission status: ${missionSts}</li>
                    </ul>`

    //if no SelectedRover still has no rover chosen stored, update the condition
    if (showRoverInfo === undefined) {
        console.log("inside if rov=undefined")
        return getRoverData(state)
        
    } else if(showRoverInfo) {
        console.log("inside else if to display data and call RoverPhotos")
        return `
            <div class="info">
                <h4 class="photo-title">${photoTitle}</h4>
                <p class="description">${photoDsc}</p>
            </div>

            ${roverPhotos}
                       
        `
    } else {
        console.log("failed to load any data inside RovData")
        return `Fetching rovers`
    }
}
*/

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (store) => {
    
    console.log("inside ImageofDay to call apod")
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    console.log(today)
    const photodate = new Date(apod.date)
    console.log(photodate);

    console.log(today);
    if (!apod || apod.date === today) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "photo") {
        return (`
            <p>See today's featured photo <a href="${apod.url}">here</a></p>
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


//------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state
	console.log('print from insde API CALLgetImageofDay for apod') 
    
    fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/apod`)
        .then(res => res.json())
        .then((apod) => {
      	JSON.parse(JSON.stringify(apod));
      	updateStore.merge(store, { apod })})
        console.log('print json for apod') 
        console.log(JSON.stringify(apod))
		console.log(store.apod)
  return apod;
}


const getRoverData = (state, rovers) => {
	console.log('print from insde API CALLgetRoverData')
    
    fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/rover?name=${rovers}`)
  		.then(res => res.json())
  		.then((data) => {
      	JSON.parse(JSON.stringify(data));
      	updateStore.merge(store, data)
    	})
        console.log('print res.json() for getPhotos') 
        console.log(JSON.stringify(data))    
  		console.log(store.data)
  return data;
}


/*
const getRoverPhotos = async (rovers, state) => {
	//const rovPhotos = state.roverPhotos
  
	console.log('print from insde API CALLgetRoverPhotos ')
  
  
    fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/rover-photos?name=${state.rovers}`)
    	.then(res => res.json())
  		.then((roverPhotos) => {
      	 JSON.parse(JSON.stringify(roverPhotos));
         updateStore.merge(state, roverPhotos)
   		 });
         console.log('print json for getPhotos') 
         console.log(JSON.stringify(roverPhotos))
         console.log(store.roverPhotos)
}*/