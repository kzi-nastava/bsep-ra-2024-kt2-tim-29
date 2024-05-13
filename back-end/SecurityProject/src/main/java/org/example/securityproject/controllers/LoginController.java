package org.example.securityproject.controllers;

import org.example.securityproject.model.LoginToken;
import org.example.securityproject.repository.LoginTokenRepository;
import org.example.securityproject.service.LoginService;
import org.example.securityproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.net.URI;


@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final LoginService loginService;
    private final UserService userService;
    @Autowired
    private LoginTokenRepository loginTokenRepository;

    @Autowired
    public LoginController(LoginService loginService, UserService userService) {
        this.loginService = loginService;
        this.userService = userService;
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody String email) {
        if (!userService.checkIfExists(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with the provided email address was not found.");
        }

        if (!userService.checkServicePackage(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You do not have permission for passwordless login due to your service package type.");
        }

        loginService.sendEmail(email);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<String> handleLoginRequest(@RequestParam("token") String token) {
        LoginToken loginToken = loginTokenRepository.findByToken(token);
        if (loginToken == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Token not found");
        }
        LocalDateTime expirationTime = loginToken.getExpirationTime();
        if (expirationTime.isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token expired");
        }

        loginTokenRepository.delete(loginToken);
        String clientAppUrl = "http://localhost:4200"; // Promeni URL prema stvarnoj putanji
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(clientAppUrl));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

}
