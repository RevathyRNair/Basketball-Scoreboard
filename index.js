const startButton = document.getElementById("start-btn");
const minTimeInterval = document.querySelector(".minute-interval");
const secTimeInterval = document.querySelector(".seconds-interval");
const addPointButton = document.querySelectorAll(".add-point-btn");
const homeScoreValue = document.querySelector(".home-point");
const guestScoreValue = document.querySelector(".guest-point");
const homeRoundOneScore = document.querySelector(".home-round-1");
const homeRoundTwoScore = document.querySelector(".home-round-2");
const homeRoundThreeScore = document.querySelector(".home-round-3");
const guestRoundOneScore = document.querySelector(".guest-round-1");
const guestRoundTwoScore = document.querySelector(".guest-round-2");
const guestRoundThreeScore = document.querySelector(".guest-round-3");
const messageBox = document.querySelector(".message-box");

let homeScore = 0;
let guestScore = 0;
let matchDuration = 0.25;

const isDisabled = (boolean) => (startButton.disabled = boolean);

const showMessage = (element, message) => (element.textContent = message);
const addHomeScore = (score) => (homeScoreValue.textContent = score);
const addGuestScore = (score) => (guestScoreValue.textContent = score);
const addHomeGroupScore = (amount) => (homeScore = homeScore + amount);
const addGuestGroupScore = (amount) => (guestScore = guestScore + amount);
const addHomeRoundOneScore = (score) => (homeRoundOneScore.textContent = score);
const addHomeRoundTwoScore = (score) => (homeRoundTwoScore.textContent = score);

const renderMins = (minValue) =>
  (minTimeInterval.textContent = String(minValue).padStart(2, 0));

const renderSecs = (secValue) =>
  (secTimeInterval.textContent = String(secValue).padStart(2, 0));

const addHomeRoundThreeScore = (score) =>
  (homeRoundThreeScore.textContent = score);

const addGuestRoundOneScore = (score) =>
  (guestRoundOneScore.textContent = score);

const addGuestRoundTwoScore = (score) =>
  (guestRoundTwoScore.textContent = score);

const addGuestRoundThreeScore = (score) =>
  (guestRoundThreeScore.textContent = score);

const resetScores = () => {
  setTimeout(() => {
    showMessage(messageBox, " ");
    homeScoreValue.textContent = guestScoreValue.textContent = 0;
    guestScore = homeScore = 0;
  }, 3000);
};

addPointButton.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const buttonIsWithAttribute = e.target.getAttribute("data-add-point");

    if (buttonIsWithAttribute === "home-point-1") {
      addHomeGroupScore(1);
      addHomeScore(homeScore);
    }

    if (buttonIsWithAttribute === "home-point-2") {
      addHomeGroupScore(2);
      addHomeScore(homeScore);
    }

    if (buttonIsWithAttribute === "home-point-3") {
      addHomeGroupScore(3);
      addHomeScore(homeScore);
    }

    if (buttonIsWithAttribute === "guest-point-1") {
      addGuestGroupScore(1);
      addGuestScore(guestScore);
    }

    if (buttonIsWithAttribute === "guest-point-2") {
      addGuestGroupScore(2);
      addGuestScore(guestScore);
    }

    if (buttonIsWithAttribute === "guest-point-3") {
      addGuestGroupScore(3);
      addGuestScore(guestScore);
    }
  });
});

startButton.addEventListener("click", () => {
  isDisabled(true);
  let timeInterval;
  let timerRange = matchDuration * 60;

  const startMatch = () => {
    let mins, sec, timeup;

    mins = Math.floor(timerRange / 60);
    sec = timerRange % 60;
    timeup = mins <= 0 && sec <= 0;

    renderMins(mins);
    renderSecs(sec);

    if (timeup) {
      clearInterval(timeInterval);
      isDisabled(false);
      addHomeRoundOneScore(homeScoreValue.textContent);
      addGuestRoundOneScore(guestScoreValue.textContent);
      showMessage(messageBox, "Round one Over");
      resetScores();
    }

    /*     if (timeup) {
      clearInterval(timeInterval);
      addHomeRoundTwoScore(homeScoreValue.textContent);
      addGuestRoundTwoScore(guestScoreValue.textContent);
      showMessage(messageBox, "Round two Over");
      resetScores();
    }

    if (timeup) {
      clearInterval(timeInterval);
      addHomeRoundTwoScore(homeScoreValue.textContent);
      addGuestRoundTwoScore(guestScoreValue.textContent);
      showMessage(messageBox, "Round two Over");
      resetScores();
    } */

    timerRange--;
  };

  timeInterval = setInterval(startMatch, 1000);
});
