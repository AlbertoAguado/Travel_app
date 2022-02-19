import './styles/style.scss'
import { getGeoName } from './js/apiGeonames.js'
import { getWeatherData } from './js/apiWeatherbit.js'
import { getPictureData } from './js/apiPixabay.js'
import { tripCountdown } from './js/countdown.js'



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