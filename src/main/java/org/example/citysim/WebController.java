package org.example.citysim;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@org.springframework.stereotype.Controller
public class WebController {
    @GetMapping("/")
    public String getHome() {
        return "home";
    }

    @GetMapping("/game")
    public String getGame(@RequestParam(name = "city", required = false) String cityName, Model model) {
        if (cityName != null) {
            model.addAttribute("cityName", cityName);
        }
        return "game";
    }

    @GetMapping("/win")
    public String getWin() {
        return "win";
    }

    @GetMapping("/about")
    public String getAbout() {
        return "about";
    }

    @GetMapping("/credits")
    public String getCredits() {
        return "credits";
    }
}
