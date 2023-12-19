var fs = require('fs');
var text = fs.readFileSync('./inputTest.txt', 'utf-8');

var digPlan = text.split('\n');
const digPlanParams = digPlan.map((instruction) => {
  const instructionArray = instruction.split(' ');
  return {
    direction: instructionArray[0],
    length: parseInt(instructionArray[1]),
    color: instructionArray[2].replace(/\(|\)/g, ''),
  };
});

console.log(digPlanParams);
let grid = [['#']];
const startPosition = [0, 0];
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

console.log(rowMax, columnMax);

const gridRow = new Array(columnMax + 1).fill('.');
grid = new Array(rowMax + 1).fill(gridRow);

positions.forEach((position, index) => {
  const rowIndex = position[0];
  const columnIndex = position[1];
  const previousRowIndex = positions[index - 1]?.[0] ?? startPosition[0];
  const previousColumnIndex = positions[index - 1]?.[1] ?? startPosition[1];
  console.log(previousColumnIndex, previousRowIndex);

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

getTopAndBottom = (rowIndex, elIndex) => {
  const elementsAtIndex = grid.map((row) => row[elIndex]);
  const top = elementsAtIndex.slice(0, rowIndex).indexOf('#') >= 0;
  const bottom = elementsAtIndex.indexOf('#', rowIndex) >= 0;

  return { top, bottom };
};
let count = 0;
grid.forEach((row, rowIndex) => {
  row.forEach((el, elIndex) => {
    if (el === '#') {
      count++;
    } else {
      const left = row.slice(0, elIndex).indexOf('#') >= 0;
      const right = row.indexOf('#', elIndex) >= 0;
      const { top, bottom } = getTopAndBottom(rowIndex, elIndex);
      if (left && right && top && bottom) count++;
    }
  });
});
console.log(count);
