package com.shashi.account_service.service;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shashi.account_service.entity.Account;
import com.shashi.account_service.exception.AccountAlreadyExistsException;
import com.shashi.account_service.exception.AccountNotFoundException;
import com.shashi.account_service.repository.AccountRepository;

@Service
public class AccountService {

    private final AccountRepository repository;

    public AccountService(AccountRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Account createAccount(Account account) {
        if (repository.existsByUserId(account.getUserId())) {
            throw new AccountAlreadyExistsException(
                "Account already exists for userId: " + account.getUserId()
            );
        }

        account.setAccountNumber(generateAccountNumber());
        account.setBalance(BigDecimal.ZERO);
        account.setStatus("ACTIVE");

        return repository.save(account);
    }

    public Account getAccountByUserId(String userId) {
        return repository.findByUserId(userId)
            .orElseThrow(() -> new AccountNotFoundException(
                "No account found for userId: " + userId
            ));
    }

    public Account getAccountByAccountNumber(String accountNumber) {
        return repository.findByAccountNumber(accountNumber)
            .orElseThrow(() -> new AccountNotFoundException(
                "Account not found: " + accountNumber
            ));
    }

    @Transactional
    public Account updateBalance(String accountNumber, BigDecimal amount) {
        Account account = getAccountByAccountNumber(accountNumber);

        BigDecimal newBalance = account.getBalance().add(amount);
        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalStateException(
                "Insufficient funds in account: " + accountNumber
            );
        }

        account.setBalance(newBalance);
        return repository.save(account);
    }

    @Transactional
    public Account updateBalanceById(Long id, BigDecimal amount) {
        Account account = repository.findById(id)
            .orElseThrow(() -> new AccountNotFoundException(
                "Account not found with id: " + id
            ));

        BigDecimal newBalance = account.getBalance().add(amount);
        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalStateException(
                "Insufficient funds in account id: " + id
            );
        }

        account.setBalance(newBalance);
        return repository.save(account);
    }

    private String generateAccountNumber() {
        return "ACC" + UUID.randomUUID()
            .toString().replace("-", "")
            .substring(0, 12).toUpperCase();
    }
}