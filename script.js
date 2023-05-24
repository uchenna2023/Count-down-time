let display__time_left = document.querySelector(".display__time-left");
let display__end_time = document.querySelector('.display__end-time');
const timer__button = document.querySelectorAll('.timer__button');
const customForm = document.querySelector('[name="customForm"]');
const mins = document.querySelector('[name="minutes"]');
let countDown;
// A function that runs every second
const Timer = (seconds) => {
    clearInterval(countDown);
    // Current time
    const now = Date.now();
    // Future time
    const future = now + seconds * 1000;
    displayTimeWillbeBack(future);
    displayCountDown(seconds);
    countDown = setInterval(() => {
        let secondsLeft = Math.round((future - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }
        //console.log(Math.abs(secondsLeft))
        //console.log(secondsLeft)
        displayCountDown(Math.abs(secondsLeft));
    }, 1000);
};
function displayCountDown(secondsLeft) {
    let minute = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    let display = `${minute}:${seconds < 10 ? "0" : ""}${seconds}`;
    display__time_left.textContent = display;
}
function displayTimeWillbeBack(future) {
    let formattedFuture = new Date(future);
    let futureHour = formattedFuture.getHours();
    let futureMinutes = formattedFuture.getMinutes();
    const display = `Be Back At ${futureHour > 12 ? futureHour % 12 : futureHour}:${futureMinutes < 10 ? '0' : ''}${futureMinutes}`;
    display__end_time.textContent = display;
}
function handlingCountDown() {
    const seconds = parseInt(this.dataset.time);
    Timer(seconds);
}
//Timer(60);
timer__button.forEach((button) => {
    button.addEventListener('click', handlingCountDown)
});
// A form can be directly the DOM object by it unique name
customForm.addEventListener('submit', (event) => {
    // Function stops default propagation of some events.
    event.preventDefault();
    const seconds = mins.value * 60;
    mins.value = '';
    Timer(seconds);
});