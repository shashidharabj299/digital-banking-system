package com.shashi.transaction_service.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long fromAccount;
    private Long toAccount;

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal amount;

    private String type;
    private String status;
    private LocalDateTime timestamp;

    public Transaction() {}

    public Long getId() { return id; }
    public Long getFromAccount() { return fromAccount; }
    public Long getToAccount() { return toAccount; }
    public BigDecimal getAmount() { return amount; }
    public String getType() { return type; }
    public String getStatus() { return status; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public void setId(Long id) { this.id = id; }
    public void setFromAccount(Long fromAccount) { this.fromAccount = fromAccount; }
    public void setToAccount(Long toAccount) { this.toAccount = toAccount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public void setType(String type) { this.type = type; }
    public void setStatus(String status) { this.status = status; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}