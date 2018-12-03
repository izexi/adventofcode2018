const { readFileSync } = require("fs");
const inpArr = readFileSync("input.txt").toString().split('\n');
let twice = 0;
let thrice = 0;

inpArr.forEach(ID => {
	const mappedLetters = [...ID].reduce((acc, curr) => acc.set(curr, (acc.get(curr) || 0) + 1), new Map());
	const letterFrequencies = [...mappedLetters.values()];
	if (letterFrequencies.includes(2)) twice++;
	if (letterFrequencies.includes(3)) thrice++;
});

console.log(`Day 2 | Part 1 - Solution: ${twice * thrice}`);