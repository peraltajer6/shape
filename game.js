const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

const radius = 180;
let sides = 3;

const sidesText = document.getElementById("sides");
const shapeNameText = document.getElementById("shapeName");

sidesText.textContent = sides;

// Ball
const ball = {
  x: center.x,
  y: center.y,
  r: 8,
  vx: 3,
  vy: 2
};

/* ===== SHAPE NAMES 3 → 100 ===== */
const shapeNames = {
  3: "Triangle",
  4: "Square",
  5: "Pentagon",
  6: "Hexagon",
  7: "Heptagon",
  8: "Octagon",
  9: "Nonagon",
  10: "Decagon",
  11: "Hendecagon",
  12: "Dodecagon",
  13: "Tridecagon",
  14: "Tetradecagon",
  15: "Pentadecagon",
  16: "Hexadecagon",
  17: "Heptadecagon",
  18: "Octadecagon",
  19: "Enneadecagon",
  20: "Icosagon",

  21: "Henicosagon",
  22: "Docosagon",
  23: "Tricosagon",
  24: "Tetracosagon",
  25: "Pentacosagon",
  26: "Hexacosagon",
  27: "Heptacosagon",
  28: "Octacosagon",
  29: "Enneacosagon",
  30: "Triacontagon",

  31: "Hentriacontagon",
  32: "Dotriacontagon",
  33: "Tritriacontagon",
  34: "Tetratriacontagon",
  35: "Pentatriacontagon",
  36: "Hexatriacontagon",
  37: "Heptatriacontagon",
  38: "Octatriacontagon",
  39: "Enneatriacontagon",
  40: "Tetracontagon",

  41: "Hentetracontagon",
  42: "Dotetracontagon",
  43: "Tritetracontagon",
  44: "Tetratetracontagon",
  45: "Pentatetracontagon",
  46: "Hexatetracontagon",
  47: "Heptatetracontagon",
  48: "Octatetracontagon",
  49: "Enneatetracontagon",
  50: "Pentacontagon",

  51: "Henpentacontagon",
  52: "Dopentacontagon",
  53: "Tripentacontagon",
  54: "Tetrapentacontagon",
  55: "Pentapentacontagon",
  56: "Hexapentacontagon",
  57: "Heptapentacontagon",
  58: "Octapentacontagon",
  59: "Enneapentacontagon",
  60: "Hexacontagon",

  61: "Henhexacontagon",
  62: "Dohexacontagon",
  63: "Trihexacontagon",
  64: "Tetrahexacontagon",
  65: "Pentahexacontagon",
  66: "Hexahexacontagon",
  67: "Heptahexacontagon",
  68: "Octahexacontagon",
  69: "Enneahexacontagon",
  70: "Heptacontagon",

  71: "Henheptacontagon",
  72: "Doheptacontagon",
  73: "Triheptacontagon",
  74: "Tetraheptacontagon",
  75: "Pentaheptacontagon",
  76: "Hexaheptacontagon",
  77: "Heptaheptacontagon",
  78: "Octaheptacontagon",
  79: "Enneaheptacontagon",
  80: "Octacontagon",

  81: "Henoctacontagon",
  82: "Dooctacontagon",
  83: "Trioctacontagon",
  84: "Tetraoctacontagon",
  85: "Pentaoctacontagon",
  86: "Hexaoctacontagon",
  87: "Heptaoctacontagon",
  88: "Octaoctacontagon",
  89: "Enneaoctacontagon",
  90: "Enneacontagon",

  91: "Henenneacontagon",
  92: "Doenneacontagon",
  93: "Trienneacontagon",
  94: "Tetraenneacontagon",
  95: "Pentaenneacontagon",
  96: "Hexaenneacontagon",
  97: "Heptaenneacontagon",
  98: "Octaenneacontagon",
  99: "Enneaenneacontagon",
  100: "Hectogon"
};

function getShapeName(n) {
  return shapeNames[n] || `${n}-gon`;
}

shapeNameText.textContent = getShapeName(sides);

/* ===== POLYGON ===== */
function getPolygon(sides) {
  const pts = [];
  const step = (Math.PI * 2) / sides;

  for (let i = 0; i < sides; i++) {
    const a = i * step - Math.PI / 2;
    pts.push({
      x: center.x + radius * Math.cos(a),
      y: center.y + radius * Math.sin(a)
    });
  }
  return pts;
}

function drawPolygon(points) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.stroke();
}

/* ===== COLLISION ===== */
function reflect(ball, nx, ny) {
  const dot = ball.vx * nx + ball.vy * ny;
  ball.vx -= 2 * dot * nx;
  ball.vy -= 2 * dot * ny;
}

function checkLine(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy);

  const nx = -dy / len;
  const ny = dx / len;

  const dist =
    (ball.x - p1.x) * nx +
    (ball.y - p1.y) * ny;

  if (Math.abs(dist) < ball.r) {
    reflect(ball, nx, ny);
    ball.x += nx * 2;
    ball.y += ny * 2;

    sides++;
    sidesText.textContent = sides;
    shapeNameText.textContent = getShapeName(sides);
    return true;
  }
  return false;
}

/* ===== GAME LOOP ===== */
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const poly = getPolygon(sides);
  drawPolygon(poly);

  ball.x += ball.vx;
  ball.y += ball.vy;

  for (let i = 0; i < poly.length; i++) {
    if (checkLine(poly[i], poly[(i + 1) % poly.length])) break;
  }

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "#4cc9f0";
  ctx.fill();

  requestAnimationFrame(update);
}

update();
