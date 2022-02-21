/*CLAVES*/ 
const API_URL = 'https://pixabay.com/api/?';
const API_KEY = process.env.CLAVE_PIXABAY;
/*claves*/


//Function to ckeck is if valid and not empty
function validateInput(input) {
    const isInputValid = input ? input.length > 0 : false;
    return isInputValid;
}

//Function to get the picture from Pixabay
async function fetchPixabayPicture(input) {
    //1st validate the input
    const isInputValid = validateInput(input);

    if (isInputValid) {

        //encoding the city to clean it
        let encodedInput = encodeURIComponent(input);

        try {

            //Fetch from pixabay
            const response = await fetch(`${API_URL}key=${API_KEY}&q=${encodedInput}&image_type=photo`);

            if (!response.ok) {

                throw `Error: ${response.status} - ${response.statusText}`;
            }

            //Get json data    
            const data = await response.json();

            return data;
        } catch (error) {

            throw error;
        }
    } else {

        throw "Error: Invalid input.";
    }
}

//Function to get the picture and update ui
function getPictureData() {

    const input = document.getElementById("destino").value;

    try {

        const isInputValid = validateInput(input);

        if (isInputValid) {
      
            fetchPixabayPicture(input)
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

        const pixabayData = data.hits[0].webformatURL

        document.getElementById("imagen-ciudad").setAttribute("src", pixabayData);

    } catch (error) {

        throw error;
    }
}

//On click get picture data
document.getElementById("getDataButton").addEventListener("click", getPictureData);

export { getPictureData }