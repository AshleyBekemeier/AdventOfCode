var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
var result = 0;

const instructions = (lines[0].replace(/(L)/g, 1).replace(/(R)/g, 2).split(''))
const nodes = lines.slice(1).map(line => line.replace(/[^A-Z]/g, ' ').trim().split(/\s+/))
// console.log(instructions, nodes)

let rowIndex = nodes.findIndex(node => node[0] === 'AAA')
let tmpResult = undefined
let steps = 0
console.log(rowIndex)

while (tmpResult !== 'ZZZ') {
for (let index = 0; index < instructions.length; index++) {
  const instructionIndex = instructions[index];
  tmpResult = nodes[rowIndex][instructionIndex]
  rowIndex = nodes.findIndex(node => node[0] === tmpResult)
  steps++
  // console.log(tmpResult, rowIndex, steps)
}
}
console.log(steps)

