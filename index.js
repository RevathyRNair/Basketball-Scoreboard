const startButton = document.getElementById("start-btn");
const minuteVal = document.querySelector(".minute-val");
const secondVal = document.querySelector(".seconds-val");

const homeRound1Score = document.querySelector(".home-round-1");
const homeRound2Score = document.querySelector(".home-round-2");
const homeRound3Score = document.querySelector(".home-round-3");
const homeRound4Score = document.querySelector(".home-round-4");
const totalHomeScore = document.querySelector(".total-home-score");

const homePoint = document.querySelector(".home-pt");
const guestPoint = document.querySelector(".guest-pt");

var addPointButton = document.querySelectorAll(".add-pt-btn");

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
let matchDuration = 0.15;
let hFinalScore = 0;
let gFinalScore = 0;

disableStart(false);

const renderMins = (minVal) => (minuteVal.textContent = String(minVal).padStart(2, 0));
const renderSecs = (secValue) => (secondVal.textContent = String(secValue).padStart(2, 0));

const addHomeTotalScore = (val) => (homeTotalScore += val);
const displayHomeScore = (score) => (homePoint.textContent = score);
const addGuestTotalScore = (val) => (guestTotalScore += val);
const displayGuestScore = (score) => (guestPoint.textContent = score);

const showMessage = (msgEl, msgVal) => (msgEl.textContent = msgVal);

function eachRoundScoreDisplay (roundVal, hScore, gScore) {
  let rVal = roundVal;
  if (rVal == 1){
    homeRound1Score.textContent = hScore;
    guestRound1Score.textContent = gScore;
  }
  if (rVal == 2){
    homeRound2Score.textContent = hScore;
    guestRound2Score.textContent = gScore;
  }
  if (rVal == 3){
    homeRound3Score.textContent = hScore;
    guestRound3Score.textContent = gScore;
  }
  if (rVal == 4){
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
  if (hFinalScore > gFinalScore) {
    finalMsg.textContent = "The Winner is Team Home 🥳";
  }
  else if (hFinalScore < gFinalScore) {
    finalMsg.textContent = "The Winner is Team Guest 🥳";
  }
  else {
    finalMsg.textContent = "The Match is a Draw!";
  }
}

addPointButton.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const buttonIsWithAttribute = e.target.getAttribute("data-addPointAttribute");
  
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
  rounds++;
  disableStart(true);

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
      let hPoint = homePoint.textContent;
      let gPoint = guestPoint.textContent;
      clearInterval(interval);
      eachRoundScoreDisplay(rounds, hPoint, gPoint);
         
      if (rounds < 4){
        showMessage(message, "Round " +rounds+ " Over");
      }
      else {
        showMessage(message, "Match Over");
      }
          
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
  }, 3000);
};

function disableStart(status) {
  let startStatus = status;
  if(startStatus == true) {
    startButton.disabled = true;
  }
  else {
    startButton.disabled = false;
  }

  for (let i = 0; i < addPointButton.length; i++) {
    if(startStatus == true) {
      addPointButton[i].disabled = false;
    }
    else {
      addPointButton[i].disabled = true;
    }  
  }
}
