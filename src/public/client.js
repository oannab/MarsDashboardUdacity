
let store = Immutable.Map({
    apod: "",
    selectedRovers: '',
    data: [],
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    roverImg: []
    //roverPhoto: new Map([['Curiosity',{}],['Opportunity',{}],['Spirit',{}]])
})

// add our markup to the page
const root = document.getElementById('root')

console.log(Immutable.Map.isMap(store), store);

const updateStore = (key, newState) => {
    console.log('Before: ', store)
  	if (key && !newState) {
    return store.toJS()[key];
  }
    const newStore = store.setIn([key], Immutable.fromJS(newState))      //set to add elements to array, to avoid declaring to many vari     console.log('After: ', store); 
    	if (!newStore === store) {
     	   store = newStore;
      	}
    console.log("inside UpdateStore")
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
			<div class="nav">Show me the rovers ${navTab(rovers) }</div>
		</header>
        <main>
            <section>
                <h3>Put things on the page!</h3>
					${getRoverPhotos(state, rovers)}
				
				
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
  
    const showPhotos = store.roverPhotos
    console.log("inside RoverPhotos to call getRP")

    const photoURL = showPhotos.map(photo => photo.img_src)

    //if photos still do not exist, update the condition and store imagery
    if(!showPhotos){
        console.log("Check Rover photos is not null")
        return getRoverPhotos(state, rovers) 
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
*/
/*
    // use this function component to change onclick the innerHTML
function chooseRover () {
	let chosen = document.getElementById('rovers').value;
    store.selectedRovers = chosen
} 
*//*
const rovSrc = (src) => {
    `<img src="${src}" class="rover-image">`
}
const roverImages = () => {
    return store.roverPhotos.map(img => {
    `<img src="${photo.img_src}">`
  ).join('');
    .map(photo => rovSrc.map(photos.get('img_src')))
    .reduce((acc, curr) => acc + curr);
}*/
/*
// Pure function that renders conditional information 
const RoverData = (store, getRoverData) => {
  	console.log('inside ROVERADATA')
	getRoverdata(state);
  	getRoverPhotos(state);
  
  	console.log(store.has('roverPhotos'));	
  
  	console.log({ data });
  	console.log({ roverPhotos });
/*	//let rovers = { rovers }
        
   // let showRoverInfo = store.selectedRovers
  //  console.log(showRoverInfo `this is the print for -store.selectedRovers-`);
    console.log("inside RoverData to call getRD & RoverPhotos")

    const photoDate = rovers.earth_date
    console.log(photoDate) /////
    const launch = rovers.launch_date
    console.log(launch)///////////
    const land = rovers.landing_date
    console.log(land)///////////
    const photoTitle = rovers.name
    console.log(photoTitle)//////////////
    const missionSts = rovers.status
    
    const photoDsc = `<ul class="rover-info">
                        <li>Rover name: ${showRoverInfo.name}</li>
                        <li>Rover name: ${showRoverInfo.name} was launched on: ${launch}</li>
                        <li>Rover name: ${showRoverInfo.name} has landed on Mars on: ${land}</li>
                        <li>Rover name: The picture was taken on ${photoDate}</li>
                        <li>Rover name: Rover's mission status: ${missionSts}</li>
                    </ul>`

    //if no SelectedRover still has no rover chosen stored, update the condition
    if (!showRoverInfo) {
        console.log("inside if rovers=undefined")
        return getRoverData(store)
        
    } else if(showRoverInfo) {
        console.log("inside else if to display data and call RoverPhotos")
        return `
            <div class="info">
                <h4 class="photo-title">${photoTitle}</h4>
                <p class="description">${photoDsc}</p>
            </div>

            ${data}
                       
        `
    } else {
        console.log("failed to load any data inside RovData")
        return `Fetching rovers`
    }
  
}
 */

// Example of a pure function that renders infomation requested from the backend
/*
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
*//*
const updateRover = (event) = {
  store = state.merge(newState)
}*/
const clickButton = (e) => {
  console.log(e.value)
  //location.assign("http://localhost:3000/roverInfo/" + e.value)
  getRoverData(e.value)

}
const chooseRover = (store) => {
  console.log(store.roverPhotos)

  return `
  <ul class="roverInfo">
    <li>Name: ${store.data.name}</li>
    <li>ID: ${store.data.rovers.id}</li>
    <li>Launch Date: ${store.data.rovers.launch_date}</li>
    <li>Landing Date: ${store.data.rovers.landing_date}</li>
    <li>Status: ${store.data.rovers.status}</li>
    ${RoverPhotos()}
  </ul>
  `
}

const RoverPhotos = (roverPhotos) => {
  if (roverImg.roverPhotos !== undefined) {
    return roverImages.roverPhotos.map(rover => {
      console.log('Details', rover);
      return `<div>
      <img src=${rover.img_src} alt="First description" />
      <span class="description">${rover.earth_date}</span>
  </div>
  `;
    });
  } else {
    return '<h1>Loading</h1>';
  }
};(state) => {
  const showRovImg = store.setIn(photos.map(photo => {
    return `<img src="${photo.img_src}">`
  }));
  `
        <img class="photo" src="${url}" alt="Photo taken on Mars by 
        ${state.get('selectedRover')}"/>
        )
        
    `
    //return` <li><img src="${photo}"></li> `

}


const navTab = (rovers) => {
// Navigation bar to switch between rovers/imageoftheday/weather

        //const navBar = document.getElementbyClass('nav')
        //const chooseBtn = selected === { selectedRover} ? 'active' : 'inactive'
        const nav = rovers.map((element,index) => {
          const a = `<div><button id="${element}" class="nav ${index === store.get("selectedRover") ? "active" : ""}" 
              onclick='chooseRover(${element},${index})'> ${element} 	
              </button></div>`
          return a
        }).join(' ');

    	return `<nav>
                	${nav}
            	</nav>`;
 
 }

const showRovers = (state, rovers) => {
    
  	return (
      `<button class="nav"
          onclick="setTimeout(updateStore, 3000, 'selectedRover', '${rovers}')">
          <h2 class="card-title">${rovers}</h2>
	   </button>`
    )
}

//------------------------------------------------------  API CALLS
/*
// Example API call
const getImageOfTheDay = async (store) => {
  
    await fetch(`https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/?name=${apod}`)
      .then(res => res.json())
      .then(apod => updateStore(store, Immutable.Map({
        apod
      })))
      console.log(apod);
      console.log(store.apod);
      catch (error) {
      console.log("errors:", error);
      }
};*//*
const getRoverData = (state, rovers) => {
    function catchEr (error) {
      console.log(error)
    }  
  
  
   // const urlData = `https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/rover/${rovers}`;
  //	const getRovers = Array.from(rovers).map(roverName => urlData);
  	//getRovers.map(url =>
      fetch(urlData, {
          method: 'GET'
      })
          .then(response => response.json())
          .then(data => {
              const rov = state.set('rovers', data)
              updateStore(store, {rovers: rov})
              console.log("merging store and json inside getRData")
              console.log(store.data)
              console.log("res.json", response.json());
      }).catch ("error: ", catchEr) 
}   */

const getRoverPhotos = async (store, rovers) => {
  	function catchEr (error) {
      console.log(error)
    }  
	let roverPhotos = store.get('roverImg')
    const urlPh = `https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/roverInfo/${rovers}`;
    await fetch(urlPh, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(roverInfo => {
      		//let roverPhotos = store.set('roverPhotos');store.
			console.log(roverInfo)
            const getPhotos = store.set(roverInfo.latest_photos.map(imgObj => imgObj.img_src));
            updateStore(store, getPhotos);
        
      		console.log("merging store and json inside getRPhotos")
      		console.log(getPhotos)
            console.log("res.json: ", response.json());
    	}).catch ("error: ", catchEr)   
}    

getRoverPhotos();
/*
const getRoverData = async (state, rovers) => {
	console.log('print from insde API CALLgetRoverData')
  	let dataR = store.get('data');
    
    function catchEr (error) {
      console.log(error)
    } 
  
    let callUrl = `https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/rover_name/?name=${rovers}`;
  	async function fetchRData() {
      const response =  await fetch(callUrl)
      .then(response => response.json())
      .then(dataInfo => { console.log(dataInfo)
         // let newInfo = state.set(dataInfo.map( dataI => dataI.rover.photo_manifest))
          console.log('after data mapping');
      // updateStore(store, Immutable.Map({data: newInfo}));
      }) .catch ("error: ", catchEr)
      
}     
  
getRoverData();  
*/
      //let rovUrl = rovers.map(rover => urlDt);
      //console.log(data);
  	 // console.log(newInfo);
  	  //console.log(store.rovers)
    //} 
  	//return fetchRData();
 

/*
//send API request
const getRoverPhotos = async (rovers) => { 
	//let roverPhotos = store.toJS().roverPhotos;
  
	console.log('print from insde API CALLgetRoverPhotos ');
  	
  	let urlPh = `https://r950324c957034xreactr0lcusuk-3000.udacity-student-workspaces.com/rover-photos?name=${store.rovers}`;
  	let resp = await fetch(``)
	
    const responseP = await fetch(urlPh)
    	.then(res => res.json())
  		.then(response => {
      	 console.log(response);
      	 
         roverPhotos.set(rovers, response.latest_photos.map(roverPhoto => roverPhotos.img_src));
         updateStore(state, Immutable.Map({roverPhotos: response, selectedRover: rovers}));
          });
         console.log('print json for getPhotos') 
         //console.log(JSON.stringify(roverPhotos))
         console.log(store)
  		 console.log(store.roverPhotos)
  
 		console.log(resp)
    //return 
}*/
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
