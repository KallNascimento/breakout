const canvas = document.getElementById("mainScreen");
const context = canvas.getContext("2d")
const ballRadius = 10;
const paddleHeight = 15;
const paddleWidth = 75;
const brickRowCount = 4;
const brickColumnCount = 9;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let paddleX = (canvas.width - paddleWidth) / 2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

document.addEventListener("keydown", this.keyDownHandler, false);
document.addEventListener("keyup", this.keyUpHandler, false);

var bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

const drawBall = () => {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
}

const drawPaddle = () => {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath()
}

const drawBricks = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickWidth + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight)
                context.fillStyle = "#E64848";
                context.fill();
                context.closePath();
            }
        }
    }
}
const drawScore = () => {
    context.font = "16px Arial";
    context.fillStyle = "#FFFFFF";
    context.fillText(`Score: ${score}`, 8, 20)
}
const drawLives = () => {
    context.font = "16px Arial";
    context.fillStyle = "#FFFFFF";
    context.fillText(`Lives: ${lives}`, canvas.width - 65, 20)
}
const collisionDetection = () => {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0
                    score++
                    if (score === brickRowCount * brickColumnCount) {
                        alert("CONGRATULATIONS, YOU WIN!");
                        document.location.reload()
                        clearInterval(this.interval)
                    }
                }
            }
        }
    }
}

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy;
            }
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw)

}
draw();