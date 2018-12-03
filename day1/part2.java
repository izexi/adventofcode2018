import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;
import java.io.File;
import java.io.FileNotFoundException;

class part2 {

    public static void main(String[] args) throws FileNotFoundException {
        Scanner file = new Scanner(new File("input.txt"));
        List<Integer> input = new ArrayList<Integer>();
        Set<Integer> totals = new HashSet<Integer>();
        int total = 0;
        int i = 0;

        while (file.hasNext()) {
            input.add(Integer.parseInt(file.nextLine()));
        }
        file.close();
        while (!totals.contains(total)) {
            totals.add(total);
            total += input.get(i++ % input.size());
        }

        System.out.println("Day 1 | Part 2 - Solution: " + total);
    }


}