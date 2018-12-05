const { readFileSync } = require("fs");
const inpArr = readFileSync("input.txt").toString().split("\n");
const claimed = new Map();
let overlap = 0;

inpArr.forEach(claim => {
	const measurements = claim.match(/@ (\d+),(\d+): (\d+)x(\d+)/).map(Number);
	const [startingX, startingY] = [measurements[1], measurements[2]];
	const [width, height] = [measurements[1] + measurements[3], measurements[2] + measurements[4]];

	for (let i = startingX; i < width; i++) {
		for (let j = startingY; j < height; j++) {
			const coords = `${i}, ${j}`;
			claimed.set(coords, (claimed.get(coords) || 0) + 1);
			if (claimed.get(coords) === 2) overlap++;
		}
	}
});

console.log(`Day 3 | Part 1 - Solution: ${overlap}`);