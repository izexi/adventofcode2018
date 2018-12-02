import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

class part1 {

    public static void main(String[] args) throws FileNotFoundException {
        Scanner input = new Scanner(new File("input.txt"));
        int total = 0;
        while(input.hasNextLine()) {
            total += Integer.parseInt(input.nextLine());
        }
        input.close();
        System.out.println("Day 1 | Part 1 - Solution: " + total);
    }

}