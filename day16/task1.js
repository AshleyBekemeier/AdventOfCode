var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var grid = text.split('\r\n');
const rowLength = grid[0].length;
const columnLength = grid.length;
console.log(rowLength, columnLength);
grid = grid.map((row) => [...row]);
// console.log(grid);

var energizedTiles = [];

var result = 0;

var pastSteps = [];

function shootLight(row, column, direction) {
  const key = JSON.stringify({ row, column, direction });
  // console.log({ key });
  if (pastSteps.includes(key)) {
    return;
  }
  pastSteps.push(key);

  if (row < 0 || column < 0) return;
  if (row >= rowLength || column >= columnLength) return;
  if (!energizedTiles.some((tile) => tile[0] === row && tile[1] === column)) {
    energizedTiles.push([row, column]);
  }
  const element = grid[column][row];

  // console.log('going', direction);
  // console.log({ x: row, y: column });
  // console.log(element);

  if (direction === 'right') {
    if (element === '\\' || element === '|') {
      shootLight(row, column + 1, 'down');
    }
    if (element === '/' || element === '|') {
      shootLight(row, column - 1, 'up');
    }
    if (element === '.' || element === '-') {
      shootLight(row + 1, column, 'right');
    }
  }
  if (direction === 'left') {
    if (element === '\\' || element === '|') {
      shootLight(row, column - 1, 'up');
    }
    if (element === '/' || element === '|') {
      shootLight(row, column + 1, 'down');
    }
    if (element === '.' || element === '-') {
      shootLight(row - 1, column, 'left');
    }
  }

  if (direction === 'down') {
    if (element === '\\' || element === '-') {
      shootLight(row + 1, column, 'right');
    }
    if (element === '/' || element === '-') {
      shootLight(row - 1, column, 'left');
    }
    if (element === '.' || element === '|') {
      shootLight(row, column + 1, 'down');
    }
  }
  if (direction === 'up') {
    if (element === '\\' || element === '-') {
      shootLight(row - 1, column, 'left');
    }
    if (element === '/' || element === '-') {
      shootLight(row + 1, column, 'right');
    }
    if (element === '.' || element === '|') {
      shootLight(row, column - 1, 'up');
    }
  }
}

shootLight(0, 0, 'right');

console.log({ energizedTiles });
console.log('total number of energized tiles: ', energizedTiles.length);
