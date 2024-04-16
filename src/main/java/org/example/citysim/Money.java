package org.example.citysim;

public class Money {
    private int money;

    public Money() {
        money = 0;
    }

    public int getMoney() {
        return money;
    }

    public void subtract(int amount) {
        money -= amount;
    }

    public void add(int amount) {
        money += amount;
    }
}
