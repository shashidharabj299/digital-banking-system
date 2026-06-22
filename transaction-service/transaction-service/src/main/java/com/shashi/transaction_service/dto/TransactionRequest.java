package com.shashi.transaction_service.dto;

import java.math.BigDecimal;

public class TransactionRequest {
    private Long fromAccount;
    private Long toAccount;
    private BigDecimal amount;

    public Long getFromAccount() { return fromAccount; }
    public Long getToAccount() { return toAccount; }
    public BigDecimal getAmount() { return amount; }

    public void setFromAccount(Long fromAccount) { this.fromAccount = fromAccount; }
    public void setToAccount(Long toAccount) { this.toAccount = toAccount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
}