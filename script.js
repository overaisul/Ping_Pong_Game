document.addEventListener("DOMContentLoaded", function () {
  const height = 600;
  const width = 1200;
  let cellSize = 20;
  let score1 = 0;
  let score2 = 0;
  let gameStarted = false;
  let ball = { x: 60, y: 260 };
  let bat1 = [
    { x: 40, y: 240 },
    { x: 40, y: 260 },
    { x: 40, y: 280 },
    { x: 40, y: 300 },
  ];
  let bat2 = [
    { x: 1140, y: 240 },
    { x: 1140, y: 260 },
    { x: 1140, y: 280 },
    { x: 1140, y: 300 },
  ];
  bat1Size = cellSize;
  bat2Size = cellSize;
  function drawDiv(x, y, className) {
    let divElement = document.createElement("div");
    divElement.classList.add(className);
    divElement.style.top = `${y}px`;
    divElement.style.left = `${x}px`;
    return divElement;
  }

  function MakeBallandBat() {
    let gameArena = document.getElementById("game-arena");
    gameArena.innerHTML = "";
    bat1.forEach((batCell) => {
      let Bat1draw = drawDiv(batCell.x, batCell.y, "bat");
      gameArena.appendChild(Bat1draw);
    });
    bat2.forEach((batCell) => {
      let Bat1draw = drawDiv(batCell.x, batCell.y, "bat");
      gameArena.appendChild(Bat1draw);
    });
    let Balldraw = drawDiv(ball.x, ball.y, "ball");
    gameArena.appendChild(Balldraw);
  }

  let newX = 2;
  let newY = 2;

  function updateBall() {
    ball.x += newX;
    ball.y += newY;
    if (
      bat1[0].x + cellSize == ball.x &&
      bat1[0].y <= ball.y &&
      bat1[3].y >= ball.y
    ) {
      newX = -newX;
    }
    if (
      bat2[0].x - cellSize == ball.x &&
      bat2[0].y <= ball.y &&
      bat2[3].y >= ball.y
    ) {
      newX = -newX;
    }
    if (ball.y >= 580) {
      newY = -newY;
    }
    if (ball.y <= 0) {
      newY = -newY;
    }
    if (ball.x <= 0) {
      score2 += 1;
      let scoreBoard2 = document.getElementById("score-board2");
      scoreBoard2.textContent = `Player 2 - Score: ${score2}`;
      ball.x = 60;
      ball.y = bat1[2].y;
      newX = -newX;
    }
    if (ball.x >= 1180) {
      score1 += 1;
      let scoreBoard1 = document.getElementById("score-board1");
      scoreBoard1.textContent = `Player 1 - Score: ${score1}`;
      ball.x = 1120;
      ball.y = bat2[2].y;
      newX = -newX;
    }
    if (score1 == 10) {
      alert("Player 1 Won");
      score1 = 0;
      location.reload();
    }
    if (score2 == 10) {
      alert("Player 2 Won");
      score2 = 0;
      location.reload();
    }
  }

  function gameloop() {
    let interval = setInterval(() => {
      updateBall();
      MakeBallandBat();
    }, 10);
  }

  function changeDirection(e) {
    console.log(e.key);
    if (bat1[0].y > 0) {
      if (e.key === "w" || e.key === "W") {
        bat1Size = -cellSize;
        let newpart = { x: bat1[0].x, y: bat1[0].y + bat1Size };
        bat1.unshift(newpart);
        bat1.pop();
        MakeBallandBat();
      }
    }
    if (bat1[3].y < 580) {
      if (e.key === "s" || e.key === "S") {
        bat1Size = cellSize;
        let newpart = { x: bat1[0].x, y: bat1[3].y + bat1Size };
        bat1.push(newpart);
        bat1.shift();
        MakeBallandBat();
      }
    }
    if (bat2[0].y > 0) {
      if (e.key === "ArrowUp") {
        bat2Size = -cellSize;
        let newpart = { x: bat2[0].x, y: bat2[0].y + bat2Size };
        bat2.unshift(newpart);
        bat2.pop();
        MakeBallandBat();
      }
    }
    if (bat2[3].y < 580) {
      if (e.key === "ArrowDown") {
        bat2Size = cellSize;
        let newpart = { x: bat2[0].x, y: bat2[3].y + bat2Size };
        bat2.push(newpart);
        bat2.shift();
        MakeBallandBat();
      }
    }
  }

  function runGame() {
    if (!gameStarted) {
      gameStarted = true;
      document.addEventListener("keydown", changeDirection);
      gameloop();
    }
  }

  function initiateGame() {
    let gameArena = document.getElementById("game-arena");
    let divElement = document.createElement("div");
    divElement.classList.add("divElement");
    let scoreBoard1 = document.createElement("div");
    let scoreBoard2 = document.createElement("div");
    scoreBoard1.id = "score-board1";
    scoreBoard2.id = "score-board2";
    divElement.appendChild(scoreBoard1);
    divElement.appendChild(scoreBoard2);
    scoreBoard1.textContent = `Player 1 - Score: ${score1}`;
    scoreBoard2.textContent = `Player 2 - Score: ${score2}`;

    document.body.insertBefore(divElement, gameArena);
    let startButton = document.createElement("button");
    startButton.classList.add("start-button");
    MakeBallandBat();
    startButton.textContent = "Start Game";
    document.body.appendChild(startButton);
    startButton.addEventListener("click", function () {
      startButton.style.display = "none";
      runGame();
    });
  }
  initiateGame();
});
