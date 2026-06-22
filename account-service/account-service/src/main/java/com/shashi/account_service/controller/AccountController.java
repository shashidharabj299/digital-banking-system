package com.shashi.account_service.controller;

import java.math.BigDecimal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shashi.account_service.entity.Account;
import com.shashi.account_service.service.AccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@Valid @RequestBody Account account) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(service.createAccount(account));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Account> getByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(service.getAccountByUserId(userId));
    }

    @GetMapping("/{accountNumber}")
    public ResponseEntity<Account> getByAccountNumber(@PathVariable String accountNumber) {
        return ResponseEntity.ok(service.getAccountByAccountNumber(accountNumber));
    }

    @PutMapping("/{id}/balance")
public ResponseEntity<Account> updateBalance(
        @PathVariable Long id,
        @RequestParam BigDecimal amount) {
    return ResponseEntity.ok(service.updateBalanceById(id, amount));
}
}