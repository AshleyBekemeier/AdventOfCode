var fs = require('fs');
var text = fs.readFileSync('./inputTest2.txt', 'utf-8').split('\n');
const FINAL_STEP_COUNT = 65 + 131 * 0;
var initial = text.map((row) => [...row, ...row, ...row, ...row, ...row, ...row, ...row]);
var initial1 = text.map((row) => [...row, ...row, ...row, ...row, ...row, ...row, ...row]);
var initial2 = text.map((row) => [...row, ...row, ...row, ...row, ...row, ...row, ...row]);
var initial3 = text.map((row) => [...row, ...row, ...row, ...row, ...row, ...row, ...row]);
var initial4 = text.map((row) => [...row, ...row, ...row, ...row, ...row, ...row, ...row]);
var initial5 = text.map((row) => [...row, ...row, ...row, ...row, ...row, ...row, ...row]);
var initial6 = text.map((row) => [...row, ...row, ...row, ...row, ...row, ...row, ...row]);
initialFinal = initial.concat(initial1).concat(initial2).concat(initial3).concat(initial4).concat(initial5).concat(initial6)

let grid = [...initialFinal]

console.log(grid.length);

// grid.forEach((row, i) => console.log('\x1b[36m%s\x1b[0m', row.join(''), i));

const startPos = [(grid.length - 1) / 2, (grid.length - 1) / 2];
// const startPos = [(grid.length - 1) / 2, 0];
// const startPos = [0, (grid.length - 1) / 2];
// const startPos = [0, 0];

const reachedDestinations = new Set();
const endPositions = new Set();

reachedDestinations.add(startPos);
let buffer = true;

takeStep(startPos, 0);

let num_even = 1;
let num_odd = 0;
for (let i = 0; i < 202300; i++) {
  parity = i % 2;
  ring = i * 4;
  if (parity) {
    num_odd += ring;
  } else {
    num_even += ring;
  }
}

checkBuffer();

function checkBuffer() {
  if (buffer) {
    buffer = false;
    setTimeout(() => {
      checkBuffer();
    }, 1000);
  } else {
    console.log(endPositions);
    let testRow = '';
    let testRow2 = '';
    for (let i = 0; i < grid.length; i++) {
      testRow = testRow + (i % 10);
      testRow2 = testRow2 + (parseInt(i / 10) % 10);
    }
    console.log(testRow2);
    console.log(testRow);
    grid.forEach((row, i) => console.log('\x1b[36m%s\x1b[0m', row.join(''), i));
    console.log('final tally:', endPositions.size);
    console.log({ num_even, num_odd });
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
