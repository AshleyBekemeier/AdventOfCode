var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var lines = text.split('\n');
var result = 0;
let expansionFactor = 1000000;
expansionFactor = expansionFactor === 1 ? 1 : expansionFactor - 1;

//expand rows
for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  if (!line.includes('#')) {
    lines.splice(index, 1, 'x'.repeat(line.length));
    index++;
  }
}

lines = lines.map((line) => [...line]);

//expand columns
for (let index = 0; index < lines[0].length; index++) {
  if (!lines.some((line) => line[index] === '#')) {
    lines.map((line) => line.splice(index, 1, 'y'));
    index++;
  }
}

// console.log(lines);

//iterate through grid to find galaxies
const galaxies = [];

let addX = 0;
for (let x = 0; x < lines.length; x++) {
  const row = lines[x];
  let addY = 0;
  for (let y = 0; y < row.length; y++) {
    const element = row[y];
    if (element === '#') {
      galaxies.push([x+addX, y+addY]);
    } else if (element === 'x') {
        addX+= expansionFactor;
        y++;
        break;
    } else if (element === 'y') {
        addY+= expansionFactor;
    }
  }
}

//iterate through galaxies to get distances for each
for (let i = 0; i < galaxies.length; i++) {
  const galaxy = galaxies[i];
  for (
    let remainingIndex = i;
    remainingIndex < galaxies.length;
    remainingIndex++
  ) {
    const partnerGalaxy = galaxies[remainingIndex];
    const distance =
      Math.abs(partnerGalaxy[0] - galaxy[0]) +
      Math.abs(partnerGalaxy[1] - galaxy[1]);
    // console.log({ partnerGalaxy });
    // console.log({distance});
    result += distance;
  }
}

// console.log(galaxies);
console.log(result);
