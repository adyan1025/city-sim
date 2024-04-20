package org.example.citysim;

import org.example.citysim.props.Building;
import org.example.citysim.props.Prop;
import org.example.citysim.props.Vehicle;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class GameController {
    int passive_clicks = 0;
    Money money = new Money();
    Prop p1 = new Building(0, 10, 2);
    Prop p2 = new Vehicle(1, 30, 2);
    Prop p3 = new Building(2, 100, 3);
    Prop p4 = new Vehicle(3, 2000, 3);
    ArrayList<Prop> props = new ArrayList<>();



    public GameController() {
        props.add(p1);
        props.add(p2);
        props.add(p3);
        props.add(p4);
    }

    @GetMapping("/initialize-shop")
    public ArrayList<Prop> initializeShop() {
        return props;
    }

    @GetMapping("/get-money")
    public ResponseEntity<Integer> getMoney() {
        return ResponseEntity.ok(money.getMoney());
    }

    @PostMapping("/add-money")
    public void addMoney(@RequestBody int amount) {
        money.add(amount);
        System.out.println("ADDED " + money.getMoney());
    }

    @PostMapping("/subtract-money")
    public void subtractMoney(@RequestBody int amount) {
        money.subtract(amount);
        System.out.println("SUBTRACTED " + money.getMoney());
    }

    @PostMapping("/set-multiplier")
    public void setMoneyMultiplier(@RequestBody int m) {
        money.setMultiplier(m);
        System.out.println("MULTIPLIER " + m);
    }

    @PostMapping("/add-passive")
    public void setMoneyPassive(@RequestBody int p) {
        money.setPassive(p);
        System.out.println("PASSIVE " + p);
    }
}
