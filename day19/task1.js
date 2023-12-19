var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var textArray = text.split('\n\n');
var workflowStrings = textArray[0].split('\n');
var partRatings = textArray[1].split('\n');

const workflows = new Map();
workflowStrings.forEach((workflowString) => {
  // 'px{a<2006:qkq,m>2090:A,rfg}';
  const nameAndConditions = workflowString.split(/[{}]/);
  const workflowName = nameAndConditions[0];
  const rawConditions = nameAndConditions[1].split(',');
  const conditions = rawConditions.map(parseCondition);
  // console.log({ conditions });
  workflows.set(workflowName, conditions);
});

for (const [key, values] of workflows?.entries()) {
  // console.log(`${key} = ${values}`);
  // console.log({ key });
  // values.forEach(console.log);
}

// const foo = workflows.get('hdj');
// console.log({ foo });

function parseCondition(rawCondition) {
  const rawArr = rawCondition.split(/<|>|:/);
  const isGreater = rawCondition.includes('>');
  if (rawArr.length === 1) {
    return {
      destination: rawArr.at(-1),
      isFinal: true,
    };
  }
  return {
    source: rawArr[0],
    isGreater: isGreater,
    target: parseInt(rawArr[1]),
    destination: rawArr.at(-1),
  };
}

partRatings = partRatings.map((string) => {
  let list = string.replace(/[{}]/g, '').split(',');
  return {
    x: parseInt(list[0].split('=')[1]),
    m: parseInt(list[1].split('=')[1]),
    a: parseInt(list[2].split('=')[1]),
    s: parseInt(list[3].split('=')[1]),
  };
});

// console.log({ workflows, partRatings });

let acceptedParts = [];

for (let i = 0; i < partRatings.length; i++) {
  const part = partRatings[i];
  // console.log({ part });

  let unsorted = true;
  let currentWorkflow = workflows.get('in');

  while (unsorted) {
    for (let j = 0; j < currentWorkflow.length; j++) {
      const step = currentWorkflow[j];
      const source = step.source;
      const partSourceValue = part[source];
      const target = step.target;

      // console.log(step);
      if (
        (step.isGreater
          ? partSourceValue > target
          : partSourceValue < target) ||
        step.isFinal
      ) {
        if (step.destination === 'A') {
          acceptedParts.push(part);
          unsorted = false;
          break;
        } else if (step.destination === 'R') {
          unsorted = false;
          break;
        } else {
          // console.log('going to workflow: ', step.destination);
          currentWorkflow = workflows.get(step.destination);
          break;
        }
      }
    }
  }
}
console.log({ acceptedParts });

var result = 0;

acceptedParts.forEach((part) => {
  const total = part.x + part.m + part.a + part.s;
  result += total;
});

console.log(result);
