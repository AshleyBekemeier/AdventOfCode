var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var lines = text.split('\n');

var result = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // console.log(line);
  let previousPosition = 0;
  while (true) {
    const position = line.indexOf('O', previousPosition);
    previousPosition = position + 1;
    // console.log({ position });
    if (position < 0) {
      break;
    } else {
      let emptySpaces = 0;
      for (let j = i - 1; j >= 0; j--) {
        const element = lines[j].at(position);
        // console.log(i, j);
        // console.log({ element });

        if (element === 'O') {
          //do nothing
        }
        if (element === '#') {
          break;
        }
        if (element === '.') {
          emptySpaces++;
        }
      }
      // console.log({ emptySpaces });
      const tempResult = emptySpaces + lines.length - i;
      // console.log({ tempResult });

      result += tempResult;
    }
  }
}
console.log({ result });
