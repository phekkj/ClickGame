let score = 0;
let clickValue = 1;
let totalClicks = 0;

// upgrades variables
let autoClickInterval = null;
let autoclickSpeed = 3000;
let autoclickValue = 1000;
let maisclickValue = 50;
let rebirthCount = 0;
let rebirthCost = 1000000;

// cps variables
let currentCPS = 0;
let lastUpdateTime = Date.now();    

// event variables
// let explosionConst = 1000;

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
setInterval(cps, 1000);

// upgrades

function clickIncrement() {
    score += clickValue;
    totalClicks += clickValue;
    /* if (score >= 1000) {
        explosionEffect(200, 100);
    }
    if (score >= 10000) {
        explosionEffect(500, 250);
    }
    if (score >= 100000) {
        explosionEffect(1000, 500);
    }
    if (score >= 1000000) {
        explosionEffect(2000, 800);
    }
    if (score >= 10000000) {
        explosionEffect(3000, 1000);
    }
    if (score >= 100000000) {
        explosionEffect(6000, 3000);
    }
    if (score >= 1000000000) {
        explosionEffect(10000, 1000);
        alert("Parabéns! Você alcançou 1B de clicks! Você é um verdadeiro mestre dos clicks!");
    } */

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
    if (score >= rebirthCost) {
        score = 0;
        clickValue = 1;
        totalClicks = 0;
        autoclickSpeed = 3000;
        autoclickValue = 1000;
        maisclickValue = 50;
        rebirthCount += 1;
        rebirthCost = Math.round(rebirthCost * 1.5);
        document.getElementById('rebirths').innerText = rebirthCount;
        document.getElementById('rebirthCost').innerText = rebirthCost.toLocaleString();
        if (autoClickInterval) {
            clearInterval(autoClickInterval);
            autoClickInterval = null;
        }
        attScore();
        document.getElementById('maisclickValue').innerText = maisclickValue;
        document.getElementById('autoclick').innerText = autoclickValue;
        alert("Você renasceu! Todos os upgrades foram resetados.");

    } else {
        alert(`Você precisa de pelo menos ${rebirthCost} de clicks para renascer!`);
    }
}

// efects + additonals
function explosionEffect(particleCount, maxDistance) {
    const container = document.querySelector(".content");

    for (let i = 0; i < 500; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        particle.style.left = "50%";
        particle.style.top = "30%";

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 300 + 90;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.setProperty("--x", `${x}px`);
        particle.style.setProperty("--y", `${y}px`);

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}