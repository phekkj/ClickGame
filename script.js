let score = 0;

        function clickIncrement(){
            score++;
            display.textContent = score;
        };

let clickValue = 1;

function clickIncrement() {
    score += clickValue;
    attScore();
}

function attScore() {
    document.getElementById('score').innerText = score;
}

function upgrade(clickIncrement) {
    if (score >= 20) {
        score -= 20;
        clickValue += 1;
        attScore();
    } else {
        alert("Você não tem clicks suficientes!");
    }
}