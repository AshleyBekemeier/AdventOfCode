var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
const times = lines[0].split(/ +/);
const distances = lines[1].split(/ +/);
// console.log(times, distances);
var result = 0;

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = distances[i];
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
  result = result === 0 ? winningTimes : result * winningTimes;
}

console.log(result);
