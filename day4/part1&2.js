const { readFileSync } = require("fs");
const getTime = (record) => new Date(record.match(/\[(.*)\]/)[1]).getTime();
const inpArr = readFileSync("input.txt").toString().split("\n").sort((a, b) => getTime(a) - getTime(b));
const guardSleep = new Map();
let sleepStart, currentGuard;

inpArr.forEach(record => {
	if (record.includes("#")) {
        currentGuard = parseInt(record.match(/#(\d+)/)[1]);
        if (!guardSleep.has(currentGuard)) guardSleep.set(currentGuard, { totalMin : 0, 
                minFreq: Array(60).fill(0) });
    }
    const currentMinute = parseInt(record.match(/:(\d+)\]/)[1]);
	if (record.includes("asleep")) sleepStart = currentMinute;
	if (record.includes("wakes")) {
        guardSleep.set(currentGuard, {
            totalMin: (guardSleep.get(currentGuard)).totalMin += currentMinute - sleepStart,
            minFreq: (guardSleep.get(currentGuard)).minFreq
        });
        for (let i = sleepStart; i < currentMinute; i++) {
            guardSleep.set(currentGuard, {
                totalMin: (guardSleep.get(currentGuard)).totalMin,
                minFreq: ((guardSleep.get(currentGuard)).minFreq[i]++, (guardSleep.get(currentGuard)).minFreq)
            });
        }    	
    }
});

const mostAsleep = [...guardSleep].reduce((a, b) => (a[1].totalMin > b[1].totalMin) ? a : b);
const mostAsleepMin = mostAsleep[1].minFreq.indexOf(Math.max(...mostAsleep[1].minFreq));
console.log(`Day 4 | Part 1 - Solution: ${mostAsleep[0] * mostAsleepMin}`);

const mostFreqAsleep = [...guardSleep].reduce((a, b) => (Math.max(...a[1].minFreq) > Math.max(...b[1].minFreq)) ? a : b);
const mostFreqAsleepMin = mostFreqAsleep[1].minFreq.indexOf(Math.max(...mostFreqAsleep[1].minFreq));
console.log(`Day 4 | Part 2 - Solution: ${mostFreqAsleep[0] * mostFreqAsleepMin}`);