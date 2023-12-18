var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var grid = text.split('\n');
const rowLength = grid[0].length;
const columnLength = grid.length;
grid = grid.map((row) => [...row].map((ele) => parseInt(ele)));
var result = 0;

const initialNode = {
  row: 0,
  column: 0,
  distance: 0,
  direction: 'east',
  length: 0,
};

let unvisitedNodes = [];

grid.forEach((row, i) => {
  row.forEach((point, j) => {
    if (i === 0 && j === 0) return;
    const directions = ['north', 'east', 'south', 'west'];
    directions.forEach((direction) => {
      for (let lengthIndex = 1; lengthIndex <= 10; lengthIndex++) {
        const node = {
          row: i,
          column: j,
          distance: Number.MAX_VALUE,
          strength: point,
          direction: direction,
          length: lengthIndex,
        };
        unvisitedNodes.push(node);
      }
    });
  });
});

let visitedNodes = [];

updateNeighbors(initialNode);
while (unvisitedNodes.length) {
  if (unvisitedNodes.length % 100 === 0) {
    console.log(unvisitedNodes.length);
  }
  const sorted = unvisitedNodes.sort((a, b) => a.distance - b.distance);
  const nextNode = sorted.at(0);
  unvisitedNodes = unvisitedNodes.slice(1);
  updateNeighbors(nextNode);
}

// console.log({ unvisitedNodes });
// console.log({ visitedNodes });
const finalNode = visitedNodes.filter(
  (node) =>
    node.column === rowLength - 1 &&
    node.row === columnLength - 1 &&
    node.distance < 10000000 &&
    node.length >= 4
);
console.log({ finalNode });

// const testNode = visitedNodes.filter(
//   (node) => node.column === 1 && node.row === 0
// );
// console.log({ testNode });

function updateNeighbors(startingNode) {
  // console.log({ startingNode });
  visitedNodes.push(startingNode);

  const neighbors = unvisitedNodes.filter((node) => {
    const blocks =
      Math.abs(node.column - startingNode.column) +
      Math.abs(node.row - startingNode.row);
    return blocks === 1;
  });

  unvisitedNodes = unvisitedNodes.filter((node) => {
    const blocks =
      Math.abs(node.column - startingNode.column) +
      Math.abs(node.row - startingNode.row);
    return blocks !== 1;
  });

  unvisitedNodes = unvisitedNodes.filter(
    (node) =>
      !(
        node.row === startingNode.row &&
        node.column === startingNode.column &&
        node.direction === startingNode.direction &&
        node.length === startingNode.length
      )
  );

  neighbors.forEach((neighbor) => {
    let newDirection;

    if (neighbor.row === startingNode.row) {
      newDirection = neighbor.column > startingNode.column ? 'east' : 'west';
    } else {
      newDirection = neighbor.row < startingNode.row ? 'north' : 'south';
    }
    if (
      (newDirection === 'north' && startingNode.direction === 'south') ||
      (newDirection === 'south' && startingNode.direction === 'north') ||
      (newDirection === 'east' && startingNode.direction === 'west') ||
      (newDirection === 'west' && startingNode.direction === 'east')
    ) {
      unvisitedNodes.push(neighbor);
      return;
    }
    if (newDirection !== neighbor.direction) {
      unvisitedNodes.push(neighbor);
      return;
    }

    const newLength =
      startingNode.direction === newDirection ? startingNode.length + 1 : 1;
    if (newLength !== neighbor.length) {
      unvisitedNodes.push(neighbor);
      return;
    }

    if (startingNode.direction !== newDirection && startingNode.length < 4) {
      unvisitedNodes.push(neighbor);
      return;
    }

    const updatedNode = {
      ...neighbor,
      distance: startingNode.distance + neighbor.strength,
      direction: newDirection,
      length: newLength,
    };

    if (newLength <= 10 && updatedNode.distance < neighbor.distance) {
      unvisitedNodes.push(updatedNode);
    } else unvisitedNodes.push(neighbor);
  });
}
