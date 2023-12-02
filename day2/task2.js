var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
var result = 0;

for (let i = 0; i < lines.length; i++) {
  var element = lines[i];
  element = element.split(": ")[1];

  const sets = element.split(/[,;]/);

  result += getPower(sets);
}

function getPower(sets) {
  minRed = 0;
  minGreen = 0;
  minBblue = 0;
  sets.forEach((set) => {

    set = set.trim();
    const count = set.split(" ")[0];
    const color = set.split(" ")[1];

    // console.log(color, count);

    switch (color) {
      case "red":
        if (parseInt(count) > parseInt(minRed)) {
          // console.log(color, 'has new high of', count, 'beating out previous value of', minRed);
          minRed = count;
        }
        break;
      case "green":
        if (parseInt(count) > parseInt(minGreen)) {
          // console.log(color, 'has new high of', count, 'beating out previous value of', minGreen);
          minGreen = count;
        }
        break;
      case "blue":
        if (parseInt(count) > parseInt(minBblue)) {
          // console.log(color, 'has new high of', count, 'beating out previous value of', minBblue);
          minBblue = count;
        }
        break;
    }
  });
  // console.log(minRed, minGreen, minBblue);
  const power = minRed * minGreen * minBblue;
  // console.log(power);
  return power;
}

console.log(result);
