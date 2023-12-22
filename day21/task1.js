var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');
const FINAL_STEP_COUNT = 64
var grid = text.split('\n').map((row) => [...row]);

const startPos = [(grid.length - 1) / 2, (grid.length - 1) / 2];

const reachedDestinations = new Set();
const endPositions = new Set();

reachedDestinations.add(startPos);
let buffer = true;

takeStep(startPos, 1);

// console.log(reachedDestinations);
// setTimeout(() => {
//   console.log(endPositions);
//   grid.forEach((row, i) => console.log('\x1b[36m%s\x1b[0m', row.join(''), i));
// }, 1000);

checkBuffer();

function checkBuffer() {
  if (buffer) {
    buffer = false;
    setTimeout(() => {
      checkBuffer();
    }, 100);
  } else {
    console.log(endPositions);
    grid.forEach((row, i) => console.log('\x1b[36m%s\x1b[0m', row.join(''), i));
    console.log('final tally:', endPositions.size + 1);
  }
}

// reachedDestinations.forEach((destination) => {
//   console.log(destination);
//   grid[destination[1]][destination[0]] = 'O';
// });

// endPositions.forEach((destination) => {
//   console.log(destination);
//   grid[destination[1]][destination[0]] = '*';
// });

function takeStep(position, stepCount) {
  if (stepCount > FINAL_STEP_COUNT) {
    return;
  }
  buffer = true;
  const addFinal = stepCount % 2 === 0;
  const x = position[0];
  const y = position[1];

  const north = grid[y - 1]?.[x];
  const south = grid[y + 1]?.[x];
  const west = grid[y]?.[x - 1];
  const east = grid[y]?.[x + 1];
  // console.log({ north, south, west, east });

  if (north === '.') {
    reachedDestinations.add([x, y - 1]);
    grid[y - 1][x] = addFinal ? '*' : 'O';
    setTimeout(() => {
      takeStep([x, y - 1], stepCount + 1);
    }, 0);
    if (addFinal) endPositions.add([x, y - 1]);
  }
  if (south === '.') {
    reachedDestinations.add([x, y + 1]);
    grid[y + 1][x] = addFinal ? '*' : 'O';
    setTimeout(() => {
      takeStep([x, y + 1], stepCount + 1);
    }, 0);
    if (addFinal) endPositions.add([x, y + 1]);
  }
  if (west === '.') {
    reachedDestinations.add([x - 1, y]);
    grid[y][x - 1] = addFinal ? '*' : 'O';
    setTimeout(() => {
      takeStep([x - 1, y], stepCount + 1);
    }, 0);
    if (addFinal) endPositions.add([x - 1, y]);
  }
  if (east === '.') {
    reachedDestinations.add([x + 1, y]);
    grid[y][x + 1] = addFinal ? '*' : 'O';
    setTimeout(() => {
      takeStep([x + 1, y], stepCount + 1);
    }, 0);
    if (addFinal) endPositions.add([x + 1, y]);
  }
}
