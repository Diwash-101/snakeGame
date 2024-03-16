let lastPaintTime = 0;
let snake = [[9, 9]];
let direction = [0, 0];
let dontRemove = false;
let gameOverVar = false;
let food = [
  Math.floor(Math.random() * 17) + 1,
  Math.floor(Math.random() * 17) + 1,
];
let highScore = 0;

function main(ctime) {
  window.requestAnimationFrame(main);
  if (ctime - lastPaintTime < 500) {
    return;
  }
  lastPaintTime = ctime;
  gameloop();
}

function gameloop() {
  checkEaten();
  nextTile = moveSnake();
  checkOutOfBounds(nextTile);
  checkCollision(nextTile);
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

function checkEaten() {
  if (JSON.stringify(food) == JSON.stringify(snake[0])) {
    dontRemove = true;
    food = [
      Math.floor(Math.random() * 17) + 1,
      Math.floor(Math.random() * 17) + 1,
    ];
    checkFoodInSnake();
  }
}
function checkFoodInSnake(val) {
  for (let i = 1; i < snake.length; i++) {
    if (JSON.stringify(snake[i]) == JSON.stringify(food)) {
      food = [
        Math.floor(Math.random() * 17) + 1,
        Math.floor(Math.random() * 17) + 1,
      ];
      console.log("food in snake");
      checkFoodInSnake();
    }
  }
}

function checkOutOfBounds(nextTile) {
  if (
    nextTile[0] < 1 ||
    nextTile[0] > 17 ||
    nextTile[1] < 1 ||
    nextTile[1] > 17
  ) {
    console.log("game is out of bounds");
    gameOver();
  }
}
function checkCollision(nextTile) {
  for (let i = 1; i < snake.length; i++) {
    if (nextTile[0] == snake[i][0] && nextTile[1] == snake[i][1]) {
      gameOverVar = true;
      gameOver();
    }
  }
}
function moveSnake() {
  nextTile = [snake[0][0] + direction[0], snake[0][1] + direction[1]];
  if (!gameOverVar) {
    snake.unshift(nextTile);
  }
  gameOverVar = false;

  if (dontRemove) {
    dontRemove = false;
    return nextTile;
  } else {
    snake.pop();
  }
  return nextTile;
}
function drawSnake() {
  snake.forEach((a, index) => {
    snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.gridRowStart = a[1];
    snakeElement.style.gridColumnStart = a[0];
    board.appendChild(snakeElement);
  });
}
function drawFood() {
  foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridRowStart = food[1];
  foodElement.style.gridColumnStart = food[0];
  board.appendChild(foodElement);
  updateScore();
}
function updateScore() {
  score = snake.length;
  scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "score:" + score;
}
function gameOver() {
  board.innerHTML = "";
  updateHighScore();
  direction = [0, 0];
  snake.splice(0, snake.length - 1, [9, 9]);
  alert("Game Over!");
  gameOverVar = true;
}
function updateHighScore() {
  score = snake.length;

  if (score > highScore) {
    highScore = snake.length;
    console.log("hello");
    HighScoreElement = document.getElementById("highScore");
    HighScoreElement.innerHTML = "high score:" + highScore;
  }
}
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = [0, -1];
      break;
    case "ArrowDown":
      direction = [0, 1];
      break;
    case "ArrowLeft":
      direction = [-1, 0];
      break;
    case "ArrowRight":
      direction = [1, 0];
      break;
  }
});
