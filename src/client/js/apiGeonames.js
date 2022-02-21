let moment = require('moment');

/*CLAVES*/ 
const API_URL = 'http://api.geonames.org/search';
const API_KEY = process.env.CLAVE_GEONAMES;
/*claves*/ 


//Fecha viaje
let date = "";

//Function to get data from Geonames
async function fetchGeoData(input) {
    
    //encoding the city to clean it
    let encodedInput = encodeURIComponent(input);

    try {

        //fetch the complete url from geonames
        const PARAM_URL = `${API_URL}?q=${encodedInput}&type=json&maxRows=10&style=full&lang=en&username=${API_KEY}&formatted=true`;
        const response = await fetch(`${PARAM_URL}`);

        if (!response.ok) {
            throw `Error: ${response.status} - ${response.statusText}`;
        }

        //take the data from the response
        const data = await response.json();

        //return the data
        return data;

        } catch (error) {
            throw error;
        }

}

//Function to take the city and update the ui
function getGeoNames() {

    const input = document.getElementById("destino").value;
    date = moment(document.getElementById("salida").value).format('DD-MM-YYYY');

    try {

        fetchGeoData(input)
            .then((data) => {
                if (data) {
                   updateUI(data);
                }
                })
                .catch((error) => {
                alert(error);
        });

    } catch (error) {
    
        alert(error);
    }
}

//Function to update the ui
async function updateUI(data) {

    try {

        //Split the data from data
        const name = data.geonames[0].name;
        const country = data.geonames[0].countryName;
        const longtitude = data.geonames[0].lng;
        const latitude = data.geonames[0].lat;

        //update the ui with the data
        document.getElementById("ciudad-viaje").innerHTML = name;
        document.getElementById("pais-viaje").innerHTML = country;
        document.getElementById("fecha-viaje").innerHTML = date || "(Date Not Set)";
        document.getElementById("latitud").innerHTML = `Latitude: ${latitude}º`;
        document.getElementById("longitud").innerHTML = `Longtitude: ${longtitude}º`;

    } catch (error) {

        throw error;
    }
}

//On click run getGeonames
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("getDataButton").addEventListener("click", getGeoNames);
});

export { getGeoNames }
