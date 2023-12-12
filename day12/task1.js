const { count } = require('console');
var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

var lines = text.split('\n');
var result = 0;
// console.log(lines[0]);

//iterate rows
for (let index = 0; index < lines.length; index++) {
  const line = lines[index].split(' ');
  const pattern = line[0];
  const numbers = line[1].split(',');

  // console.log({ pattern, numbers });

  let mutations = [pattern];
  const numQuestionmarks = pattern.match(/\?/g).length;

  // replace '?' with both '#' and '.'
  for (let j = 0; j < numQuestionmarks; j++) {
    const newMutations = [];
    mutations.forEach((mutation) => {
      newMutations.push(mutation.replace('?', '#'));
      newMutations.push(mutation.replace('?', '.'));
    });
    mutations = newMutations;
  }
  // console.log(mutations);

  //count the mutations that satisfy the conditions
  let count = 0;

  mutations.forEach((mutation) => {
    let match = mutation.split('.').filter(Boolean);
    if (match.length !== numbers.length) return;
    contains = !match.some((element, i) => {
      return element.length !== parseInt(numbers[i]);
    });
    if (contains) {
      // console.log(match);
      count++;
    }
  });
  console.log(count);
  result += count;
}
console.log({result});
