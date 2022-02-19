// API URL & Key
const API_URL = 'https://api.weatherbit.io/v2.0/current?';
const API_KEY = 'e1a6e12e8e704fe09548f845cdc3aa57';

const metricSign = '&#8457;'


function validar(input) {

    const isInputValid = input ? input.length > 0 : false;

    return isInputValid;
}

async function fetchWeatherData(input) {

    const isInputValid = validar(input);

    if (isInputValid) {

        let encodedInput = encodeURIComponent(input);

        try {

            const response = await fetch(`${API_URL}&city=${encodedInput}&key=${API_KEY}&units=I`);

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
    //

    try {

        let weatherData = data.data[0].app_temp
        let weatherIcon = data.data[0].weather.icon

        document.getElementById("weather").innerHTML = `Weather: ${weatherData} ${metricSign}`;

    } catch (error) {

        throw error;
    }
}

function getWeatherData() {

    const input = document.getElementById("destino").value;

    try {

        const isInputValid = validar(input);

        if (isInputValid) {
    
            fetchWeatherData(input)
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

document.getElementById(getData).addEventListener("click", getWeatherData);

export { getWeatherData }