var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");

const gcd2 = (a, b) => a ? gcd2(b % a, a) : b;

const lcm2 = (a, b) => a * b / gcd2(a, b);
// Then use reduce on given array of integers:


function getFinalNumber(arr) {
  return arr.reduce(lcm2)
}

const instructions = (lines[0].replace(/(L)/g, 1).replace(/(R)/g, 2).split(''));
const nodes = lines.slice(1).map(line => line.replace(/[^A-Z0-9]/g, ' ').trim().split(/\s+/));
// console.log(instructions, nodes)

let rowIndex = nodes.findIndex(node => node[0] === 'AAA')
let steps = [];

let startingNodes = [...nodes].reduce((acc, currentValue, index) =>{
   if (currentValue[0].at(-1) === 'A') {
    return acc.concat(index)
   }
   return acc
  }, []);
  startingNodes = startingNodes.filter((letter) => letter === 0 || letter  !== undefined)


  // console.log(startingNodes, nodes);

  startingNodes.forEach(node => {
    // console.log(node);
    let rowIndex = node;
    let tmpSteps = 0;
    let tmpResult = '';
    let index = 0;
    while (tmpResult.at(-1) !== 'Z') {
      for (let index = 0; index < instructions.length; index++) {
        const instructionIndex = instructions[index];
      // console.log({instructionIndex, test: nodes[rowIndex]});
      tmpResult = nodes[rowIndex][instructionIndex] ?? '';
   
      rowIndex = nodes.findIndex(element => element[0] === tmpResult);
      if (tmpResult.at(-1) === 'Z') {
        tmpSteps++
        break;
      }
      // console.log({tmpResult, rowIndex, tmpSteps});
      tmpSteps++;
    }
  }
  steps.push(tmpSteps);
});


console.log({steps})

result = getFinalNumber(steps);
console.log(result);


