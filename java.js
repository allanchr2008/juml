const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GRAVITY = 0.5;
const JUMP_STRENGTH = -10;

const keys = {};
let level = 0;

const levels = [
  
  // Nível 1
  [
    { x: 0, y: 350, width: 800, height: 50 },
    { x: 200, y: 280, width: 100, height: 20 },
    { x: 400, y: 200, width: 100, height: 20 },
    { x: 700, y: 150, width: 30, height: 50, goal: true },
  ],
  // Nível 2
  [
    { x: 0, y: 350, width: 800, height: 50 },
    { x: 150, y: 300, width: 80, height: 20 },
    { x: 300, y: 250, width: 80, height: 20 },
    { x: 450, y: 200, width: 80, height: 20 },
    { x: 600, y: 150, width: 30, height: 50, goal: true },
  ],
  // Nível 3
  [
    { x: 0, y: 380, width: 800, height: 20 },
    { x: 100, y: 320, width: 80, height: 20 },
    { x: 200, y: 260, width: 80, height: 20 },
    { x: 300, y: 200, width: 80, height: 20 },
    { x: 400, y: 140, width: 80, height: 20 },
    { x: 700, y: 100, width: 30, height: 50, goal: true },
  ],
  // Nível 4
  [
    { x: 0, y: 370, width: 800, height: 30 },
    { x: 100, y: 300, width: 60, height: 20 },
    { x: 180, y: 230, width: 60, height: 20 },
    { x: 260, y: 160, width: 60, height: 20 },
    { x: 340, y: 90, width: 60, height: 20 },
    { x: 700, y: 50, width: 30, height: 50, goal: true },
  ],
  // Nível 5
  [
    { x: 0, y: 350, width: 800, height: 50 },
    { x: 150, y: 300, width: 100, height: 20 },
    { x: 300, y: 250, width: 100, height: 20 },
    { x: 450, y: 200, width: 100, height: 20 },
    { x: 600, y: 150, width: 100, height: 20 },
    { x: 750, y: 100, width: 30, height: 50, goal: true },
  ],
  // Nível 6
  [
    { x: 0, y: 360, width: 800, height: 40 },
    { x: 100, y: 310, width: 60, height: 20 },
    { x: 200, y: 270, width: 60, height: 20 },
    { x: 300, y: 230, width: 60, height: 20 },
    { x: 400, y: 190, width: 60, height: 20 },
    { x: 500, y: 150, width: 60, height: 20 },
    { x: 700, y: 100, width: 30, height: 50, goal: true },
  ],
  // Nível 7
  [
    { x: 0, y: 390, width: 800, height: 10 },
    { x: 200, y: 300, width: 70, height: 20 },
    { x: 320, y: 240, width: 70, height: 20 },
    { x: 440, y: 180, width: 70, height: 20 },
    { x: 560, y: 120, width: 70, height: 20 },
    { x: 700, y: 60, width: 30, height: 50, goal: true },
  ],
  // Nível 8
  [
    { x: 0, y: 350, width: 800, height: 50 },
    { x: 100, y: 300, width: 60, height: 20 },
    { x: 200, y: 250, width: 60, height: 20 },
    { x: 300, y: 200, width: 60, height: 20 },
    { x: 400, y: 150, width: 60, height: 20 },
    { x: 500, y: 100, width: 60, height: 20 },
    { x: 700, y: 50, width: 30, height: 50, goal: true },
  ],
  // Nível 9
  [
    { x: 0, y: 370, width: 800, height: 30 },
    { x: 150, y: 310, width: 60, height: 20 },
    { x: 250, y: 260, width: 60, height: 20 },
    { x: 350, y: 210, width: 60, height: 20 },
    { x: 450, y: 160, width: 60, height: 20 },
    { x: 550, y: 110, width: 60, height: 20 },
    { x: 700, y: 60, width: 30, height: 50, goal: true },
  ],
  // Nível 10
  [
    { x: 0, y: 390, width: 800, height: 10 },
    { x: 100, y: 340, width: 70, height: 20 },
    { x: 200, y: 290, width: 70, height: 20 },
    { x: 300, y: 240, width: 70, height: 20 },
    { x: 400, y: 190, width: 70, height: 20 },
    { x: 500, y: 140, width: 70, height: 20 },
    { x: 600, y: 90, width: 70, height: 20 },
    { x: 700, y: 40, width: 30, height: 50, goal: true },
],
];

const player = {
  x: 50,
  y: 300,
  width: 30,
  height: 30,
  dy: 0,
  dx: 0,
  onGround: false
};

function resetPlayer() {
  player.x = 50;
  player.y = 300;
  player.dy = 0;
}

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function update() {
  player.dx = 0;

  if (keys["ArrowLeft"]) player.dx = -3;
  if (keys["ArrowRight"]) player.dx = 3;

  if (keys[" "] && player.onGround) {
    player.dy = JUMP_STRENGTH;
    player.onGround = false;
  }

  player.dy += GRAVITY;
  player.x += player.dx;
  player.y += player.dy;
  player.onGround = false;

  for (let plat of levels[level]) {
    if (checkCollision(player, plat)) {
      if (plat.goal) {
        level++;
        if (level >= levels.length) {
          alert("Parabéns! Você terminou os 10 níveis!");
          level = 0;
        }
        resetPlayer();
        return;
      }

      // colisão por cima
      if (player.dy > 0 && player.y + player.height <= plat.y + player.dy) {
        player.y = plat.y - player.height;
        player.dy = 0;
        player.onGround = true;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // jogador
  ctx.fillStyle = 'cyan';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // plataformas
  for (let plat of levels[level]) {
    ctx.fillStyle = plat.goal ? 'gold' : 'white';
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  }
}

function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
if (checkCollision(player, plat)) {
  if (plat.goal) {
    level++;
    if (level >= levels.length) {
      alert("Parabéns! Você terminou os 10 níveis!");
      level = 0;
    }
    resetPlayer();
    return;
  }

  const prevY = player.y - player.dy;
  const prevBottom = prevY + player.height;

  // colisão por cima
  if (player.dy > 0 && prevBottom <= plat.y) {
    player.y = plat.y - player.height;
    player.dy = 0;
    player.onGround = true;
  } else if (player.dy < 0 && player.y >= plat.y + plat.height) {
    // colisão por baixo
    player.y = plat.y + plat.height;
