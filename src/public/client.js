
let store = Immutable.Map({
    apod: "",
    selectedRovers: '',
    data: [],
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
  	roverPhotos: []
    //roverPhoto: new Map([['Curiosity',{}],['Opportunity',{}],['Spirit',{}]])
})

// add our markup to the page
const root = document.getElementById('root')

console.log(Immutable.Map.isMap(store), store);

const updateStore = (property, value) => {
     store = state.set(property, value)  
     render(root, store)
}



const render = async (root, state) => {
    root.innerHTML = App(state)
}



// create content
const App = (state) => {
	let  apod  = state.get('apod');
  	let  rovers  = state.get('rovers');
    let  data  = state.get('data');
    let  selectedRovers  = state.get('selectedRovers');
    let  roverPhotos  = state.get('roverPhotos');
   
    console.log("inside App")
    return `
        <header>
			<h3> Mars Dashboard </h3>
			<div class="nav">Show me the rovers ${roverBtn(rovers) }</div>
		</header>
        <main>
            <section>
                <h3>Put things on the page!</h3>
					${RoverPhotos(state)}
				
				
            </section>
        </main>
        <footer></footer>
    `
}



// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    getRoverPhotos(state, rover)
    console.log("inside window.EventListener")
})



// ------------------------------------------------------  COMPONENTS
 


// Example of a pure function that renders infomation requested from the backend

const ImageOfTheDay = (store) => {
	let apod = store.apod
  
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



const chooseRover = (rover) => {
    console.log(rover);
    store = store.set("selectedRovers", rover);
    clickButton(e);
    //getRoverPhotos(store.get("rovers"));
    console.log(`setRover is called`);
   // render(root, newStore);
}
  
const clickButton = (e) => {
  console.log(e.value)
  return (
  	getRoverData(e.value)
  )

}

 const roverBtn = (rovers) => {
   // let roverBttn = document.getElementById("roverBtn")
    return `
      <button class="roverBtn" onclick="chooseRover('${rovers}')">
        ${rovers}
      </button>
       `;
  }

const createRoverLinks = () => {
    return `<nav>
    <ul class="nav">
      ${store.get("selectedRover").map((rovers) => roverBtn(rovers))
        .join("")}
    </ul>
  </nav>`;
  }


const RoverPhotos = (store) => {
  
  const { latest_photos } = state.data.results

    //photo array for img.src url
    const photoURL = latest_photos.map(photo => photo.img_src)

    const photoDate = state.data.results.latest_photos[0].earth_date

    // Get the required mission data
    const { name, launch_date, landing_date, status } =
        state.data.results.latest_photos[0].rover
  
  if (state.roverPhotos !== undefined) {
    return getRoverPhotos.map(roverData => {
      updateStore('roverPhotos', roverData)
      console.log('Details', roverData);
    })
}                         
  if (roverPhotos) {     
    getRoverPhotos
      return  `
      <div class="rover-container">
        <img src="${photoURL}" class="rover-image" />
        <ul class="rover-card">
          <li>Photo ID: ${name}</li>
          <li>Landing Date: ${landing_date}</li>
          <li>Launch Date: ${launch_date}</li>
          <li>Status: ${status}</li>
        </ul>
      </div>`;
    
  } else {
    return '<h1>Loading</h1>';
  }

}



const showRovers = (state, rover) => {
    
  	return (
      `<button class="rover-card" onclick="updateStore(store, {selectedRover: '', data: ''})">Back</button>
        ${RoverPhotos(state, getRoverPhotos)}
          <h2 class="card-title">${rover}</h2>`
    )
}

//------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = async (store) => {
  	  function catchEr (error) {
      console.log(error)
      } 
      
  	  await fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/?name=${apod}`)
        .then(res => res.json())
        .then(apod => updateStore(store, Immutable.Map({
          apod
        })))
        console.log(apod);
        console.log(store.apod);
        
};

let getRoverPhotos = async (state, rover) => {
  	function catchEr (error) {
      console.log(error)
    }  
	let roverPhotos = state.get('roverImg')
    const urlPh = `https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/rover_photos/${rover}`;
    await fetch(urlPh, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(roverInfo => {
      		//let roverPhotos = store.set('roverPhotos');store.
			console.log(roverInfo)
            const getPhotos = state.set('roverImage', roverInfo);
            updateStore(state, getPhotos);
            
        
      		console.log("merging store and json inside getRPhotos")
      		console.log(getPhotos)
            console.log("res.json: ", response.json());
    	}).catch ("error: ", catchEr)   
}    

getRoverPhotos(state);

  /*
let navBarBtn = document.querySelector('#nav');
function showRoversOnClick() {
  navBarBtn.addEventListener('click', () => {
      console.log('button pressed');
      console.log('before tring to call getroverdata()');
      getRoverData();
      console.log('after tring to call getroverdata()');
      console.log('call getroverdata(): ', getRoverPhotos(state, rovers));
          //this.innerHTML = `<div id="getroverdata" ${getRoverData()}></div>`;	
	});
}*/
  
//showRoversOnClick();  