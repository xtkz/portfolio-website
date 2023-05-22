function calculateWiggleVector(seed, millis) {
  const WIGGLE_SPEED = 6 * 0.001;
  const WIGGLE_RADIUS = 50;
  return [
    (0.5 - noise((seed * 200) + millis/1000*FPS * WIGGLE_SPEED)) * WIGGLE_RADIUS,
    (0.5 - noise((seed + 700) + millis/1000*FPS * WIGGLE_SPEED)) * WIGGLE_RADIUS,
  ];
}

const CURR_RND = Math.random();
const GRID_COUNT = 8;
const CANVAS_SIZE = [800, 800];
const FPS = 60;

let cellSize = [120 ,120]
let windowSizes = [];
let cellCount = [];
let pointSize = 8;


function setup() {
  createCanvas(windowWidth, windowHeight + 100);
  frameRate(FPS)
  windowSizes = [windowWidth, windowHeight];
  windowResized();
}

function draw() {
  
  // background('rgba(255, 255, 255, 0.2)');
  let wiggleArray = [];

  for (let i = 0; i < cellCount[0]+4; i++) {
    wiggleArray[i] = [];
    for (let j = 0; j < cellCount[1]+5; j++) {
      let basePoint = [0,0];
      if (j%2 === 1) {
        basePoint[0] = (i-1) * cellSize[0]
      } else {
        basePoint[0] = (i-1.5) * cellSize[0]
      }
      basePoint[1] = (j-1) * cellSize[1] * Math.sqrt(3)/2;
      
      let nodeWiggle = calculateWiggleVector(CURR_RND + i * j, millis());
      let wigglePoint = [basePoint[0] + nodeWiggle[0], basePoint[1] + nodeWiggle[1]];
      strokeWeight(pointSize);
      point(...wigglePoint);
      strokeWeight(pointSize/8);
      wiggleArray[i][j] = wigglePoint;
      fill(`hsla(${(360 + frameCount + (cellCount[0]-i)*(cellCount[1]-j) * 2)%360}, 70%, 70%, 0.5)`);
      if (i > 0 && j > 0) {
        if (j%2===0) {
          
          triangle(
          ...wigglePoint,
          ...wiggleArray[i-1][j-1],
          ...wiggleArray[i][j-1],
          );

          triangle(
          ...wigglePoint,
          ...wiggleArray[i-1][j-1],
          ...wiggleArray[i-1][j],
          );
        } else {

          triangle(
          ...wigglePoint,
          ...wiggleArray[i][j-1],
          ...wiggleArray[i-1][j],
          );

          triangle(
          ...wiggleArray[i-1][j],
          ...wiggleArray[i-1][j-1],
          ...wiggleArray[i][j-1],
          );
        }
      }
    }  
  }
}

function windowResized() {
  console.log("TEST Resize");
  resizeCanvas(windowWidth, windowHeight + 100);
  windowSizes = [windowWidth, windowHeight];
  if (/Android|iPhone/i.test(navigator.userAgent)) {
    console.log(navigator.userAgent);
    console.log(/Android|iPhone/i.test(navigator.userAgent));
    cellSize = [60 ,60];
    pointSize = 4;
  } else {
    cellSize = [120 ,120];
    pointSize = 8;
  }
  cellCount = [
    Math.floor(windowSizes[0]/cellSize[0]),
    Math.floor(windowSizes[1]/cellSize[1]),
  ];
}
