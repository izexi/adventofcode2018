input = open("input.txt","r")
inpArr = map(int, input.read().splitlines())
total = 0
i = 0
totals = set()

while total not in totals:
    totals.add(total)
    total += inpArr[i % len(inpArr)]
    i+=1

print("Day 1 | Part 2 - Solution: {}".format(total))