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
let explosionHappened = {
  1000: false,
  10000: false,
  100000: false,
  1000000: false,
  10000000: false,
  100000000: false,
  1000000000: false,
};

function attScore() {
  document.getElementById("score").innerText = score;
}

function cps() {
  const now = Date.now();
  const secondsPassed = (now - lastUpdateTime) / 1000;

  if (secondsPassed >= 1) {
    currentCPS = totalClicks / secondsPassed;
    totalClicks = 0;
    lastUpdateTime = now;
    document.getElementById("cps").innerText = currentCPS.toFixed(1);
  }
}

// Cps
setInterval(cps, 1000);

// upgrades

function clickIncrement() {
  score += clickValue;
  totalClicks += clickValue;
  if (score >= 1000 && !explosionHappened[1000]) {
    explosionEffect(200, 100);
    explosionHappened[1000] = true;
  }
  if (score >= 10000 && !explosionHappened[10000]) {
    explosionEffect(400, 200);
    explosionHappened[10000] = true;
  }
  if (score >= 100000 && !explosionHappened[100000]) {
    explosionEffect(800, 400);
    explosionHappened[100000] = true;
  }
  if (score >= 1000000 && !explosionHappened[1000000]) {
    explosionEffect(1600, 800);
    explosionHappened[1000000] = true;
  }
  if (score >= 10000000 && !explosionHappened[10000000]) {
    explosionEffect(3200, 1600);
    explosionHappened[10000000] = true;
  }
  if (score >= 100000000 && !explosionHappened[100000000]) {
    explosionEffect(6400, 3200);
    explosionHappened[100000000] = true;
  }
  if (score >= 1000000000 && !explosionHappened[1000000000]) {
    explosionEffect(10000, 5000);
    explosionHappened[1000000000] = true;
    alert(
      "Congratulations! You've reached 1 billion clicks! You've unlocked the secret ending of this game. Thank you for playing!"
    );
  }
  attScore();
}

function maisclick(clickIncrement) {
  if (score >= maisclickValue) {
    score -= maisclickValue;
    clickValue += 1;
    maisclickValue = Math.round((maisclickValue *= 2.2));
    attScore();
  } else {
    alert("Você não tem clicks suficientes!");
  }
  document.getElementById("maisclickValue").innerText = maisclickValue;
}

function autoclick() {
  if (score >= autoclickValue) {
    score -= autoclickValue;
    autoclickSpeed = Math.max(100, autoclickSpeed * 0.8);
    autoclickValue = Math.round((autoclickValue *= 2.2));

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
  document.getElementById("autoclick").innerText = autoclickValue;
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
    document.getElementById("rebirths").innerText = rebirthCount;
    document.getElementById("rebirthCost").innerText =
      rebirthCost.toLocaleString();
    if (autoClickInterval) {
      clearInterval(autoClickInterval);
      autoClickInterval = null;
    }
    attScore();
    document.getElementById("maisclickValue").innerText = maisclickValue;
    document.getElementById("autoclick").innerText = autoclickValue;
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

// Save and Load and clearSave
const SAVE_KEY = "clicker_save_v1";
function saveGame() {
  const saveData = {
    score,
    clickValue,
    totalClicks,
    autoclickSpeed,
    autoclickValue,
    maisclickValue,
    rebirthCount,
    rebirthCost,
    autoClickActive: !!autoClickInterval,
    savedAt: Date.now(),
  };

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    console.log("Saved!", saveData);
  } catch (err) {
    console.error("Error: ", err);
  }
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) {
    return;
  }

  try {
    const data = JSON.parse(raw);
    score = Number(data.score) || 0;
    clickValue = Number(data.clickValue) || 1;
    totalClicks = Number(data.totalClicks) || 0;
    autoclickSpeed = Number(data.autoclickSpeed) || 3000;
    autoclickValue = Number(data.autoclickValue) || 1000;
    maisclickValue = Number(data.maisclickValue) || 50;
    rebirthCount = Number(data.rebirthCount) || 0;
    rebirthCost = Number(data.rebirthCost) || 1000000;

    attScore();
    document.getElementById("rebirths").innerText = rebirthCount;
    document.getElementById("rebirthCost").innerText =
      rebirthCost.toLocaleString();
    document.getElementById("maisclickValue").innerText = maisclickValue;
    document.getElementById("autoclick").innerText = autoclickValue;

    if (data.autoClickActive) {
      if (autoClickInterval) clearInterval(autoClickInterval);
      autoClickInterval = setInterval(() => {
        score += 1;
        totalClicks += 1;
        attScore();
      }, autoclickSpeed);
    }

    lastUpdateTime = Date.now();
    currentCPS = 0;
    document.getElementById("cps").innerText = currentCPS.toFixed(1);
  } catch (err) {
    console.error("Error", err);
  }
}

function clearSave() {
  if (
    confirm(
      "Are you sure you want to clear your save? This action cannot be undone."
    )
  ) {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
}

// autosave when closing or refreshing the page
window.onbeforeunload = function () {
  saveGame();
};

function toggleSettings() {
  const configDiv = document.querySelector(".config");
  if (configDiv.style.display === "none") {
    configDiv.style.display = "block";
  } else {
    configDiv.style.display = "none";
  }
}
