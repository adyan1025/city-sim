package org.example.citysim;

import org.springframework.web.bind.annotation.GetMapping;

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

}
