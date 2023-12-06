var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
const time = parseInt(lines[0].replace(/ /g, ""));
const distance = parseInt(lines[1].replace(/ /g, ""));
console.log(time, distance);
var result = 0;

// const time = times[i];
// const distance = distances[i];
console.log(time, distance);

let winningTimes = 0;
for (let holdingTime = 1; holdingTime < time; holdingTime++) {
  travelTime = time - holdingTime;

  travelDistance = holdingTime * travelTime;
  // console.log(holdingTime, travelTime, ": ", travelDistance);

  if (travelDistance > distance) {
    winningTimes++;
  }
}
console.log(winningTimes);
result =  winningTimes;

console.log(result);
