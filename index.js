const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const minuteVal = document.querySelector(".minute-val");
const secondVal = document.querySelector(".seconds-val");

const homeRound1Score = document.querySelector(".home-round-1");
const homeRound2Score = document.querySelector(".home-round-2");
const homeRound3Score = document.querySelector(".home-round-3");
const homeRound4Score = document.querySelector(".home-round-4");
const totalHomeScore = document.querySelector(".total-home-score");

const homePoint = document.querySelector(".home-pt");
const guestPoint = document.querySelector(".guest-pt");

let addPointButton = document.querySelectorAll(".add-pt-btn");

const guestRound1Score = document.querySelector(".guest-round-1");
const guestRound2Score = document.querySelector(".guest-round-2");
const guestRound3Score = document.querySelector(".guest-round-3");
const guestRound4Score = document.querySelector(".guest-round-4");
const totalGuestScore = document.querySelector(".total-guest-score");

const message = document.querySelector(".display-msg");
const finalMsg = document.querySelector(".final-msg");

let rounds = 0;
let homeTotalScore = 0;
let guestTotalScore = 0;
let matchDuration = 0.05;
let hFinalScore = 0;
let gFinalScore = 0;
let mins, sec, timeup, interval;

disableStart(false);

const renderMins = (minVal) => (minuteVal.textContent = String(minVal).padStart(2, 0));
const renderSecs = (secValue) => (secondVal.textContent = String(secValue).padStart(2, 0));

const addHomeTotalScore = (val) => (homeTotalScore += val);
const displayHomeScore = (score) => (homePoint.textContent = score);
const addGuestTotalScore = (val) => (guestTotalScore += val);
const displayGuestScore = (score) => (guestPoint.textContent = score);

const showMessage = (msgEl, msgVal) => (msgEl.textContent = msgVal);

function showResetButton() {
  startButton.style.display = "none";
  resetButton.style.display = "block";
}
function eachRoundScoreDisplay (roundVal, hScore, gScore) {

  if (roundVal === 1){
    homeRound1Score.textContent = hScore;
    guestRound1Score.textContent = gScore;
  }
  if (roundVal === 2){
    homeRound2Score.textContent = hScore;
    guestRound2Score.textContent = gScore;
  }
  if (roundVal === 3){
    homeRound3Score.textContent = hScore;
    guestRound3Score.textContent = gScore;
  }
  if (roundVal === 4){
    homeRound4Score.textContent = hScore;
    guestRound4Score.textContent = gScore;
    calculateFinalScore();
  } 
}

function calculateFinalScore() {
  hFinalScore = parseInt(homeRound1Score.textContent) + parseInt(homeRound2Score.textContent) + parseInt(homeRound3Score.textContent) + parseInt(homeRound4Score.textContent);
  gFinalScore = parseInt(guestRound1Score.textContent) + parseInt(guestRound2Score.textContent) + parseInt(guestRound3Score.textContent) + parseInt(guestRound4Score.textContent);
  
  totalHomeScore.textContent = hFinalScore;
  totalGuestScore.textContent = gFinalScore;

  let finalMessage = "";
  if (hFinalScore > gFinalScore) {
    finalMessage = "The Winner is Team Home 🥳"
  }
  else if (hFinalScore < gFinalScore) {
    finalMessage = "The Winner is Team Guest 🥳"
  }
  else if (hFinalScore === gFinalScore) {
    finalMessage = "The Match is a Draw!";
  }
  
  finalMsg.textContent = finalMessage;
  changeBgImage();
}

addPointButton.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const buttonIsWithAttribute = e.target.getAttribute("data-addPointAttribute");

    const hNum = buttonIsWithAttribute === "home-add-1" ? 1
      : buttonIsWithAttribute === "home-add-2" ? 2
      : buttonIsWithAttribute === "home-add-3" ? 3 : 0
    
    addHomeTotalScore(hNum);
    displayHomeScore(homeTotalScore);

    const gNum = buttonIsWithAttribute === "guest-add-1" ? 1
      : buttonIsWithAttribute === "guest-add-2" ? 2
      : buttonIsWithAttribute === "guest-add-3" ? 3 : 0
 
    addGuestTotalScore(gNum);
    displayGuestScore(guestTotalScore);  
  });
});

startButton.addEventListener("click", function() {

  if (rounds < 4) {
    start();
  }
  if (rounds === 4) {
    showResetButton();
  }
});

function start() {
  rounds++;
  disableStart(true);

  let timer = matchDuration * 60;
  function startTimer() {
    mins = Math.floor(timer / 60);
    sec = timer % 60;
    timeup = mins <= 0 && sec <= 0;
  
    renderMins(mins);
    renderSecs(sec);
  
    if(timeup) {
      let hPoint = homePoint.textContent;
      let gPoint = guestPoint.textContent;
      clearInterval(interval);
      eachRoundScoreDisplay(rounds, hPoint, gPoint);

      let rMsg = "";
      const roundMsg = rounds < 4 ? rMsg = "Round " +rounds+ " Over" : rMsg = "Match Over"
      showMessage(message, rMsg);
      resetScores();
      disableStart(false);
    }
    timer --;
  }
  interval = setInterval(startTimer, 1000);
}

const resetScores = () => {
  setTimeout(() => {
    showMessage(message, " ");
    homePoint.textContent = guestPoint.textContent = 0;
    homeTotalScore = guestTotalScore = 0;
  }, 3000);
};

function disableStart(status) {
  startButton.disabled = status;
  
  for (let i = 0; i < addPointButton.length; i++) {
    addPointButton[i].disabled = !status; 
  }
}

resetButton.addEventListener("click", function() {
  if (mins <= 0 && sec <= 0) {
    window.location.reload();
  }
})

function changeBgImage() {
  let imgPath = document.getElementById("img-id").style.backgroundImage;

  if(imgPath == "url(../images/basketball.jpeg)" || imgPath == "") {
    document.getElementById("img-id").style.backgroundImage = "url(../images/fireworks.gif)";
  }
  else {
    document.getElementById("img-id").style.backgroundImage = "url(../images/basketball.jpeg)";
  }
}