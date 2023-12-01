var fs = require("fs");
var text = fs.readFileSync("./day1/input1.txt", "utf-8");

const lines = text.split("\n");
var result = 0;

for (let i = 0; i < lines.length; i++) {
  const element = lines[i];

  const foo = element.replace(/[a-z]/g, "");

  const bar = foo.at(0) + foo.at(-1);
//   console.log(bar);

  result += parseInt(bar);
}

console.log(result);
