package com.shashi.transaction_service.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.shashi.transaction_service.dto.TransactionRequest;
import com.shashi.transaction_service.dto.TransactionResponse;
import com.shashi.transaction_service.entity.Transaction;
import com.shashi.transaction_service.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository repository;
    private final RestTemplate restTemplate;

    private static final String ACCOUNT_SERVICE_URL = "http://localhost:8082/accounts";

    public TransactionService(TransactionRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    public TransactionResponse transfer(TransactionRequest request) {

        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            return new TransactionResponse(null, "FAILED", "Invalid amount");
        }

        try {
            // 1. Deduct from sender
            updateBalance(request.getFromAccount(), request.getAmount().negate());

            // 2. Add to receiver
            updateBalance(request.getToAccount(), request.getAmount());

            // 3. Record transaction
            Transaction tx = new Transaction();
            tx.setFromAccount(request.getFromAccount());
            tx.setToAccount(request.getToAccount());
            tx.setAmount(request.getAmount());
            tx.setType("TRANSFER");
            tx.setStatus("SUCCESS");
            tx.setTimestamp(LocalDateTime.now());

            repository.save(tx);

            return new TransactionResponse(tx.getId(), "SUCCESS", "Transfer completed successfully");

        } catch (Exception e) {
            // Record failed transaction
            Transaction tx = new Transaction();
            tx.setFromAccount(request.getFromAccount());
            tx.setToAccount(request.getToAccount());
            tx.setAmount(request.getAmount());
            tx.setType("TRANSFER");
            tx.setStatus("FAILED");
            tx.setTimestamp(LocalDateTime.now());
            repository.save(tx);

            return new TransactionResponse(null, "FAILED", e.getMessage());
        }
    }

    private void updateBalance(Long accountId, BigDecimal amount) {
        String url = ACCOUNT_SERVICE_URL + "/" + accountId + "/balance?amount=" + amount;
        restTemplate.put(url, null);
    }

    public List<Transaction> getTransactionsByAccount(Long accountId) {
    return repository.findByFromAccountOrToAccountOrderByTimestampDesc(
        accountId, accountId
    );
}

public List<Transaction> getAllTransactions() {
    return repository.findAll();
}
}