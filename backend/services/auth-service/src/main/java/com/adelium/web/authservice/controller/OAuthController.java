/* (C)2024 */
package com.adelium.web.authservice.controller;

import com.adelium.web.authservice.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/oauth")
public class OAuthController {

    private final OAuthService service;

    @PostMapping("/token/{provider}")
    public ResponseEntity<?> exchangeCodeForToken(
            @PathVariable String provider, @RequestBody String code) {
        return service.exchangeCodeForToken(provider, code);
    }
}
