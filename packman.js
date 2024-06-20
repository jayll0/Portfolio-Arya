// Prevent the default action of arrow keys to avoid scrolling
window.addEventListener("keydown", function (e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.key) > -1) {
        e.preventDefault();
    }
}, false);

const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

const pacman = {
    x: 50,
    y: 50,
    radius: 20,
    direction: 0,
    speed: 2
};

const keyMap = {
    ArrowUp: { dx: 0, dy: -1, direction: 1.5 * Math.PI },
    ArrowDown: { dx: 0, dy: 1, direction: 0.5 * Math.PI },
    ArrowLeft: { dx: -1, dy: 0, direction: Math.PI },
    ArrowRight: { dx: 1, dy: 0, direction: 0 }
};

document.addEventListener("keydown", (event) => {
    if (keyMap[event.key]) {
        pacman.dx = keyMap[event.key].dx * pacman.speed;
        pacman.dy = keyMap[event.key].dy * pacman.speed;
        pacman.direction = keyMap[event.key].direction;
    }
});

function update() {
    pacman.x += pacman.dx || 0;
    pacman.y += pacman.dy || 0;

    if (pacman.x < pacman.radius) pacman.x = pacman.radius;
    if (pacman.x > canvas.width - pacman.radius) pacman.x = canvas.width - pacman.radius;
    if (pacman.y < pacman.radius) pacman.y = pacman.radius;
    if (pacman.y > canvas.height - pacman.radius) pacman.y = canvas.height - pacman.radius;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.radius, pacman.direction + 0.25 * Math.PI, pacman.direction + 1.75 * Math.PI);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fill();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop); // Continue the loop
}

// Start the game loop
requestAnimationFrame(gameLoop);
