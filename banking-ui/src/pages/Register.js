import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !email || !password) {
            setError("Please fill all fields");
            return;
        }
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const res = await register({ username, email, password });
            setMessage("✅ " + res.data);
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🏦 Digital Banking</h1>
                <h2 style={styles.subtitle}>Create Account</h2>

                {message && <p style={styles.success}>{message}</p>}
                {error && <p style={styles.error}>{error}</p>}

                <input
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    style={styles.input}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
                <button
                    style={styles.button}
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p style={styles.loginText}>
                    Already have an account?{" "}
                    <span
                        style={styles.loginLink}
                        onClick={() => navigate("/")}
                    >
                        Login here
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
        backgroundColor: "#38a169",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold"
    },
    success: {
        color: "#276749",
        backgroundColor: "#f0fff4",
        padding: "10px",
        borderRadius: "8px",
        textAlign: "center"
    },
    error: {
        color: "#e53e3e",
        backgroundColor: "#fff5f5",
        padding: "10px",
        borderRadius: "8px",
        textAlign: "center"
    },
    loginText: {
        textAlign: "center",
        color: "#4a5568",
        margin: 0
    },
    loginLink: {
        color: "#3182ce",
        cursor: "pointer",
        fontWeight: "bold"
    }
};