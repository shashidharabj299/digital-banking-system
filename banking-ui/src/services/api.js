import axios from "axios";

const API = "http://localhost:8080";

const getToken = () => localStorage.getItem("token");

export const login = (data) =>
    axios.post(`${API}/auth/login`, data);

export const register = (data) =>
    axios.post(`${API}/auth/register`, data);

export const getAccountByUserId = (userId, token) =>
    axios.get(`${API}/accounts/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const transferMoney = (data, token) =>
    axios.post(`${API}/transactions/transfer`, data, {
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

export const getTransactions = (accountId, token) =>
    axios.get(`${API}/transactions/account/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });