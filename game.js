const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const ball = document.getElementById('ball');

let playerX = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
let ballY = 0;
let ballX = Math.random() * (gameContainer.offsetWidth - ball.offsetWidth);
let score = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        playerX -= 20;
    } else if (e.key === 'ArrowRight') {
        playerX += 20;
    }
    playerX = Math.max(0, Math.min(gameContainer.offsetWidth - player.offsetWidth, playerX));
    player.style.left = `${playerX}px`;
});

function update() {
    ballY += 5;
    if (ballY > gameContainer.offsetHeight) {
        ballY = 0;
        ballX = Math.random() * (gameContainer.offsetWidth - ball.offsetWidth);
    }

    if (
        ballY + ball.offsetHeight > gameContainer.offsetHeight - player.offsetHeight &&
        ballX + ball.offsetWidth > playerX &&
        ballX < playerX + player.offsetWidth
    ) {
        ballY = 0;
        ballX = Math.random() * (gameContainer.offsetWidth - ball.offsetWidth);
        score++;
        alert(`Score: ${score}`);
    }

    ball.style.top = `${ballY}px`;
    ball.style.left = `${ballX}px`;

    requestAnimationFrame(update);
}

update();
