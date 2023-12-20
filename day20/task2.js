var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var textArray = text.split('\n');

const modules = new Map();
textArray.forEach((module) => {
  let input = module.split('->')[0].trim();
  let output = module.split('->')[1].replace(/\s/g, '');

  let type = undefined;
  typeSymbol = input.at(0);
  if (typeSymbol === '%') {
    type = 'flipFlop';
  } else if (typeSymbol === '&') {
    type = 'conjunction';
  } else if (input === 'broadcaster') {
    type = 'broadcaster';
  }

  let name;
  if (type === 'broadcaster') {
    name = 'broadcaster';
  } else {
    name = input.slice(1);
  }

  output = output.split(',');

  let connectedNodes = 0;

  if (type === 'conjunction') {
    let occurences = text.match(new RegExp(name, 'g'));
    connectedNodes = occurences.length - 1;
  }

  const moduleObject = {
    type: type,
    output: output,
    isOn: false,
    connectedNodes: connectedNodes,
    currentNodes: [],
  };

  modules.set(name, moduleObject);
});

// for (const [key, values] of modules?.entries()) {
//   // console.log(`${key} = ${values}`);
//   console.log({ key });
//   // values.forEach(console.log);
// }

// console.log(modules.get('b'));

async function sendLowPulse(sender, receiver) {
  buffer = true;
  lowPulseCount++;

  if (receiver === 'rx' && minPressesRequired === 0) {
    console.log('reached end');
    endReached = true;
    minPressesRequired = currentRun;
  }
  // console.log('sending low pulse from', sender, 'to', receiver);
  let module = modules.get(receiver);
  // console.log(module);
  if (module === undefined) return;

  switch (module.type) {
    case 'broadcaster':
      module.output.forEach((destination) => {
        setTimeout(() => {
          sendLowPulse('broadcaster', destination);
        }, 0);
      });
      break;

    case 'flipFlop':
      module.output.forEach((destination) => {
        if (module.isOn) {
          let newModule = { ...module, isOn: false };
          modules.set(receiver, newModule);
          setTimeout(() => {
            sendLowPulse(receiver, destination);
          }, 0);
        } else {
          let newModule = { ...module, isOn: true };
          modules.set(receiver, newModule);
          setTimeout(() => {
            sendHighPulse(receiver, destination);
          }, 0);
        }
      });
      break;
    case 'conjunction':
      // console.log(module.currentNodes);
      let exists = module.currentNodes.indexOf(sender) >= 0;
      if (exists) {
        const updatedCurrentNodes = module.currentNodes.filter(
          (ele) => ele !== sender
        );

        modules.set(receiver, {
          ...module,
          currentNodes: updatedCurrentNodes,
        });
      }

      module.output.forEach((destination) => {
        setTimeout(() => {
          sendHighPulse(receiver, destination);
        }, 0);
      });
      break;

    default:
      break;
  }
}

async function sendHighPulse(sender, receiver) {
  buffer = true;
  highPulseCount++;
  // console.log('sending high pulse from', sender, 'to', receiver);
  let module = modules.get(receiver);
  // console.log(module);
  if (module === undefined) return;

  switch (module.type) {
    case 'broadcaster':
      module.output.forEach((destination) => {
        setTimeout(() => {
          sendHighPulse('broadcaster', destination);
        }, 0);
      });
      break;

    case 'flipFlop':
      //ignore high pulses
      break;

    case 'conjunction':
      // console.log(module.currentNodes);
      let exists = module.currentNodes.indexOf(sender) >= 0;

      let nodeCount;
      if (!exists) {
        const updatedCurrentNodes = [...module.currentNodes, sender];
        nodeCount = updatedCurrentNodes.length;

        modules.set(receiver, {
          ...module,
          currentNodes: updatedCurrentNodes,
        });
      } else {
        nodeCount = module.currentNodes.length;
      }

      if (receiver === 'vr') {
        console.log({ sender, nodeCount, currentRun });
      }

      module.output.forEach((destination) => {
        if (module.connectedNodes === nodeCount) {
          setTimeout(() => {
            sendLowPulse(receiver, destination);
          }, 0);
        } else {
          setTimeout(() => {
            sendHighPulse(receiver, destination);
          }, 0);
        }
      });
      break;

    default:
      break;
  }
}

let result = 0;
let highPulseCount = 0;
let lowPulseCount = 0;
let buffer = true;

let minPressesRequired = 0;
let endReached = false;
let currentRun = 1;

checkBuffer();

function checkBuffer() {
  if (buffer) {
    buffer = false;
    setTimeout(() => {
      checkBuffer();
    }, 1);
  } else {
    // console.log({ currentRun });
    if (!endReached) {
      sendLowPulse('button', 'broadcaster');
      currentRun++;
      checkBuffer();
    } else end();
  }
}

function end() {
  console.log({ lowPulseCount, highPulseCount });
  result = lowPulseCount * highPulseCount;
  console.log({ result });
  console.log({ minPressesRequired });
}
