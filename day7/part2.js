const { readFileSync } = require("fs");
const input = readFileSync("input.txt").toString().split("\n");
const stepMap = new Map();
const letters = new Set();
let time = 0;

input.forEach(line => {
	const [, before, after] = line.match(/Step (.*?) must be finished before step (.*?) can begin./);
	stepMap.set(after, {
		time: after.charCodeAt() - 4,
		dependants: [
			...((stepMap.get(after) || {}).dependants || []),
			before,
		],
	});
	letters.add(before);
	letters.add(after);
	if (!stepMap.has(before)) {
		stepMap.set(before, {
			time: before.charCodeAt() - 4,
			dependants: [],
		});
	}
});

const getQueue = () => [...stepMap.entries()].filter(([, { dependants }]) => !dependants.length);
let queue = getQueue();

while (queue.length) {
	time++;
	for (let i = 0; i < 5; i++) {
		const worker = (queue[i] || [])[0];
		if (stepMap.has(worker) && --stepMap.get(worker).time < 1) {
			// eslint-disable-next-line no-shadow
			stepMap.forEach(({ time, dependants }, step) => {
				stepMap.set(step, {
					time: time,
					dependants: dependants.filter(e => e !== worker),
				});
			});
			stepMap.delete(worker);
		}
	}
	queue = getQueue();
}

console.log(`Day 7 | Part 2 - Solution: ${time}`);