import confetti from 'canvas-confetti';

const bugBtn = document.getElementById('bugBtn');
const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('scoreDisplay');
const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const statusDisplay = document.getElementById('gameStatus');

let score = 0;
let timeLeft = 30;
let gameInterval;
let isPlaying = false;

// Función para mover el bug a una posición aleatoria
function moveBug() {
    if (!isPlaying) return;

    // Calculamos límites restando el tamaño del bug (50px)
    const maxX = board.clientWidth - 50;
    const maxY = board.clientHeight - 50;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    bugBtn.style.left = `${randomX}px`;
    bugBtn.style.top = `${randomY}px`;
}

// Click en el bug
bugBtn.addEventListener('click', () => {
    if (isPlaying) {
        score++;
        scoreDisplay.textContent = score;
        // Efecto visual rápido
        bugBtn.style.transform = 'scale(0.5)';
        setTimeout(() => bugBtn.style.transform = 'scale(1)', 100);
        moveBug();
    }
});

// Iniciar juego
startBtn.addEventListener('click', () => {
    if (isPlaying) return;

    // Reset
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft + 's';
    statusDisplay.textContent = 'Compilando...';
    startBtn.disabled = true;
    startBtn.textContent = 'Ejecutando...';

    isPlaying = true;
    moveBug(); // Mover al inicio

    // Loop del temporizador
    gameInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft + 's';

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
});

function endGame() {
    clearInterval(gameInterval);
    isPlaying = false;
    statusDisplay.textContent = 'Finalizado';
    startBtn.disabled = false;
    startBtn.textContent = 'Reiniciar Compilación';
    confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
            
    alert(`¡Tiempo agotado! Has eliminado ${score} bugs.`);
}