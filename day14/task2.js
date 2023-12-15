var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var lines = text.split('\n');
var result = 0;

function rotateNorthSouth(direction = 'north') {
  // console.log(direction);
  let oldPositions = [];
  let newPositions = [];
  let copy = lines;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // console.log(line);
    let previousPosition = 0;
    while (true) {
      const position = line.indexOf('O', previousPosition);
      previousPosition = position + 1;
      // console.log({ position });
      if (position < 0) {
        break;
      } else {
        oldPositions.push([i, position]);
        let emptySpaces = 0;
        let startIndex;
        let endIndex;
        let iterator;
        if (direction === 'north') {
          startIndex = i - 1;
          endIndex = 0;
          iterator = -1;
        } else {
          startIndex = i + 1;
          endIndex = lines.length - 1;
          iterator = 1;
        }
        // console.log('from', startIndex, 'to', endIndex);
        for (
          let j = startIndex;
          direction === 'north' ? j >= endIndex : j <= endIndex;
          j += iterator
        ) {
          // console.log(lines, j);
          const element = lines[j].at(position);
          // console.log(i, j);
          // console.log({ element });

          if (element === 'O') {
            //do nothing
          }
          if (element === '#') {
            break;
          }
          if (element === '.') {
            emptySpaces++;
          }
        }
        // console.log({ emptySpaces });
        // console.log({ i, position });
        // const tempResult = emptySpaces + lines.length - i;
        // if (north) {}
        if (direction === 'north') {
          newPositions.push([i - emptySpaces, position]);
        } else {
          newPositions.push([i + emptySpaces, position]);
        }
        // console.log({ tempResult });

        // result += tempResult;
      }
    }
  }

  copy = lines;
  // console.log({ oldPositions, newPositions });

  oldPositions.forEach((pos) => {
    const line = copy[pos[0]];
    copy[pos[0]] = line.substring(0, pos[1]) + '.' + line.substring(pos[1] + 1);
  });

  newPositions.forEach((pos) => {
    const line = copy[pos[0]];
    copy[pos[0]] = line.substring(0, pos[1]) + 'O' + line.substring(pos[1] + 1);
  });

  lines = copy;
  // lines.forEach((line) => console.log(line));
}

function rotateWestEast(direction = 'west') {
  // console.log(direction);
  let oldPositions = [];
  let newPositions = [];
  let copy = lines;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // console.log(line);
    let previousPosition = 0;
    while (true) {
      const position = line.indexOf('O', previousPosition);
      previousPosition = position + 1;
      // console.log({ position });
      if (position < 0) {
        break;
      } else {
        oldPositions.push([i, position]);
        let emptySpaces = 0;
        let startIndex;
        let endIndex;
        let iterator;
        if (direction === 'west') {
          startIndex = position;
          endIndex = 0;
          iterator = -1;
        } else {
          startIndex = position + 1;
          endIndex = line.length;
          iterator = 1;
        }
        // console.log('from', startIndex, 'to', endIndex);
        for (
          let j = startIndex;
          direction === 'west' ? j >= endIndex : j <= endIndex;
          j += iterator
        ) {
          // console.log(lines, j);
          const element = line.at(j);
          // console.log(i, j);
          // console.log({ element });

          if (element === 'O') {
            //do nothing
          }
          if (element === '#') {
            break;
          }
          if (element === '.') {
            emptySpaces++;
          }
        }
        // console.log({ emptySpaces });
        // console.log({ i, position });
        // const tempResult = emptySpaces + lines.length - i;
        // if (north) {}
        if (direction === 'west') {
          newPositions.push([i, position - emptySpaces]);
        } else {
          newPositions.push([i, position + emptySpaces]);
        }
        // console.log({ tempResult });

        // result += tempResult;
      }
    }
  }

  copy = lines;
  // console.log({ oldPositions, newPositions });

  oldPositions.forEach((pos) => {
    const line = copy[pos[0]];
    copy[pos[0]] = line.substring(0, pos[1]) + '.' + line.substring(pos[1] + 1);
  });

  newPositions.forEach((pos) => {
    const line = copy[pos[0]];
    copy[pos[0]] = line.substring(0, pos[1]) + 'O' + line.substring(pos[1] + 1);
  });

  lines = copy;
  // lines.forEach((line) => console.log(line));
}

for (let i = 1; i <= 1000; i++) {
  // console.log('cycle:', i);
  rotateNorthSouth('north');
  rotateWestEast('west');
  rotateNorthSouth('south');
  rotateWestEast('east');
}
lines.forEach((line, i) => {
  console.log(line);
  const count = line.replace(/[\.#]/g, '').length;
  const load = count * (lines.length - i);
  // console.log(load);
  result += load;
});
// lines.forEach((line) => console.log(line));
console.log({ result });
