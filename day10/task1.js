var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

const lines = text.split('\n');
const grid = lines.map((line) => line.split(''));
var result = 0;
var steps = 1;
const startingPos = [69, 88];

// console.log(grid, startingPos);
let currentPos = startingPos;
let previousPos = startingPos;

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
  // console.log(currentPipe);
  // console.log({
  //   pipeAbove,
  //   pipeBelow,
  //   pipeLeft,
  //   pipeRight,
  //   previousPos,
  //   currentPipe,
  // });

  if (above.test(pipeAbove) && (isFirst || below.test(currentPipe))) {
    tmpPosition = [currentPos[0] - 1, currentPos[1]];
    // console.log(
    //   'above: ',
    //   { currentPos },
    //   currentPos[0] !== previousPos[0] && currentPos[1] !== previousPos[1]
    // );
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
    // console.log('below: ', { tmpPosition, previousPos });

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
    // console.log('left: ', { currentPos });

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
    // console.log('right: ', { currentPos });

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
  console.log({ previousPos, currentPos });
  temp = currentPos;
  getConnectedPipes();
  previousPos = temp;
  steps++;
}
console.log(steps);
