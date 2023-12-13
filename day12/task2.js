var fs = require('fs');
var text = fs.readFileSync('./input1.txt', 'utf-8');

// var lines = text.split('\n').slice(-1);
var lines = text.split('\n');
var result = 0;

//iterate rows
for (let index = 0; index < lines.length; index++) {
  const line = lines[index].split(' ');
  //part one:
  // const pattern = line[0];
  // const numbers = line[1].split(',');

  //part two:
  const pattern = (line[0] + '?').repeat(5).slice(0, -1);
  const numbers = (line[1] + ',').repeat(5).split(',').filter(Boolean);

  // console.log({ pattern, numbers });

  let mutations = [{ group: 0, length: 0, last: '', count: 1 }];

  // replace '?' with both '#' and '.'
  for (let j = 0; j < pattern.length; j++) {
    const symbolToAdd = pattern.at(j);
    // console.log('adding symbol: ', symbolToAdd);
    let newMutations = [];
    mutations.forEach((mutation) => {
      if (!mutation.last) {
        if (symbolToAdd !== '#') {
          newMutations.push({
            group: 0,
            length: 0,
            last: '.',
            count: 1,
          });
        }
        if (symbolToAdd !== '.') {
          newMutations.push({
            group: 1,
            length: 1,
            last: '#',
            count: 1,
          });
        }
      }
      if (mutation.last === '.') {
        if (symbolToAdd !== '#') {
          newMutations.push({
            group: mutation.group,
            length: mutation.length,
            last: '.',
            count: mutation.count,
          });
        }
        if (symbolToAdd !== '.') {
          newMutations.push({
            group: mutation.group + 1,
            length: 1,
            last: '#',
            count: mutation.count,
          });
        }
      }
      if (mutation.last === '#') {
        if (symbolToAdd !== '#') {
          if (mutation.length === parseInt(numbers[mutation.group - 1])) {
            newMutations.push({
              group: mutation.group,
              length: 0,
              last: '.',
              count: mutation.count,
            });
          }
        }
        if (symbolToAdd !== '.') {
          if (mutation.length < parseInt(numbers[mutation.group - 1])) {
            newMutations.push({
              group: mutation.group,
              length: mutation.length + 1,
              last: '#',
              count: mutation.count,
            });
          }
        }
      }
    });

    //filter duplicate branches to reduce stack size
    newMutations = newMutations
      .map((mutation, index, self) => {
        if (
          self.findIndex(
            (search) =>
              search.group === mutation.group &&
              search.length === mutation.length &&
              search.last === mutation.last
          ) === index
        ) {
          let combinedCount = 0;
          self.forEach((search) => {
            if (
              search.group === mutation.group &&
              search.length === mutation.length &&
              search.last === mutation.last
            )
              combinedCount += search.count;
          });
          combinedMutations = mutation;
          combinedMutations.count = combinedCount;
          return combinedMutations;
        } else return null;
      })
      .filter(Boolean);

    //remove impossible combinations
    newMutations = newMutations.filter((mutation) => {
      return (
        mutation.length <= numbers[mutation.group - 1] || mutation.length === 0
      );
    });

    mutations = newMutations;
    // console.log({ mutations });
  }

  mutations = mutations.filter(
    (mutation) =>
      (mutation.group === numbers.length &&
        mutation.last === '#' &&
        mutation.length === parseInt(numbers.at(-1))) ||
      (mutation.group === numbers.length &&
        mutation.last === '.' &&
        mutation.length === 0)
  );

  let count = 0;
  mutations.forEach((mutation) => {
    count += mutation.count;
  });
  console.log({ count });
  result += count;
}
console.log({ result });
