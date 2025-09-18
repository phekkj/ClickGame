let score = 0;
let clickValue = 1;
let totalClicks = 0;
// upgrades
let autoClickInterval = null;
let autoclickSpeed = 3000;
let autoclickValue = 1000;
let maisclickValue = 50;

// cps variables
let currentCPS = 0;
let lastUpdateTime = Date.now();    

function clickIncrement() {
    score += clickValue;
    totalClicks += clickValue;
    attScore();
}

function attScore() {
    document.getElementById('score').innerText = score;
}

function maisclick(clickIncrement) {
    if (score >= maisclickValue) {
        score -= maisclickValue;
        clickValue += 1;
        maisclickValue = Math.round(maisclickValue *= 2.2);
        attScore();
    } else {
        alert("Você não tem clicks suficientes!");
    }
    document.getElementById('maisclickValue').innerText = maisclickValue;
}

function autoclick() {
    if (score >= autoclickValue) {
        score -= autoclickValue;
        autoclickSpeed = Math.max(100, autoclickSpeed * 0.8);
        autoclickValue = Math.round(autoclickValue *= 2.2);

        if (autoClickInterval) {
            clearInterval(autoClickInterval);
        }

        autoClickInterval = setInterval(() => {
            score += 1;
            totalClicks += 1;
            attScore();
        }, autoclickSpeed);

        attScore();

    } else {
        alert("Você não tem clicks suficientes!");
    }
    document.getElementById('autoclick').innerText = autoclickValue;
}

function cps() {
    const now = Date.now();
    const secondsPassed = (now - lastUpdateTime) / 1000;

    if (secondsPassed >= 1) {
        currentCPS = totalClicks / secondsPassed;
        totalClicks = 0;
        lastUpdateTime = now;
        document.getElementById('cps').innerText = currentCPS.toFixed(1);
    }
}

// Cps
setInterval(cps, 100);