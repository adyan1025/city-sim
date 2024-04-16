package org.example.citysim.props;

public class Building {
    private int id;
    private int price;
    private int multiplier;

    public Building(int id, int price, int multiplier) {
        this.id = id;
        this.price = price;
        this.multiplier = multiplier;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public double getMultiplier() {
        return multiplier;
    }
}
