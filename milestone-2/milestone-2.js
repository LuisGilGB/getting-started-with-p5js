const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 250;

const SQUARE_SIZE = 50;

const STROKE_WEIGHT = 2;

let accumulatedMove = 0;
let deltaMove = 1;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  background('white');
  stroke('black');
  strokeWeight(STROKE_WEIGHT);
  
  line(CANVAS_WIDTH/2, SQUARE_SIZE/2, SQUARE_SIZE/2 + accumulatedMove, CANVAS_HEIGHT/2);

  fill('red');
  rect(CANVAS_WIDTH/2 - SQUARE_SIZE/2, 0, SQUARE_SIZE);

  fill('blue');
  rect(accumulatedMove, CANVAS_HEIGHT/2 - SQUARE_SIZE/2, SQUARE_SIZE);

  if (accumulatedMove >= CANVAS_WIDTH - SQUARE_SIZE) {
    deltaMove = -1;
  } else if (accumulatedMove <= 0) {
    deltaMove = 1;
  }
  accumulatedMove += deltaMove;
}
