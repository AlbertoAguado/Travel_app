const API_KEY = process.env.CLAVE_PIXABAY;

function validar(input) {
    const isInputValid = input ? input.length > 0 : false;
    return isInputValid;
}

async function fetchImage(input) {
    const isInputValid = validar(input);

    if (isInputValid) {

        let encodedInput = encodeURIComponent(input);

        try {

            const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodedInput}&image_type=photo`);

            if (!response.ok) {

                throw `Error: ${response.status} - ${response.statusText}`;
            }

            const data = await response.json();

            return data;

        } catch (error) {

            throw error;
        }
    } else {

        throw "Error: Bad input.";
    }
}

async function actualizarUI(data) {

    try {

        const pixabayData = data.hits[0].webformatURL
        const imageUrl = pixabayData

        document.getElementById("imagen").setAttribute("src", imageUrl);

    } catch (error) {

        throw error;
    }
}

function getPictureData() {

    const input = document.getElementById("destino").value;

    try {
        const isInputValid = validar(input);

        if (isInputValid) {

            fetchImage(input)
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

document.getElementById(getData).addEventListener("click", getPictureData);

export { getPictureData }