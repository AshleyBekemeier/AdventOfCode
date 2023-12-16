var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var grid = text.split('\r\n');
const rowLength = grid[0].length;
const columnLength = grid.length;
// console.log(rowLength, columnLength);
grid = grid.map((row) => [...row]);
// console.log(grid);
var result = 0;

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

for (let i = 0; i < rowLength; i++) {
  var energizedTiles = [];
  var pastSteps = [];
  shootLight(i, 0, 'down');
  result = Math.max(energizedTiles.length, result);
}
for (let i = 0; i < rowLength; i++) {
  var energizedTiles = [];
  var pastSteps = [];
  shootLight(i, columnLength - 1, 'up');
  result = Math.max(energizedTiles.length, result);
}
for (let i = 0; i < columnLength; i++) {
  var energizedTiles = [];
  var pastSteps = [];
  shootLight(0, i, 'right');
  result = Math.max(energizedTiles.length, result);
}
for (let i = 0; i < columnLength; i++) {
  var energizedTiles = [];
  var pastSteps = [];
  shootLight(rowLength - 1, i, 'left');
  result = Math.max(energizedTiles.length, result);
}

// console.log({ energizedTiles });
console.log('highest number of energized tiles: ', result);
