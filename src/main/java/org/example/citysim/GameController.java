package org.example.citysim;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {
    Money money = new Money();

    @GetMapping("/get-money")
    public ResponseEntity<Integer> getMoney() {
        return ResponseEntity.ok(money.getMoney());
    }

    @PostMapping("/add-money")
    public void addMoney(@RequestBody int amount) {
        money.add(amount);
        System.out.println("ADDED " + money.getMoney());
    }

    @PostMapping("/update-shop")
    public ResponseEntity<Integer> updateGame(@RequestBody int id) {
        return ResponseEntity.ok(id);
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
