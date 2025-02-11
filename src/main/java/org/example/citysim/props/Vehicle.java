package org.example.citysim.props;

public class Vehicle extends Prop{
    private int multiplier;
    private final String type;

    public Vehicle(int id, int price, String name, int multiplier) {
        super(id, price, name);
        this.multiplier = multiplier;
        type = "Vehicle";
    }

    public int getMultiplier() {
        return multiplier;
    }

    public String getType() {
        return type;
    }
}
