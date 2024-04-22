package org.example.citysim;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@org.springframework.stereotype.Controller
public class WebController {
    @GetMapping("/")
    public String getHome() {
        return "home";
    }

    @GetMapping("/game")
    public String getGame() {
        return "game";
    }

    @GetMapping("/win")
    public String getWin() {
        return "win";
    }

}
