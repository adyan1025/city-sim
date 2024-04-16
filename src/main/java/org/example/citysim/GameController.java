package org.example.citysim;

import org.example.citysim.props.Building;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class GameController {
    Money money = new Money();
    Building b1 = new Building(1, 10, 2);
    Building b2 = new Building(2, 30, 3);
    ArrayList<Building> buildings = new ArrayList<>();

    @GetMapping("/initialize-shop")
    public ArrayList<Building> initializeShop() {
        buildings.add(b1);
        buildings.add(b2);
        return buildings;
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





//    @PostMapping("/add-money")
//    public ResponseEntity<String> addMoney(@RequestBody String amount) {
//        int current = parseJSON(amount);
//        money.addMoney(current);
//        return ResponseEntity.ok("Added $" + current + ". In total: $" + money.getMoney());
//    }
//
//    @PostMapping("/sub-money")
//    public ResponseEntity<String> subMoney(@RequestBody String amount) {
//        int current = parseJSON(amount);
//        money.subtractMoney(current);
//        return ResponseEntity.ok("Subtracted $" + current);
//    }
//
//    public int parseJSON(String money) {
//        try {
//            ObjectMapper mapper = new ObjectMapper();
//            Money moneyObj = mapper.readValue(money, Money.class);
//            return moneyObj.getMoney();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return -1;
//        }
//    }
}
