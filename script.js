let score = 0;
let clickValue = 1;

function clickIncrement() {
    score += clickValue;
    attScore();
}

function attScore() {
    document.getElementById('score').innerText = score;
}

function maisclick(clickIncrement) {
    if (score >= 50) {
        score -= 50;
        clickValue += 1;
        attScore();
    } else {
        alert("Você não tem clicks suficientes!");
    }
}

let autoClickInterval = null;

function autoclick() {  
    if (score >= 1000) {
        score -= 1000;
        attScore();
        autoClickInterval = setInterval( function() {
            score++;
            attScore();
        }, 1000);
    } else {
        alert("voce nao tem clicks");
    }
}

let popupTimeout;

function showPopUp(element) {
    clearTimeout(popupTimeout);

    const popup = document.getElementById('popup');
    const price = element.getAttribute('price');

    popup.innerHTML = `preço: ${price} cliques`;

    popup.style.top =  (event.pageY + 10) + 'px';
    popup.style.left = (event.pageX + 10) + 'px';

    popup.classList.add('visible');
}

function tchauPopUp() {
    const popup = document.getElementById('popup');
}