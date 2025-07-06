import React, { useState } from "react";
import { Button, Container, TextField, Typography, Paper, Box, IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      localStorage.setItem("accessToken", data.access_token); // <-- ADD THIS LINE
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
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              value={form.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      disabled={!form.password}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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