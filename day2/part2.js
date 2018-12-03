const { readFileSync } = require("fs");
const inpArr = readFileSync("input.txt").toString().split('\n');

for (let i = 0; i < inpArr.length; i++) {
    for (let j = inpArr.length - 1; j >= 0; j--) {
        const [prev, curr] = [[...inpArr[i]], [...inpArr[j]]];
        const diffLetters = prev.filter((l, i) => curr[i] !== l);
        if (diffLetters.length === 1) {
            return console.log(`Day 2 | Part 2 - Solution: ${prev.filter(l => l != diffLetters).join("")}`);
        }    
    }
}