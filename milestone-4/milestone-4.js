const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

const SQUARE_SIZE = 50;

const STROKE_WEIGHT = 2;

const MAX_PENDULUM_AMPLITUDE = 45;

let pendulumModeOn = false;

let accumulatedMoveX = 0;
let accumulatedMoveY = 0;
let deltaMoveX = 1;

let currentPendulumAmplitude = 0;
let deltaPendulumDegree = 1;

function getBlueSquareProperties() {
  return {
    x: accumulatedMoveX,
    y: CANVAS_HEIGHT/2 - SQUARE_SIZE/2 + accumulatedMoveY,
    size: SQUARE_SIZE,
  }
}

function getPendulumVector (centerX, centerY, radius, amplitude) {
  center = createVector(centerX, centerY);
  end = center.add(radius * sin(radians(amplitude)), radius * cos(radians(amplitude)));
  return end;
}

const leftRightConfig = {
  draw: () => {
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
  },
  keyReleased: () => {
    if (key === ' ') {
      deltaMoveX *= -1;
    }
  },
  mouseClicked: event => {
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
}

const pendulumConfig = {
  draw: () => {
    background('white');

    stroke('black');
    strokeWeight(STROKE_WEIGHT);

    redCenterX = CANVAS_WIDTH/2;
    redCenterY = SQUARE_SIZE/2;
    blueCenter = getPendulumVector(redCenterX, redCenterY, 200, currentPendulumAmplitude);
    
    line(CANVAS_WIDTH/2, SQUARE_SIZE/2, blueCenter.x, blueCenter.y);

    fill('red');
    rect(CANVAS_WIDTH/2 - SQUARE_SIZE/2, 0, SQUARE_SIZE);
    
    fill('blue');
    rect(blueCenter.x - SQUARE_SIZE/2, blueCenter.y - SQUARE_SIZE/2, SQUARE_SIZE);
    
    stroke('transparent');
    strokeWeight(0);
    fill('black');
    text(`x: ${blueCenter.x}`, blueCenter.x - SQUARE_SIZE/2, blueCenter.y - SQUARE_SIZE/2 + SQUARE_SIZE + 12);
    text(`y: ${blueCenter.y}`, blueCenter.x - SQUARE_SIZE/2, blueCenter.y - SQUARE_SIZE/2 + SQUARE_SIZE + 24);
    
    if (currentPendulumAmplitude > MAX_PENDULUM_AMPLITUDE) {
      deltaPendulumDegree = -1;
    } else if (currentPendulumAmplitude < -MAX_PENDULUM_AMPLITUDE) {
      deltaPendulumDegree = 1;
    }
    currentPendulumAmplitude += deltaPendulumDegree;
    
  },
  keyReleased: () => {},
  mouseClicked: () => {},
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  const leftRightBtn = createButton('Left - Right');
  leftRightBtn.position(CANVAS_WIDTH - 200, 10);
  leftRightBtn.mousePressed(() => {
    pendulumModeOn = false;
  });
  const pendulumBtn = createButton('Pendulum');
  pendulumBtn.position(CANVAS_WIDTH - 100, 10);
  pendulumBtn.mousePressed(() => {
    pendulumModeOn = true;
  });
}

function draw() {
  if (pendulumModeOn) {
    pendulumConfig.draw();
  } else {
    leftRightConfig.draw();
  }
}

function keyReleased() {
  if (pendulumModeOn) {
    pendulumConfig.keyReleased();
  } else {
    leftRightConfig.keyReleased();
  }
}

function mouseClicked(event) {
  if (pendulumModeOn) {
    pendulumConfig.mouseClicked(event);
  } else {
    leftRightConfig.mouseClicked(event);
  }
}
