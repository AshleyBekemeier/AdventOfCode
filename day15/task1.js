var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');
console.log(text.length);

var blocks = text.split(',');

var result = 0;
blocks.length;
blocks.forEach((block) => {
  // console.log({ block });
  let value = 0;
  for (let i = 0; i < block.length; i++) {
    const character = block[i];

    value += character.charCodeAt(0);
    value = value * 17;
    value = value % 256;
  }
  result += value;
  // console.log(value);
});
console.log({ result });
