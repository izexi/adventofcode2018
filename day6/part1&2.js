const { readFileSync } = require("fs");
// const input = "1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9".split("\n").map(e => e.split(", ").map(Number));
const input = readFileSync("input.txt").toString().split("\n").map(e => e.split(", ").map(Number));
const maxCoord = input.reduce((a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1])]);
const grid = Array.from({ length: maxCoord[1] + 1 }, () => Array(maxCoord[0] + 1));
const areas = new Map();
const inifintePoints = new Set();
let safeRegion = 0;

const dist = ([x1, y1], [x2, y2]) => Math.abs(x2 - x1) + Math.abs(y2 - y1);
const closest = ([x, y]) => input.reduce((a, b) => dist([a[0], a[1]], [x, y]) < dist([b[0], b[1]], [x, y]) ? a : b);
const infintePoint = ([x, y]) => (x === 0 || y === 0 || x === maxCoord[0] || y === maxCoord[1]);

for (let x = 0; x < maxCoord[0] + 1; x++) {
	for (let y = 0; y < maxCoord[1] + 1; y++) {
		let point = -1;
		const closestPoint = closest([x, y]);
		const closestDist = dist(closestPoint, [x, y]);

		if (input.reduce((a, b) => a += dist(b, [x, y]), 0)	< 10000) safeRegion++;
		if (input.filter(e => dist(e, [x, y]) === closestDist).length === 1) {
			const found = input.findIndex(e => e[0] === closestPoint[0] && e[1] === closestPoint[1]);
			if (found !== -1) point = found;
		}
		if (infintePoint([x, y]) || point === -1 && !inifintePoints.has(point)) inifintePoints.add(point);
		grid[y][x] = point;
	}
}

// for some reason calculating the area within the nested for loop doesn't return the right answer
grid.forEach(row => {
	row.forEach(point => {
		if (!inifintePoints.has(point)) areas.set(point, (areas.get(point) || 0) + 1);
	});
});

console.log(`Day 6 | Part 1 - Solution: ${[...areas.values()].reduce((a, b) => a > b ? a : b)}`);
console.log(`Day 6 | Part 2 - Solution: ${safeRegion}`);

// for debugging
/* console.log(grid.map((e, x) => e.map((c, y) => {
	const offset = input.some(p => p[0] === x && p[1] === y) ? 65 : 97;
	return c === -1 ? "." : String.fromCharCode(offset + c);
}).join(" ")).join("\n"));
console.log(`\nPoints:\n ${grid.map(e => e.join(" ")).join("\n")}`);
console.log(inifintePoints);
console.log(areas); */