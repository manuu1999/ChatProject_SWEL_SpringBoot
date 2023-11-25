package com.example.ChatProject_SWEL_SpringBoot;

import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PersonController {

    // this is linked to the html file people
    @GetMapping
    String getPeople(Model model) {
        model.addAttribute("something", "this is coming from the controller"); // this is the variable that we are passing in
        return "people";
    }


}
