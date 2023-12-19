var fs = require('fs');
var text = fs.readFileSync('./inputTest.txt', 'utf-8');

var textArray = text.split('\n\n');
var workflowStrings = textArray[0].split('\n');

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

// console.log({ workflows, partRatings });

// let acceptedParts = [];

let currentWorkflow = workflows.get('in');

let possibleParts = {
  x: [0, 4000],
  m: [0, 4000],
  a: [0, 4000],
  s: [0, 4000],
};

// (possibleParts.x[1] - possibleParts.x[0]) * (possibleParts.m[1] - possibleParts.m[0])

function distribute(possibleParts, currentWorkflow, index) {
  //   console.log({ possibleParts });

  const step = currentWorkflow[index];
  //   console.log({ step });

  if (step.destination === 'A') {
    let value;
    if (!step.isFinal && step.isGreater) {
      value = [step.target + 1, possibleParts[step.source][1]];
      //   console.log("update source value with greater than: ", value, possibleParts[step.source])
    } else if (!step.isFinal && !step.isGreater) {
      value = [possibleParts[step.source][0], step.target - 1];
      //   console.log("update source value with lower than: ", value, possibleParts[step.source])
    }
    const newPossibleParts = step.isFinal
      ? possibleParts
      : {
          ...possibleParts,
          [step.source]: value,
        };
    console.log('End reached: ', newPossibleParts, step.destination);
    const addedPossibilities =
      (newPossibleParts.x[1] - newPossibleParts.x[0]) *
      (newPossibleParts.m[1] - newPossibleParts.m[0]) *
      (newPossibleParts.a[1] - newPossibleParts.a[0]) *
      (newPossibleParts.s[1] - newPossibleParts.s[0]);
    result += addedPossibilities;
    return;
  } else if (step.destination === 'R') {
    return;
  }

  if (step.isFinal) {
    distribute(possibleParts, workflows.get(step.destination), 0);
    return;
  }

  const target = step.target;
  const source = step.source;
  const partSourceValues = possibleParts[source];
  //   console.log({ source });
  //   console.log({ partSourceValues });
  const isGreater = step.isGreater;
  // in{s<1351:px,qqz}
  // qqz{s>2770:qs,m<1801:hdj,R}

  if (
    step.isGreater ? partSourceValues[0] > target : partSourceValues[1] < target
  ) {
    distribute(possibleParts, workflows.get(step.destination), 0);
  } else if (partSourceValues[0] < target < partSourceValues[1]) {
    if (isGreater) {
      distribute(
        { ...possibleParts, [source]: [target + 1, partSourceValues[1]] },
        workflows.get(step.destination),
        0
      );
      distribute(
        { ...possibleParts, [source]: [partSourceValues[0], target] },
        currentWorkflow,
        index + 1
      );
    } else {
      distribute(
        { ...possibleParts, [source]: [partSourceValues[0], target - 1] },
        workflows.get(step.destination),
        0
      );
      distribute(
        { ...possibleParts, [source]: [target, partSourceValues[1]] },
        currentWorkflow,
        index + 1
      );
    }
  } else {
    distribute(possibleParts, currentWorkflow, index + 1);
  }
}

var result = 0;

function checkIfSorted(destination, possibleParts) {
  if (destination === 'A') {
    console.log('End reached: ', possibleParts, destination);
    const addedPossibilities =
      (possibleParts.x[1] - possibleParts.x[0]) *
      (possibleParts.m[1] - possibleParts.m[0]) *
      (possibleParts.a[1] - possibleParts.a[0]) *
      (possibleParts.s[1] - possibleParts.s[0]);
    result += addedPossibilities;
    return true;
  } else if (destination === 'R') {
    return true;
  } else return false;
}

distribute(possibleParts, currentWorkflow, 0);

// acceptedParts.forEach((part) => {
//   const total = part.x + part.m + part.a + part.s;
//   result += total;
// });

console.log(result);
