function tripCountdown() {
    let date = document.getElementById("departDate").value

    const tiempo = document.getElementById('timer');

    const now = new Date();
    const difference = Date.parse(date) - Date.parse(now);

    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    tiempo.innerHTML = `Your trip is ${days} <span class="bold"> Days </span> ${hours} <span class="bold">Hours</span> ${minutes} <span class="bold">Minutes</span> away.`;
}


document.getElementById(getData).addEventListener("click", tripCountdown);

export { tripCountdown }