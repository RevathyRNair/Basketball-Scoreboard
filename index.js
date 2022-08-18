const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const minuteVal = document.querySelector(".minute-val");
const secondVal = document.querySelector(".seconds-val");

const homeArr = document.querySelectorAll('.home-round');
const guestArr = document.querySelectorAll('.guest-round');

const homePoint = document.querySelector(".home-pt");
const guestPoint = document.querySelector(".guest-pt");

const addPointButton = document.querySelectorAll(".add-pt-btn");
const totalHomeScore = document.querySelector(".total-home-score");
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
let homeScoreArray = [];
let guestScoreArray = [];

disableStart(false);

const renderMins = (minVal) => (minuteVal.textContent = String(minVal).padStart(2, 0));
const renderSecs = (secValue) => (secondVal.textContent = String(secValue).padStart(2, 0));
const showMessage = (msgEl, msgVal) => (msgEl.textContent = msgVal);

function addTotalScore(team, points) {
  if(team === "home") {
    homeTotalScore += points;
    homePoint.textContent = homeTotalScore;
  }
  else if(team === "guest") {
    guestTotalScore += points;
    guestPoint.textContent = guestTotalScore;
  }
}

function showResetButton() {
  startButton.style.display = "none";
  resetButton.style.display = "block";
}

function eachRoundScoreDisplay (roundVal) {
  let i = roundVal-1;

  homeArr[i].textContent = homeScoreArray[i];
  guestArr[i].textContent = guestScoreArray[i];

  if(i === homeArr.length-1) {
    calculateFinalScore();
  }
}

function calculateFinalScore() {
  
  for (let j = 0; j < homeArr.length; j++) {
    hFinalScore += parseInt(homeScoreArray[j]);
    gFinalScore += parseInt(guestScoreArray[j]);
  }
  
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
    let pointNum = buttonIsWithAttribute.split('-');
    let teamName = pointNum[0];
    let addPoint = parseInt(pointNum[2]);
    addTotalScore(teamName, addPoint);
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
      homeScoreArray.push(hPoint);
      guestScoreArray.push(gPoint);
      eachRoundScoreDisplay(rounds);

      let rMsg = "";
      if (rounds < 4) {
        rMsg = "Round " +rounds+ " Over";
      }
      else {
        rMsg = "Match Over";
      }
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