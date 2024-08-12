const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 250;

const SQUARE_SIZE = 50;

const STROKE_WEIGHT = 2;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  stroke('black');
  strokeWeight(STROKE_WEIGHT);
  
  line(CANVAS_WIDTH/2, SQUARE_SIZE/2, SQUARE_SIZE/2, CANVAS_HEIGHT/2);

  fill('red');
  rect(CANVAS_WIDTH/2 - SQUARE_SIZE/2, 0, SQUARE_SIZE);

  fill('blue');
  rect(0, CANVAS_HEIGHT/2 - SQUARE_SIZE/2, SQUARE_SIZE);
}
