package com.shashi.transaction_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shashi.transaction_service.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByFromAccount(Long fromAccount);
    List<Transaction> findByToAccount(Long toAccount);
    List<Transaction> findByFromAccountOrToAccountOrderByTimestampDesc(
        Long fromAccount, Long toAccount
    );
}