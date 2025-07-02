import React, { useState } from "react";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userType", "admin");
      localStorage.setItem("userRole", "admin");
      navigate("/dashboard/admin");
    } catch (err) {
      setError("Network error");
    }
    setIsLoading(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 5, borderRadius: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Admin Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              required
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={form.password}
              onChange={handleChange}
            />
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5, borderRadius: 2 }} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}