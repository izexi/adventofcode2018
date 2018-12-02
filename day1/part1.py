input = open("input.txt","r")
inpArr = map(int, input.read().splitlines())
print("Day 1 | Part 1 - Solution: {}".format(sum(inpArr)))