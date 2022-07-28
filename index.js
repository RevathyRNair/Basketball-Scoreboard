let rounds = 1;
let homeTotalScore = 0;
let guestTotalScore = 0;
let matchDuration = 12;

const startButton = document.getElementById("start-btn");
const minuteVal = document.querySelector(".minute-val");
const secondVal = document.querySelector(".seconds-val");

const homeRound1Score = document.querySelector(".home-round-1");
const homeRound2Score = document.querySelector(".home-round-2");
const homeRound3Score = document.querySelector(".home-round-3");
const homeRound4Score = document.querySelector(".home-round-4");

const homePoint = document.querySelector(".home-pt");
const guestPoint = document.querySelector(".guest-pt");

const addPointButton = document.querySelectorAll(".add-pt-btn");
console.log(addPointButton);

const guestRound1Score = document.querySelector(".guest-round-1");
const guestRound2Score = document.querySelector(".guest-round-2");
const guestRound3Score = document.querySelector(".guest-round-3");
const guestRound4Score = document.querySelector(".guest-round-4");

const message = document.querySelector(".display-msg");

const renderMins = (minVal) => (minuteVal.textContent = String(minVal).padStart(2, 0));

const renderSecs = (secValue) => (secondVal.textContent = String(secValue).padStart(2, 0));

const addHomeRound1Score = (score) => (homeRound1Score.textContent = score);
const addGuestRound1Score = (score) => (guestRound1Score.textContent = score);

const addHomeTotalScore = (val) => (homeTotalScore += val);
const displayHomeScore = (score) => (homePoint.textContent = score);
const addGuestTotalScore = (val) => (guestTotalScore += val);
const displayGuestScore = (score) => (guestPoint.textContent = score);

const showMessage = (msgEl, msgVal) => (msgEl.textContent = msgVal);

addPointButton.forEach((btn) => {
    console.log("Entered forEach loop");
    btn.addEventListener("click", function (e) {
        console.log("Entered click event");
        const buttonIsWithAttribute = e.target.getAttribute("data-addPointAttribute");
        console.log(buttonIsWithAttribute);
    
        if (buttonIsWithAttribute === "home-add-1") {
            addHomeTotalScore(1);
            displayHomeScore(homeTotalScore);
        }
    
        if (buttonIsWithAttribute === "home-add-2") {
            addHomeTotalScore(2);
            displayHomeScore(homeTotalScore);
        }
    
        if (buttonIsWithAttribute === "home-add-3") {
            addHomeTotalScore(3);
            displayHomeScore(homeTotalScore);
        }
    
        if (buttonIsWithAttribute === "guest-add-1") {
            addGuestTotalScore(1);
            displayGuestScore(guestTotalScore);
        }
    
        if (buttonIsWithAttribute === "guest-add-2") {
            addGuestTotalScore(2);
            displayGuestScore(guestTotalScore);
        }
    
        if (buttonIsWithAttribute === "guest-add-3") {
            addGuestTotalScore(3);
            displayGuestScore(guestTotalScore);
        }
        });
});
 

startButton.addEventListener("click", start);

function start() {
    console.log("Start button clicked");
    let mins, sec, timeup;
    let interval;
    let timer = matchDuration * 60;
    function startTimer() {
        mins = Math.floor(timer / 60);
        sec = timer % 60;
        timeup = mins <= 0 && sec <= 0;
    
        renderMins(mins);
        renderSecs(sec);
    
        if(timeup) {
            clearInterval(interval);
            addHomeRound1Score(homePoint.textContent);
            addGuestRound1Score(guestPoint.textContent);
            showMessage(message, "Round one Over");
            resetScores();
        }
    
        timer --;
    }
    interval = setInterval(startTimer, 1000);
}

const resetScores = () => {
    setTimeout(() => {
      showMessage(message, " ");
      homePoint.textContent = guestPoint.textContent = 0;
    }, 5000);
};

