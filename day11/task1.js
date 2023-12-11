var fs = require('fs');
var text = fs.readFileSync('./inputTest.txt', 'utf-8');

var lines = text.split('\n');
var result = 0;
// console.log(lines[0]);

//expand rows
for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  if (!line.includes('#')) {
    lines.splice(index, 0, '.'.repeat(line.length));
    index++;
  }
}

lines = lines.map((line) => [...line]);

//expand columns
for (let index = 0; index < lines[0].length; index++) {
  if (!lines.some((line) => line[index] === '#')) {
    lines.map((line) => line.splice(index, 0, '.'));
    index++;
  }
}

//iterate through grid to find galaxies
const galaxies = [];

for (let x = 0; x < lines.length; x++) {
  const row = lines[x];

  for (let y = 0; y < row.length; y++) {
    const element = row[y];
    if (element === '#') {
      galaxies.push([x, y]);
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
    result += distance
  }
}

console.log(galaxies);
console.log(result);
