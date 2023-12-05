var fs = require("fs");
var seeds = fs.readFileSync("./realInput/seeds.txt", "utf-8").split(" ");
var seedToSoil = mapToObject(
  fs.readFileSync("./realInput/seed-to-soil.txt", "utf-8").split("\n")
);
var soilToFertilizer = mapToObject(
  fs.readFileSync("./realInput/soil-to-fertilizer.txt", "utf-8").split("\n")
);
var fertilizerToWater = mapToObject(
  fs.readFileSync("./realInput/fertilizer-to-water.txt", "utf-8").split("\n")
);
var waterToLight = mapToObject(
  fs.readFileSync("./realInput/water-to-light.txt", "utf-8").split("\n")
);
var lightToTemperature = mapToObject(
  fs.readFileSync("./realInput/light-to-temperature.txt", "utf-8").split("\n")
);
var temperatureToHumidity = mapToObject(
  fs
    .readFileSync("./realInput/temperature-to-humidity.txt", "utf-8")
    .split("\n")
);
var humidityToLocation = mapToObject(
  fs.readFileSync("./realInput/humidity-to-location.txt", "utf-8").split("\n")
);

// console.log(seeds);

const mapArray = [
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
];

const result = [];
for (let i = 0; i < seeds.length; i += 2) {
  const start = parseInt(seeds[i]);
  const length = parseInt(seeds[i + 1]);
  result.push(getSmallestDestinationOfRange(start, length));
  console.log(result.at(-1));
}

console.log('result: ');
console.log(Math.min(...result));

function getSmallestDestinationOfRange(start, length) {
  // console.log(start, length);
  let smallestValue = Number.MAX_VALUE;

  for (let index = 0; index < length; index++) {
    const destination = iterateThroughMaps(index + start);
    // console.log('start :', index + start, 'end : ',destination);
    if (destination < smallestValue) {
      smallestValue = destination;
    }
  }
  return smallestValue;
}

// const destinations = seeds.map((seed) => {
//     // console.log(seed);
//   const destination = iterateThroughMaps(seed);
//   return destination;
// });

// console.log(destinations);
// result = Math.min(...destinations);
// console.log(result);

function iterateThroughMaps(seed) {
  let currentValue = parseInt(seed);
  // console.log(currentValue)

  mapArray.forEach((mapping) => {
    currentValue = mapSourcesToDestinations(mapping, currentValue);
    // console.log(currentValue);
  });
  return currentValue;
}

function mapToObject(input) {
  return input.map((line) => {
    const lineArr = line.split(" ");
    return {
      destination: parseInt(lineArr[0]),
      source: parseInt(lineArr[1]),
      length: parseInt(lineArr[2]),
    };
  });
}

function mapSourcesToDestinations(array, value) {
  let val = value;
  array.forEach((line) => {
    const destination = line.destination;
    const source = line.source;
    const length = line.length;
    // console.log('value: ', value, 'source: ', source);
    if (value >= source && value < source + length) {
      const resultValue = value + (destination - source);
      // console.log(resultValue);
      val = resultValue;
    }
  });

  return val;
}
