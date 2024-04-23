package org.example.citysim;

public class Money {
    private int money;
    private int multiplier;
    private int passive;

    public Money() {
        money = 0;
        multiplier = 1;
        passive = 0;

    }

    public int getMoney() {
        money += passive;
        return money;
    }

    public void subtract(int amount) {
        money -= amount;
    }

    public void add(int amount) {
        money += amount * multiplier;
    }

    public void setMultiplier(int multiplier) {
        this.multiplier = multiplier;
    }

    public void setPassive(int passive) {
        this.passive = passive;
    }

    public void resetMoney() {
        money = 0;
    }
}
