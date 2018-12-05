const { readFileSync } = require("fs");
const input = readFileSync("input.txt").toString();
const getUnits = (polymer) => {
	const temp = [];
	for (let i = 0; i < polymer.length; i++) {
		const letter = polymer[i];
		const last = temp[temp.length - 1];

		if (!letter) break;
		if (!last) {
			temp.splice(-1, 1);
			temp.push(letter);
			continue;
		}
		if (Math.abs(letter.charCodeAt() - last.charCodeAt()) === 32) {
			temp.splice(-1, 1);
			continue;
		}
		temp.push(letter);
	}
	return temp.length;
};
console.log(`Day 5 | Part 1 - Solution: ${getUnits(input)}`);

const shortestPolymer = [...Array(26).entries()].map((_, i) => String.fromCharCode(i + 97)).reduce((acc, curr) => {
	const accUnits = getUnits(input.replace(new RegExp(acc, "gi"), ""));
	const currUnits = getUnits(input.replace(new RegExp(curr, "gi"), ""));
	return accUnits < currUnits ? acc : curr;
});
console.log(`Day 5 | Part 2 - Solution: ${getUnits(input.replace(new RegExp(shortestPolymer, "gi"), ""))}`);