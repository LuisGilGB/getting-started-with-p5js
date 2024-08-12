const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

const SQUARE_SIZE = 50;

const STROKE_WEIGHT = 2;

let accumulatedMoveX = 0;
let accumulatedMoveY = 0;
let deltaMoveX = 1;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function getBlueSquareProperties() {
  return {
    x: accumulatedMoveX,
    y: CANVAS_HEIGHT/2 - SQUARE_SIZE/2 + accumulatedMoveY,
    size: SQUARE_SIZE,
  }
}

function draw() {
  background('white');

  stroke('black');
  strokeWeight(STROKE_WEIGHT);

  line(CANVAS_WIDTH/2, SQUARE_SIZE/2, SQUARE_SIZE/2 + accumulatedMoveX, CANVAS_HEIGHT/2 + accumulatedMoveY);

  fill('red');
  rect(CANVAS_WIDTH/2 - SQUARE_SIZE/2, 0, SQUARE_SIZE);

  const blueSquareProperties = getBlueSquareProperties();
  fill('blue');
  rect(blueSquareProperties.x, blueSquareProperties.y, blueSquareProperties.size);

  if (accumulatedMoveX >= CANVAS_WIDTH - SQUARE_SIZE) {
    deltaMoveX = -1;
  } else if (accumulatedMoveX <= 0) {
    deltaMoveX = 1;
  }
  accumulatedMoveX += deltaMoveX;

  if (keyIsPressed === true) {
      if (key === 'ArrowUp') {
      accumulatedMoveY -= 1;
    } else if (key === 'ArrowDown') {
      accumulatedMoveY += 1;
    }
  }
  accumulatedMoveY = Math.max(-CANVAS_HEIGHT/2 + SQUARE_SIZE/2, accumulatedMoveY);
  accumulatedMoveY = Math.min(CANVAS_HEIGHT/2 - SQUARE_SIZE/2, accumulatedMoveY);
  
  stroke('transparent');
  strokeWeight(0);
  fill('black');
  text('Press the space bar to reverse the blue rectangle movement', 0, 12);
  text('Press the up arrow to move the blue rectangle up', 0, 24);
  text('Press the down arrow to move the blue rectangle down', 0, 36);
  text('Click the blue rectangle to pause animation. Click again to resume.', 0, 48);
  text('Click the screen anywhere to move the blue rectangle to that haight.', 0, 60);
}

function keyReleased() {
  if (key === ' ') {
    deltaMoveX *= -1;
  }
}

function mouseClicked(event) {
  const blueSq = getBlueSquareProperties();
  if (mouseX >= blueSq.x && mouseX <= blueSq.x + blueSq.size && mouseY >= blueSq.y && mouseY <= blueSq.y + blueSq.size) {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  } else {
    accumulatedMoveY = mouseY - CANVAS_HEIGHT / 2;
  }
}
