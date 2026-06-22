import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please enter username and password");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await login({ username, password });
            // API returns token directly as string
            localStorage.setItem("token", res.data);
            localStorage.setItem("username", username);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🏦 Digital Banking</h1>
                <h2 style={styles.subtitle}>Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                    style={styles.button}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p style={styles.registerText}>
    Don't have an account?{" "}
    <span
        style={styles.registerLink}
        onClick={() => navigate("/register")}
    >
        Register here
    </span>
</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f4f8"
    },
    card: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
    },
    title: { textAlign: "center", color: "#1a365d", margin: 0 },
    subtitle: { textAlign: "center", color: "#4a5568", margin: 0 },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        fontSize: "16px",
        outline: "none"
    },
    button: {
        padding: "12px",
        backgroundColor: "#3182ce",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold"
    },
    error: {
        color: "#e53e3e",
        backgroundColor: "#fff5f5",
        padding: "10px",
        borderRadius: "8px",
        textAlign: "center"
    },
    registerText: {
        textAlign: "center",
        color: "#4a5568",
        margin: 0
    },
    registerLink: {
        color: "#38a169",
        cursor: "pointer",
        fontWeight: "bold"
    }
};