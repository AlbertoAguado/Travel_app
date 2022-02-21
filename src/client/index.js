//styles
import './styles/style.scss'
//js
import { getGeoNames } from './js/apiGeonames.js'
import { getWeatherData } from './js/apiWeatherbit.js'
import { getPictureData } from './js/apiPixabay.js'
import { tripCountdown } from './js/countdown.js'
//Images
import './views/img/This.png'
import './views/img/is.png'
import './views/img/My_travel_app.png'
import './views/img/sasek.png'
import './views/img/no-image.png'


function registerServiceWorker() {

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('Service Worker registration failed: ', registrationError);
                });
        });
    }
}

registerServiceWorker();