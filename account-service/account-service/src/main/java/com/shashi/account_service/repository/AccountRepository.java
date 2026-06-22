package com.shashi.account_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.shashi.account_service.entity.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUserId(String userId);
    Optional<Account> findByAccountNumber(String accountNumber);
    boolean existsByUserId(String userId);
}