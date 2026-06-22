import { useEffect, useState } from "react";
import { getAccountByUserId } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    useEffect(() => {
        if (!token) { navigate("/"); return; }

        getAccountByUserId(username, token)
            .then(res => setAccount(res.data))
            .catch(() => setError("Could not load account"));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🏦 Digital Banking</h1>
                <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>

            <div style={styles.content}>
                <h2 style={styles.welcome}>Welcome, {username}!</h2>

                {error && <p style={styles.error}>{error}</p>}

                {account ? (
                    <div style={styles.accountCard}>
                        <p style={styles.label}>Account Number</p>
                        <p style={styles.value}>{account.accountNumber}</p>
                        <p style={styles.label}>Account Type</p>
                        <p style={styles.value}>{account.accountType}</p>
                        <p style={styles.label}>Balance</p>
                        <p style={styles.balance}>₹{account.balance.toLocaleString()}</p>
                        <p style={styles.label}>Status</p>
                        <p style={{...styles.value, color: "green"}}>{account.status}</p>
                    </div>
                ) : (
                    <p>Loading account...</p>
                )}

                <div style={styles.actions}>
                    <button style={styles.actionBtn} onClick={() => navigate("/transfer")}>
                        💸 Transfer Money
                    </button>
                    <button style={styles.actionBtn} onClick={() => navigate("/transactions")}>
                        📋 View Transactions
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f0f4f8" },
    header: {
        backgroundColor: "#1a365d",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: { color: "white", margin: 0 },
    logoutBtn: {
        padding: "8px 16px",
        backgroundColor: "#e53e3e",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    },
    content: { padding: "32px", maxWidth: "600px", margin: "0 auto" },
    welcome: { color: "#1a365d" },
    accountCard: {
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        marginBottom: "24px"
    },
    label: { color: "#718096", margin: "8px 0 4px", fontSize: "14px" },
    value: { color: "#1a365d", margin: 0, fontWeight: "bold", fontSize: "18px" },
    balance: { color: "#276749", margin: 0, fontWeight: "bold", fontSize: "32px" },
    actions: { display: "flex", gap: "16px" },
    actionBtn: {
        flex: 1,
        padding: "16px",
        backgroundColor: "#3182ce",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold"
    },
    error: { color: "#e53e3e" }
};