package org.example.citysim;

public class Money {
    private int money;
    private int multiplier;

    public Money() {
        money = 0;
        multiplier = 1;
    }

    public int getMoney() {
        return money;
    }

    public void subtract(int amount) {
        money -= amount;
    }

    public void add(int amount) {
        money += (int) (amount * multiplier);
        System.out.println("multi " + (amount * multiplier));
    }

    public void setMultiplier(int multiplier) {
        this.multiplier = multiplier;
    }
}
