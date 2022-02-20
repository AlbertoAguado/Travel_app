/*CLAVES*/
const API_URL = 'https://api.weatherbit.io/v2.0/current?';
const API_KEY = process.env.CLAVE_WEATHERBIT;
/*claves*/ 

function validateInput(input) {

    const isInputValid = input ? input.length > 0 : false;

    return isInputValid;
}

async function fetchWeatherData(input) {

    const isInputValid = validateInput(input);

    if (isInputValid) {

        let encodedInput = encodeURIComponent(input);

        try {

            const response = await fetch(`${API_URL}&city=${encodedInput}&key=${API_KEY}&units=M`);

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

function getWeatherData() {

    const input = document.getElementById("destino").value;

    try {

        const isInputValid = validateInput(input);

        if (isInputValid) {

            fetchWeatherData(input)
                .then((data) => {
                    if (data) {
       
                        updateUI(data);
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

async function updateUI(data) {

    try {

        let temperature = data.data[0].app_temp
        let icon = data.data[0].weather.icon
        let iconurl = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

        document.getElementById("clima").innerHTML = `Weather: ${temperature} ºC`;
        document.getElementById("imagen-clima").setAttribute("src", iconurl);

    } catch (error) {
        
        throw error;
    }
}

document.getElementById("getDataButton").addEventListener("click", getWeatherData);

export { getWeatherData }