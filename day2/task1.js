var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
var result = 0;

for (let i = 0; i < lines.length; i++) {
  var element = lines[i];
  element = element.split(": ")[1];

  const sets = element.split(/[,;]/);

  if (!isOverThreshold(sets)) {
    result += (i + 1);
  }
}

function isOverThreshold(sets) {
  isOverValue = false;
  sets.forEach((set) => {
    set = set.trim();
    const count = set.split(" ")[0];
    const color = set.split(" ")[1];

    // console.log(color, count);

    switch (color) {
      case "red":
        if (count > 12) {
          isOverValue = true;
        //   console.log(color + ' is over value of ' + count);
          break;
        }
      case "green":
        if (count > 13) {
          isOverValue = true;
        //   console.log(color + ' is over value of' + count);
          break;
        }
      case "blue":
        if (count > 14) {
          isOverValue = true;
        //   console.log(color + ' is over value of' + count);
          break;
        }
    }
  });
  return isOverValue;
}

console.log(result);
