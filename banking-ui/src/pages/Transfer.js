import { useState } from "react";
import { transferMoney } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Transfer() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleTransfer = async () => {
        if (!from || !to || !amount) {
            setError("Please fill all fields");
            return;
        }
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const res = await transferMoney({
                fromAccount: Number(from),
                toAccount: Number(to),
                amount: Number(amount)
            }, token);

            if (res.data.status === "SUCCESS") {
                setMessage(`✅ Transfer successful! Transaction ID: ${res.data.transactionId}`);
                setFrom(""); setTo(""); setAmount("");
            } else {
                setError(`❌ Transfer failed: ${res.data.message}`);
            }
        } catch (err) {
            setError("Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🏦 Digital Banking</h1>
                <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
                    ← Back
                </button>
            </div>

            <div style={styles.content}>
                <div style={styles.card}>
                    <h2 style={styles.heading}>💸 Transfer Money</h2>

                    {message && <p style={styles.success}>{message}</p>}
                    {error && <p style={styles.error}>{error}</p>}

                    <label style={styles.label}>From Account ID</label>
                    <input
                        style={styles.input}
                        placeholder="Enter sender account ID"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />

                    <label style={styles.label}>To Account ID</label>
                    <input
                        style={styles.input}
                        placeholder="Enter receiver account ID"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />

                    <label style={styles.label}>Amount (₹)</label>
                    <input
                        style={styles.input}
                        placeholder="Enter amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <button
                        style={styles.button}
                        onClick={handleTransfer}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Send Money"}
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
    backBtn: {
        padding: "8px 16px",
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid white",
        borderRadius: "8px",
        cursor: "pointer"
    },
    content: { padding: "32px", maxWidth: "500px", margin: "0 auto" },
    card: {
        backgroundColor: "white",
        padding: "32px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    heading: { color: "#1a365d", margin: 0 },
    label: { color: "#4a5568", fontSize: "14px", fontWeight: "bold" },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        fontSize: "16px"
    },
    button: {
        padding: "14px",
        backgroundColor: "#3182ce",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold",
        marginTop: "8px"
    },
    success: {
        color: "#276749",
        backgroundColor: "#f0fff4",
        padding: "10px",
        borderRadius: "8px"
    },
    error: {
        color: "#e53e3e",
        backgroundColor: "#fff5f5",
        padding: "10px",
        borderRadius: "8px"
    }
};