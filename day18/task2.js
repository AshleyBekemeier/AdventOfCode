var fs = require('fs');
var text = fs.readFileSync('./inputTest.txt', 'utf-8');

const directionToDig = { 0: 'R', 1: 'D', 2: 'L', 3: 'U' };
var digPlan = text.split('\n');
const digPlanParams = digPlan.map((instruction) => {
  const instructionArray = instruction.split(' ');
  const color = instructionArray[2].replace(/\(|\)/g, '');
  const direction = directionToDig[color.at(-1)];
  const hexCode = color.slice(1, 6)
  let length = parseInt(hexCode, 16);
  return {
    direction: direction,
    length: length,
  };
});

console.log(digPlanParams);
let grid = [['#']];
const startPosition = [0, 0];
// const startPosition = [239, 124];
let currentPosition = startPosition;

const positions = digPlanParams.map((param) => {
  if (param.direction === 'U') {
    currentPosition = [currentPosition[0] - param.length, currentPosition[1]];
  }
  if (param.direction === 'D') {
    currentPosition = [currentPosition[0] + param.length, currentPosition[1]];
  }
  if (param.direction === 'L') {
    currentPosition = [currentPosition[0], currentPosition[1] - param.length];
  }
  if (param.direction === 'R') {
    currentPosition = [currentPosition[0], currentPosition[1] + param.length];
  }
  return currentPosition;
});

console.log(positions);

const rowMaxArr = positions
  .map((position) => position[0])
  .sort((a, b) => b - a);
const columnMaxArr = positions
  .map((position) => position[1])
  .sort((a, b) => b - a);
const rowMax = Math.abs(rowMaxArr[0] - rowMaxArr[rowMaxArr.length - 1]);
console.log(rowMaxArr[0], rowMaxArr[rowMaxArr.length - 1]);
const columnMax = Math.abs(
  columnMaxArr[0] - columnMaxArr[columnMaxArr.length - 1]
);
console.log(columnMaxArr[0], columnMaxArr[columnMaxArr.length - 1]);

console.log({ rowMax, columnMax });

const gridRow = new Array(columnMax + 1).fill('.');
grid = new Array(rowMax + 1).fill(gridRow);

positions.forEach((position, index) => {
  const rowIndex = position[0];
  const columnIndex = position[1];
  const previousRowIndex = positions[index - 1]?.[0] ?? startPosition[0];
  const previousColumnIndex = positions[index - 1]?.[1] ?? startPosition[1];
  // console.log(previousColumnIndex, previousRowIndex);

  if (rowIndex === previousRowIndex) {
    const a = [...grid[rowIndex]];
    if (previousColumnIndex < columnIndex) {
      for (let index = previousColumnIndex + 1; index <= columnIndex; index++) {
        a[index] = '#';
      }
    } else {
      for (let index = previousColumnIndex; index >= columnIndex; index--) {
        a[index] = '#';
      }
    }
    grid[rowIndex] = [...a];
  }
  if (columnIndex === previousColumnIndex) {
    if (previousRowIndex < rowIndex) {
      for (let index = previousRowIndex + 1; index <= rowIndex; index++) {
        const el = [...grid[index]];
        el[columnIndex] = '#';
        grid[index] = [...el];
      }
    } else {
      for (
        let index = previousRowIndex;
        index >= rowIndex && index >= 0;
        index--
      ) {
        const el = [...grid[index]];
        el[columnIndex] = '#';
        grid[index] = [...el];
      }
    }
  }
});

// console.log({grid})

// grid = [
//   ['.', '.', '#', '.', '.', '#', '.', '.'],
//   ['.', '.', '#', '#', '#', '#', '.', '.'],
// ];

getTopAndBottom = (rowIndex, elIndex) => {
  const top = elIndex > -1 ? grid[rowIndex - 1]?.[elIndex] === '#' : false;
  const bottom = grid[rowIndex + 1]?.[elIndex] === '#';
  // console.log({ top, bottom });

  return { top, bottom };
};
let count = 0;
grid.forEach((row, rowIndex) => {
  let isInside = false;
  let lineLength = 0;

  row.forEach((el, elIndex) => {
    if (el === '#') {
      count++;
      // if (row[elIndex - 1] !== '#' && row[elIndex + 1] !== '#') {
      //   isInside = !isInside;
      // }
      lineLength++;
    } else {
      // console.log('---------');
      // console.log({ count, isInside, rowIndex, elIndex, lineLength });
      if (lineLength === 1) {
        isInside = !isInside;
      } else {
        if (lineLength > 1) {
          const firstHashtag = elIndex - lineLength;
          const lastHashtag = elIndex - 1;
          // console.log({ firstHashtag, lastHashtag });
          const firstTopOrBottom = getTopAndBottom(rowIndex, firstHashtag);
          const lastTopOrBottom = getTopAndBottom(rowIndex, lastHashtag);

          if (
            (firstTopOrBottom.top && lastTopOrBottom.top) ||
            (firstTopOrBottom.bottom && lastTopOrBottom.bottom)
          ) {
            // console.log('DOSENT COUNT');
            //doesn't count
          } else {
            isInside = !isInside;
          }
        }
      }

      lineLength = 0;
      if (isInside) {
        grid[rowIndex][elIndex] = '*';
        count++;
      }
      // console.log({ count, isInside, rowIndex, elIndex, lineLength });
    }
  });
});
// grid.forEach((row) => console.log('\x1b[36m%s\x1b[0m', row.join('')));
// console.log(count);
// console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
// ######
// ###..#
// ######
// ##..##
// #..##.

// .....
// .#####.
// .#...#.
// .###..#.
// ...#..#.
// ...####.
