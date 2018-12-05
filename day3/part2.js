const { readFileSync } = require("fs");
const inpArr = readFileSync("input.txt").toString().split("\n");
const claimed = new Map();
const nonOverlap = new Map();

inpArr.forEach(claim => {
	const data = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).map(Number);
	const id = data[1];
	const [startingX, startingY] = [data[2], data[3]];
	const [width, height] = [data[2] + data[4], data[3] + data[5]];

	nonOverlap.set(id, true);
	for (let i = startingX; i < width; i++) {
		for (let j = startingY; j < height; j++) {
			const coords = `${i}, ${j}`;
			if (claimed.has(coords)) {
				nonOverlap.set(id, false);
				nonOverlap.set(claimed.get(coords), false);
			}
			claimed.set(coords, id);
		}
	}
});

// eslint-disable-next-line no-unused-vars
console.log(`Day 3 | Part 2 - Solution: ${[...nonOverlap].find(([_, e]) => e)[0]}`);