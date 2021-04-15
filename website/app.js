/* Global Variables */
let apiKey = ',us&appid='+'426a8e69da8b271e33a9734dd20079ac&units=imperial';
let OpenWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){

    const newZip = document.getElementById('zip').value;
    const newFeeling = document.getElementById('feelings').value;
    
    getWeather(OpenWeatherURL,newZip, apiKey)

    .then(function(data){

        postData('/add', {temperature: data.main.temp, date: newDate, feeling: newFeeling, city: data.name, main: data.weather[0].main, description: data.weather[0].description, icon: "http://openweathermap.org/img/wn/"+data.weather[0].icon+".png"} );
   
        updateUI()
    })

}

const getWeather = async (OpenWeatherURL, zip, key) => {

    const res = await fetch(OpenWeatherURL + zip + key)
    try {
        const data = await res.json();

        return data;
    } catch (error) {

    }
}

//POST DATA
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

const updateUI = async () => {
  
  const request = await fetch('/all');

  try{
    const projectData = await request.json();
  
    document.getElementById('temp').innerHTML =  projectData.temperature+" F";
    document.getElementById('date').innerHTML = projectData.date;
    document.getElementById('content').innerHTML = projectData.feeling;
    document.getElementById('city').innerHTML = projectData.city;
    document.getElementById('main').innerHTML = projectData.main;
    document.getElementById('description').innerHTML = projectData.description;
    document.getElementById('icon').setAttribute('src', projectData.icon);

  }catch(error){
    console.log("error", error);
  }
}