import { Bench } from 'tinybench';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export const generateString = (len) => {
    const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let str = "";
    for (let i = 0; i < len; i++) {
        str += alphabet[getRndInteger(0,alphabet.length-1)];
    }
    return str;
}

export const findCharOccurrences = (str, char) => {
    const occurrences = [];
    for (let i = 0; i < str.length; i++) {
        const s = str[i];
        if (char === s) {
            occurrences.push(i);
        }
    }
    return occurrences;
};

function findOccurances(content, char) {
    var matches = (content).split(char).reduce((acc, p) => {
      var len = p.length + 1;
      if (acc.length > 0) {
        len += acc[acc.length - 1];
      }
      acc.push(len);
      return acc;
    }, []);
    matches.pop();
    return matches;
  }


const beforeBench = () => {
    testString = generateString(100000);
    testChar = generateString(1);
}

const bench = new Bench({ iterations: 100 });

var testString = generateString(500);
var testChar = generateString(1);

bench
  .add('findOccurances', () => {
    findCharOccurrences(testString, testChar)
  }, {beforeEach: beforeBench})
  .add('findCharOccurrences', () => {
    findCharOccurrences(testString, testChar)
  }, {beforeEach: beforeBench})

await bench.warmup(); // make results more reliable, ref: https://github.com/tinylibs/tinybench/pull/50
await bench.run();

console.table(bench.table());
