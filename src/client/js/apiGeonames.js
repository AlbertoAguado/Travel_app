let moment = require('moment');

/*CLAVES*/ 
const API_URL = 'http://api.geonames.org/search';
const API_KEY = process.env.CLAVE_GEONAMES;
/*claves*/ 

let date = "";

async function fetchGeoData(input) {

   
    let encodedInput = encodeURIComponent(input);

    try {

        const PARAM_URL = `${API_URL}?q=${encodedInput}&type=json&maxRows=10&style=full&lang=en&username=${API_KEY}&formatted=true`;
        const response = await fetch(`${PARAM_URL}`);

        if (!response.ok) {
            throw `Error: ${response.status} - ${response.statusText}`;
        }

        const data = await response.json();

        return data;

        } catch (error) {
            throw error;
        }

}

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

async function updateUI(data) {

    try {

        const name = data.geonames[0].name;
        const country = data.geonames[0].countryName;
        const longtitude = data.geonames[0].lng;
        const latitude = data.geonames[0].lat;

        document.getElementById("ciudad-viaje").innerHTML = name;
        document.getElementById("pais-viaje").innerHTML = country;
        document.getElementById("fecha-viaje").innerHTML = date || "(Date Not Set)";
        document.getElementById("latitud").innerHTML = `Latitude: ${latitude}º`;
        document.getElementById("longitud").innerHTML = `Longtitude: ${longtitude}º`;

    } catch (error) {

        throw error;
    }
}

document.getElementById("getDataButton").addEventListener("click", getGeoNames);

export { getGeoNames }
