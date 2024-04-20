package org.example.citysim.props;

public class Building extends Prop{
    private int passive;
    private final String type;

    public Building(int id, int price, String name, int passive) {
        super(id, price, name);
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
