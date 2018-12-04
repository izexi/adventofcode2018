const { readFileSync } = require("fs");
const inpArr = readFileSync("input.txt").toString().split("\n");;
const claimed = new Map();
const nonOverlap = new Map();
let overlap = 0;

inpArr.forEach(claim => {
    const data = claim.match(/#(\d+) @ (\d+),(\d+)\: (\d+)x(\d+)/).map(Number);
    const id = data[1];
    const [startingX, startingY] = [data[2], data[3]];
    const [width, height] = [data[2] + data[4], data[3] + data[5]];

    nonOverlap.set(id, true); // initially assume the id isn't being overlapped
    for (let i = startingX; i < width; i++) {
        for (let j = startingY; j < height; j++) {
            const coords = `${i}, ${j}`;
            if (claimed.has(coords)) { // if the coord already has been claimed
                nonOverlap.set(id, false); // the id that is overlapping the coord
                nonOverlap.set(claimed.get(coords), false); // the id of the coord that is getting overlapped
            }
            claimed.set(coords, id);
        }
    }
});

console.log(`Day 3 | Part 2 - Solution: ${[...nonOverlap].find(([_, e]) => e)[0]}`);