let score = 0;
let clickValue = 1;
let totalClicks = 0;

// upgrades variables
let autoClickInterval = null;
let autoclickSpeed = 3000;
let autoclickValue = 1000;
let maisclickValue = 50;
let rebirthCount = 0;

// cps variables
let currentCPS = 0;
let lastUpdateTime = Date.now();    

function attScore() {
    document.getElementById('score').innerText = score;
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

// upgrades

function clickIncrement() {
    score += clickValue;
    totalClicks += clickValue;
    attScore();
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

//rebirth
function rebirth() {
    if (score >= 1000000) {
        score = 0;
        clickValue = 1;
        totalClicks = 0;
        autoclickSpeed = 3000;
        autoclickValue = 1000;
        maisclickValue = 50;
        rebirthCount += 1;
        document.getElementById('rebirths').innerText = rebirthCount;
        if (autoClickInterval) {
            clearInterval(autoClickInterval);
            autoClickInterval = null;
        }
        attScore();
        document.getElementById('maisclickValue').innerText = maisclickValue;
        document.getElementById('autoclick').innerText = autoclickValue;
        alert("Você renasceu! Todos os upgrades foram resetados.");

    } else {
        alert("Você precisa de pelo menos 1M de clicks para renascer!");
    }
}

// efects + additonals
