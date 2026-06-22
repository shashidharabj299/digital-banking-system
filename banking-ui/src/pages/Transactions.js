import { useEffect, useState } from "react";
import { getTransactions, getAccountByUserId } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
    const [txns, setTxns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const accountRes = await getAccountByUserId(username, token);
                const accountId = accountRes.data.id;
                const txnRes = await getTransactions(accountId, token);
                setTxns(txnRes.data);
            } catch (err) {
                setError("Could not load transactions");
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🏦 Digital Banking</h1>
                <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
                    ← Back
                </button>
            </div>

            <div style={styles.content}>
                <h2 style={styles.heading}>📋 Transaction History</h2>

                {error && <p style={styles.error}>{error}</p>}
                {loading && <p>Loading transactions...</p>}

                {txns.length === 0 && !loading && (
                    <p style={styles.empty}>No transactions found.</p>
                )}

                {txns.map((t) => (
                    <div key={t.id} style={styles.txnCard}>
                        <div style={styles.txnRow}>
                            <span style={styles.txnId}>#{t.id}</span>
                            <span style={{
                                ...styles.status,
                                color: t.status === "SUCCESS" ? "#276749" : "#e53e3e",
                                backgroundColor: t.status === "SUCCESS" ? "#f0fff4" : "#fff5f5"
                            }}>
                                {t.status}
                            </span>
                        </div>
                        <div style={styles.txnRow}>
                            <div>
                                <p style={styles.label}>From → To</p>
                                <p style={styles.value}>Account {t.fromAccount} → Account {t.toAccount}</p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <p style={styles.label}>Amount</p>
                                <p style={styles.amount}>₹{t.amount.toLocaleString()}</p>
                            </div>
                        </div>
                        <p style={styles.timestamp}>
                            {new Date(t.timestamp).toLocaleString()}
                        </p>
                    </div>
                ))}
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
    backBtn: {
        padding: "8px 16px",
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid white",
        borderRadius: "8px",
        cursor: "pointer"
    },
    content: { padding: "32px", maxWidth: "600px", margin: "0 auto" },
    heading: { color: "#1a365d" },
    txnCard: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        marginBottom: "16px"
    },
    txnRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px"
    },
    txnId: { fontWeight: "bold", color: "#4a5568" },
    status: {
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "bold"
    },
    label: { color: "#718096", fontSize: "12px", margin: "0 0 4px" },
    value: { color: "#1a365d", fontWeight: "bold", margin: 0 },
    amount: { color: "#276749", fontWeight: "bold", fontSize: "20px", margin: 0 },
    timestamp: { color: "#a0aec0", fontSize: "12px", margin: "8px 0 0" },
    error: { color: "#e53e3e" },
    empty: { color: "#718096", textAlign: "center", padding: "40px" }
};