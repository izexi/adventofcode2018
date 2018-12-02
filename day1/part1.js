// :^) console.log(`Day 1 | Part 1 - Solution: ${eval(require("fs").readFileSync("input.txt").toString())}`);

const { readFileSync } = require("fs");
const inpArr = readFileSync("input.txt").toString().split('\n');
const answer = inpArr.reduce((acc, curr) => acc + parseInt(curr), 0);
console.log(`Day 1 | Part 1 - Solution: ${answer}`);