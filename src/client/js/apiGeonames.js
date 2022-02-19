import numeral from "numeral";
import { format } from "date-fns";
import parseISO from 'date-fns/parseISO';

const API_URL = `http://api.geonames.org/search`;
const API_KEY = process.env.CLAVE_GEONAMES;

const PARAM_USERNAME = API_KEY;

let travelDate = "";

function validar(input) {

    const isInputValid = input ? input.length > 0 : false;

    return isInputValid;
}

async function fetchGeoData(input) {

    const isInputValid = validar(input);

    if (isInputValid) {

        let encodedInput = encodeURIComponent(input);

        try {

            const PARAM_URL = `${API_URL}?q=${encodedInput}&type=json&maxRows=10&style=full&lang=en&username=${PARAM_USERNAME}&formatted=true`;

            const response = await fetch(`${PARAM_URL}`);

            if (!response.ok) {

                throw `Error: ${response.status} - ${response.statusText}`;
            }

            const data = await response.json();

            return data;

        } catch (error) {

            throw error;
        }

    } else {

        throw "Error: Invalid input.";
    }
}


async function actualizarUI(data) {

    try {

        const geoname = data.geonames[0].name;
        const countryName = data.geonames[0].countryName;
        const longtitude = data.geonames[0].lng;
        const latitud = data.geonames[0].lat;
        const población = numeral(data.geonames[0].población).format('0,0');

        let metricSymbol = '&#176;';

        document.getElementById("fecha").innerHTML = travelDate || "(Date Not Set)";
        document.getElementById("ciudad").innerHTML = `City: ${geoname}`;
        document.getElementById("codigo").innerHTML = `Country: ${countryName}`;
        document.getElementById("longitud").innerHTML = `Longtitude: ${longtitude} ${metricSymbol}`;
        document.getElementById("latitud").innerHTML = `latitud: ${latitud} ${metricSymbol}`;
        document.getElementById("población").innerHTML = `population: ${población}`;



    } catch (error) {

        throw error;
    }
}

function getGeoName() {

    const input = document.getElementById("destino").value;
    let date = document.getElementById("departDate").value;
    travelDate = date ? format(parseISO(date), 'MM/dd/yyyy') : '';

    try {

        const isInputValid = validar(input);

        if (isInputValid) {

            fetchGeoData(input)
                .then((data) => {
                    if (data) {
    
                        actualizarUI(data);
                    }
                })
                .catch((error) => {
         
                    alert(error);
                });
        } else {

            alert("Please enter a valid city name.");
        }
    } catch (error) {

        alert(error);
    }
}

document.getElementById(getData).addEventListener("click", getGeoName);
export { getGeoName }