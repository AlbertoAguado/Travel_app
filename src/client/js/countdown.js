function countdown() {
    let departure = Date.parse(document.getElementById("salida").value);
    let arrival =  Date.parse(document.getElementById("llegada").value);
    const date_now = Date.parse(new Date());
    
    const cuentaatrasViaje = document.getElementById('cuentaatras');
    const duracionViaje = document.getElementById('duracion');

    //Code taken from Stackoverflow
    //https://stackoverflow.com/questions/13903897/javascript-return-number-of-days-hours-minutes-seconds-between-two-dates
    let delta = Math.abs(departure - date_now) / 1000;
    
    let days = Math.floor(delta / 86400);
    let hours = Math.floor(delta / 3600) % 24;
    let minutes = Math.floor(delta / 60) % 60;

    cuentaatrasViaje.innerHTML = `Your trip will be in ${days} <span class="bold"> Days </span> ${hours} <span class="bold">Hours</span> ${minutes} <span class="bold">Minutes</span>.`;
    let length = Math.floor((arrival-departure) /1000)/86400;
    duracionViaje.innerHTML = `The length of your trip is ${length} days`;

}

document.getElementById("getDataButton").addEventListener("click", countdown);

export { countdown }