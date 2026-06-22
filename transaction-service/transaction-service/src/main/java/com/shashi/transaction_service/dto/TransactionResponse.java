package com.shashi.transaction_service.dto;

public class TransactionResponse {
    private Long transactionId;
    private String status;
    private String message;

    public TransactionResponse() {}

    public TransactionResponse(Long transactionId, String status, String message) {
        this.transactionId = transactionId;
        this.status = status;
        this.message = message;
    }

    public Long getTransactionId() { return transactionId; }
    public String getStatus() { return status; }
    public String getMessage() { return message; }

    public void setTransactionId(Long transactionId) { this.transactionId = transactionId; }
    public void setStatus(String status) { this.status = status; }
    public void setMessage(String message) { this.message = message; }
}