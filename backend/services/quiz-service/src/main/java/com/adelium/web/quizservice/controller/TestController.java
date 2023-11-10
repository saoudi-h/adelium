/* (C)2023 */
package com.adelium.web.quizservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/")
public class TestController {
    @GetMapping("/hello")
    @ResponseStatus
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello");
    }
}
