var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var blocks = text.split('\r\n\r\n').map((line) => line.split('\r\n'));
var result = 0;

function offByOneCompare(firstString, secondString) {
  if (!firstString || !secondString) return false;
  //   console.log({firstString, secondString});
  let differences = 0;
  for (let i = 0; i < firstString.length; i++) {
    const left = firstString.at(i);
    const right = secondString.at(i);
    // console.log({left, right});
    if (left !== right) {
      differences++;
    }
  }
  //   console.log(differences);
  return differences === 1;
}

for (let i = 0; i < blocks.length; i++) {
  const lines = blocks[i];
  // console.log(lines);

  let horizontalMirror = false;
  let horizontalFound = false;
  let hDuplicateIndex = undefined;
  const hMatches = true;
  let lastIndex = -1;
  while (hMatches) {
    hDuplicateIndex = lines.findIndex(
      (line, index, self) =>
        (line === self[index + 1] || offByOneCompare(line, self[index + 1])) &&
        index > lastIndex
    );
    lastIndex = hDuplicateIndex;
    // console.log({ hDuplicateIndex });
    if (hDuplicateIndex === -1) break;

    const distanceToEdge = Math.min(
      lines.length - 2 - hDuplicateIndex,
      hDuplicateIndex
    );
    // console.log({ distanceToEdge });

    let smudge = false;
    for (let j = hDuplicateIndex - distanceToEdge; j <= hDuplicateIndex; j++) {
      const element1 = lines[j];
      const element2 = lines[2 * hDuplicateIndex + 1 - j];
      // console.log({ element1, element2 });
      if (element1 === element2) {
        horizontalMirror = true;
      } else {
        if (!smudge && offByOneCompare(element1, element2)) {
          smudge = true;
          horizontalMirror = true;
        } else {
          horizontalMirror = false;
          break;
        }
      }
    }
    if (horizontalMirror && smudge) {
      horizontalFound = true;
      break;
    }
  }

  if (horizontalFound) {
    console.log({ hDuplicateIndex });
    result += (hDuplicateIndex + 1) * 100;
  } else {
    let vMatches = true;
    let vDuplicateIndex = undefined;
    let verticalMirror = false;
    lastIndex = -1;
    while (vMatches) {
      // console.log({lastIndex});
      for (let j = lastIndex + 1; j < lines[0].length; j++) {
        const charsLeft = lines.map((line) => line[j]);
        const charsRight = lines.map((line) => line[j + 1]);
        // console.log({ charsLeft, charsRight });

        if (
          charsLeft.every((char, pos) => char === charsRight[pos]) ||
          offByOneCompare(charsLeft, charsRight)
        ) {
          vDuplicateIndex = j;
          lastIndex = vDuplicateIndex;
          // console.log('set duplicate index to:', vDuplicateIndex);
          break;
        }
      }

      const distanceToEdge = Math.min(
        lines[0].length - 2 - vDuplicateIndex,
        vDuplicateIndex
      );
      // console.log({distanceToEdge});
      // console.log({vDuplicateIndex});

      let smudge = false;
      for (
        let j = vDuplicateIndex - distanceToEdge;
        j <= vDuplicateIndex;
        j++
      ) {
        const element1 = lines.map((line) => line[j]);
        const element2 = lines.map((line) => line[2 * vDuplicateIndex + 1 - j]);
        // console.log({ element1, element2 });
        if (element1.every((char, pos) => char === element2[pos])) {
          verticalMirror = true;
        } else {
          if (!smudge && offByOneCompare(element1, element2)) {
            smudge = true;
            verticalMirror = true;
          } else {
            verticalMirror = false;
            break;
          }
        }
      }
      if (verticalMirror && smudge) break;
    }
    console.log({ vDuplicateIndex });
    result += vDuplicateIndex + 1;
  }
}
console.log({ result });
