var fs = require('fs');
var text = fs.readFileSync('./inputTest.txt', 'utf-8');

var grid = text.split('\r\n');
const rowLength = grid[0].length;
const columnLength = grid.length;
// console.log(rowLength, columnLength);
grid = grid.map((row) => [...row].map((ele) => parseInt(ele)));
var result = 0;

const initialNode = { row: 0, column: 0, distance: 0 };

let unvisitedNodes = [];

grid.forEach((row, i) => {
  row.forEach((point, j) => {
    if (i === 0 && j === 0) return;
    const directions = ['north', 'east', 'south', 'west'];
    directions.forEach((direction) => {
      const node = {
        row: i,
        column: j,
        distance: Number.MAX_VALUE,
        strength: point,
        direction: direction,
      };
      unvisitedNodes.push(node);
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
  (node) => node.column === rowLength - 1 && node.row === columnLength - 1
);
console.log({ finalNode });

// const testNode = visitedNodes.filter(
//   (node) => node.column === 6 && node.row === 0
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
    const newLength =
      startingNode.direction === newDirection ? startingNode.length + 1 : 1;

    const updatedNode = {
      ...neighbor,
      distance: startingNode.distance + neighbor.strength,
      direction: newDirection,
      length: newLength,
    };

    if (
      neighbor.distance >= updatedNode.distance &&
      updatedNode.length <= neighbor.distance &&
      updatedNode.length <= 3 &&
      neighbor.direction === updatedNode.direction
    ) {
      unvisitedNodes.push(updatedNode);
    } else unvisitedNodes.push(neighbor);

    if (
      neighbor.distance < updatedNode.distance &&
      updatedNode.length < neighbor.length &&
      neighbor.direction === updatedNode.direction
    ) {
      unvisitedNodes.push(updatedNode);
      unvisitedNodes.push(neighbor);
    }

    if (
      neighbor.distance > updatedNode.distance &&
      updatedNode.length > neighbor.length &&
      updatedNode.length <= 3 &&
      neighbor.direction === updatedNode.direction
    ) {
      unvisitedNodes.push(updatedNode);
      unvisitedNodes.push(neighbor);
    }
  });
}
