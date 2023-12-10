var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

const lines = text.split('\n');
const grid = lines.map((line) => line.trim().split(''));
var result = 0;
var steps = 1;
const startingPos = [69, 88];
// const startingPos = [1, 1];
// const startingPos = [0, 4];

// console.log(grid, startingPos);
let currentPos = startingPos;
let previousPos = startingPos;
let loop = [];

const above = /[|F7S]/;
const below = /[|LJS]/;
const left = /[-LFS]/;
const right = /[-7JS]/;

function getConnectedPipes(isFirst = false) {
  pipeAbove =
    currentPos[0] - 1 < 0 ? undefined : grid[currentPos[0] - 1][currentPos[1]];
  pipeBelow =
    currentPos[0] + 1 >= grid.length
      ? undefined
      : grid[currentPos[0] + 1][currentPos[1]];
  pipeLeft = grid[currentPos[0]][currentPos[1] - 1];
  pipeRight = grid[currentPos[0]][currentPos[1] + 1];
  tmpPosition = currentPos;
  currentPipe = grid[currentPos[0]][currentPos[1]];

  if (above.test(pipeAbove) && (isFirst || below.test(currentPipe))) {
    tmpPosition = [currentPos[0] - 1, currentPos[1]];
    if (
      tmpPosition[0] !== previousPos[0] ||
      tmpPosition[1] !== previousPos[1]
    ) {
      currentPos = tmpPosition;
      return;
    }
  }

  if (below.test(pipeBelow) && (isFirst || above.test(currentPipe))) {
    tmpPosition = [currentPos[0] + 1, currentPos[1]];

    if (
      tmpPosition[0] !== previousPos[0] ||
      tmpPosition[1] !== previousPos[1]
    ) {
      currentPos = tmpPosition;
      return;
    }
  }
  if (left.test(pipeLeft) && (isFirst || right.test(currentPipe))) {
    tmpPosition = [currentPos[0], currentPos[1] - 1];

    if (
      tmpPosition[0] !== previousPos[0] ||
      tmpPosition[1] !== previousPos[1]
    ) {
      currentPos = tmpPosition;
      return;
    }
  }
  if (right.test(pipeRight) && (isFirst || left.test(currentPipe))) {
    tmpPosition = [currentPos[0], currentPos[1] + 1];

    if (
      tmpPosition[0] !== previousPos[0] ||
      tmpPosition[1] !== previousPos[1]
    ) {
      currentPos = tmpPosition;
      return;
    }
  }
}

getConnectedPipes(true);
while (
  JSON.stringify(currentPos) !== JSON.stringify(startingPos) &&
  steps < 100000
) {
  loop.push([...currentPos, grid[currentPos[0]][currentPos[1]]]);
  //   console.log({ previousPos, currentPos });
  temp = currentPos;
  getConnectedPipes();
  previousPos = temp;
  steps++;
}
// console.log(loop);
console.log(steps);

var elementsInsideLoop = 0;

for (let y = 0; y < grid.length; y++) {
  const row = grid[y];

  for (let x = 0; x < row.length; x++) {
    const element = row[x];
    // console.log(element);
    // console.log(y, x);

    if (loop.some((ele) => ele[0] === y && ele[1] === x) || element === 'S') {
      // console.log(element, 'is part of the loop');
    } else {
      const north = loop
        .filter((ele) => ele[0] < y && ele[1] === x)
        .filter(
          (pipe) => pipe[2] === '-' || pipe[2] === 'L' || pipe[2] === 'F'
        ).length;
      const south = loop
        .filter((ele) => ele[0] > y && ele[1] === x)
        .filter(
          (pipe) => pipe[2] === '-' || pipe[2] === 'L' || pipe[2] === 'F'
        ).length;
      const west = loop
        .filter((ele) => ele[0] === y && ele[1] < x)
        .filter(
          (pipe) => pipe[2] === '|' || pipe[2] === '7' || pipe[2] === 'F'
        ).length;
      const east = loop
        .filter((ele) => ele[0] === y && ele[1] > x)
        .filter(
          (pipe) => pipe[2] === '|' || pipe[2] === '7' || pipe[2] === 'F'
        ).length;
      //   console.log({ west, east, north, south });
      if (
        west % 2 === 0 ||
        east % 2 === 0 ||
        north % 2 === 0 ||
        south % 2 === 0
      ) {
        // console.log(element, 'is outside the loop');
      } else {
        // console.log(element, 'is inside the loop');
        elementsInsideLoop++;
      }
    }
  }
}

console.log(elementsInsideLoop);
