package org.example.citysim.props;

public class Building extends Prop{
    private int id;
    private int price;
    private int passive;
    private final String type;

    public Building(int id, int price, int passive) {
        super(id, price);
        this.passive = passive;
        type = "Building";
    }

    public double getMultiplier() {
        return passive;
    }

    public String getType() {
        return type;
    }

    public int getPassive() {
        return passive;
    }
}
