var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var blocks = text.split(',');

function getHash(input) {
  let value = 0;
  for (let i = 0; i < input.length; i++) {
    const character = input[i];

    value += character.charCodeAt(0);
    value = value * 17;
    value = value % 256;
  }
  return value;
}

let map = new Array(255);
map.fill(undefined);
// let map = new Map();
var result = 0;
blocks.length;
blocks.forEach((block) => {
  // console.log(block);
  const positive = block.includes('=');
  split = block.split(/[=-]/);
  const label = split[0];
  const focalStrength = split[1];
  const boxNumber = getHash(label);
  // console.log({ label, boxNumber });

  if (positive) {
    if (!map[boxNumber]) {
      const newbox = new Map();
      map[boxNumber] = newbox;
    }
    const box = map[boxNumber];
    box.set(label, focalStrength);
    map[boxNumber] = box;
  } else {
    if (map[boxNumber]) {
      const box = map[boxNumber];
      box.delete(label);
      map[boxNumber] = box;
    }
  }
});

map.forEach((box, boxNumber) => {
  let multiplier = 0;
  if (box)
    for (const [key, value] of box?.entries()) {
      multiplier++;

      // console.log(`${key} = ${value}`);
      const tempResult = (boxNumber + 1) * multiplier * value;
      result += tempResult;
      console.log({ tempResult });
    }
});

console.log({ result });
