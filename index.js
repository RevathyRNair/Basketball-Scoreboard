
let rounds = 1;
let hval = 0;
let gval = 0;

function addHomePt1() {
    hval = hval + 1;
    console.log(hval);
    document.getElementById("home-pt").textContent = hval;
}

function addHomePt2() {
    hval = hval + 2;
    console.log(hval);
    document.getElementById("home-pt").textContent = hval;
}    

function addHomePt3() {
    hval = hval + 3;
    console.log(hval);
    document.getElementById("home-pt").textContent = hval;
}

function addGuestPt1() {
    gval = gval + 1;
    console.log(gval);
    document.getElementById("guest-pt").textContent = gval;
}

function addGuestPt2() {
    gval = gval + 2;
    console.log(gval);
    document.getElementById("guest-pt").textContent = gval;
}

function addGuestPt3() {
    gval = gval + 3;
    console.log(gval);
    document.getElementById("guest-pt").textContent = gval;
}

function reset() {
    hval = 0;
    gval = 0;
    document.getElementById("home-pt").textContent = hval;
    document.getElementById("guest-pt").textContent = gval;
}

//JS for timer

let interval = null;
const startingMinutes = 12;
let time = startingMinutes * 60;
const countdownEl = document.getElementById("time-val");

function start() {
    if(interval) {
        return
    }

    interval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    countdownEl.textContent = minutes + ":" + seconds;
    console.log(countdownEl.textContent);

    if(minutes<0){ 
        showMsg();
        reset();
        setTimeout(resetWindow, 5000);
        if(rounds == 1) {
            document.getElementById("h-val1").textContent = hval;
            document.getElementById("g-val1").textContent = gval;
        }
        if(rounds == 2) {
            document.getElementById("h-val2").textContent = hval;
            document.getElementById("g-val2").textContent = gval;
        }
        if(rounds == 3) {
            document.getElementById("h-val3").textContent = hval;
            document.getElementById("g-val3").textContent = gval;
        }
        if(rounds == 4) {
            document.getElementById("h-val4").textContent = hval;
            document.getElementById("g-val4").textContent = gval;
        }
        
    }
    time--;
    console.log(time);
}

function resetWindow() {
    window.location.href="index.html";
}

function showMsg() {
    let matchOverMsg = document.getElementById("match-over");
    matchOverMsg.textContent = "Round " + rounds + " Over!";
    console.log(matchOverMsg.textContent);
}

function reset() {
    document.getElementById("home-pt").textContent = 0;
    document.getElementById("guest-pt").textContent = 0;
    document.getElementById("time-val").textContent = "12:00";
}


