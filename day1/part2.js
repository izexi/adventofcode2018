const { readFileSync } = require("fs");
const inpArr = readFileSync("input.txt").toString().split("\n");
const totals = new Set();
let total = 0;
let i = 0;

while (!totals.has(total)) {
    totals.add(total);
    total += parseInt(inpArr[i++ % inpArr.length]);
}

console.log(`Day 1 | Part 2 - Solution: ${total}`);