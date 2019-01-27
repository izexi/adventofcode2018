const { readFileSync } = require("fs");
const input = readFileSync("input.txt").toString().split("\n");
const stepMap = new Map();
const letters = new Set();
let solution = "";

input.forEach(line => {
	const [, before, after] = line.match(/Step (.*?) must be finished before step (.*?) can begin./);
	stepMap.set(after, [...(stepMap.get(after) || []), before]);
	letters.add(before);
	letters.add(after);
	if (!stepMap.has(before)) stepMap.set(before, []);
});

while (stepMap.size) {
	const nextStepEntry = [...stepMap.entries()]
		.filter(([, arr]) => !arr.length)
		.sort((curr, nxt) => curr[0].localeCompare(nxt[0]))[0];
	const nextStep = nextStepEntry[0];
	solution += nextStep;
	stepMap.delete(nextStep);
	stepMap.forEach((nextSteps, step) => {
		stepMap.set(step, nextSteps.filter(e => e !== nextStep));
	});
}

console.log(`Day 7 | Part 1 - Solution: ${solution}`);