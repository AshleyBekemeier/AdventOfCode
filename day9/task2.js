var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n").map(line => line.trim().split(' ').map(number => parseInt(number)));
var result = 0;
// console.log(lines);

for (let index = 0; index < lines.length; index++) {
  const layers = [lines[index].reverse()];
  // console.log(layers);
  while (layers.at(-1).some(value => value !== 0)) {
    // console.log(layers.length);
    const lastLayer = layers.at(-1);
    const newLayer = [];

    for (let layerIndex = 0; layerIndex < lastLayer.length - 1; layerIndex++) {
      const diff = lastLayer[layerIndex + 1] - lastLayer[layerIndex] ;
      newLayer.push(diff);
    }
    // console.log(newLayer.length);
    layers.push(newLayer);
  }
  // console.log(layers);
  let prediction = 0;
  for (let i = 0; i < layers.length - 1; i++) {
    const element = layers[i].at(-1);
    // console.log(element);
    prediction += element;
  }
  // console.log(prediction);
  result += prediction;
}
console.log(result);
