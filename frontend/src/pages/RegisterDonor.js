import React, { useState } from "react";
import { Button, Container, TextField, Typography, Paper, Box, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function RegisterDonor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
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
      const res = await fetch("http://localhost:5000/api/register-donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        setIsLoading(false);
        return;
      }
      // Optionally, show a success message or redirect to login
      navigate("/login");
    } catch (err) {
      setError("Network error");
    }
    setIsLoading(false);
  };

  return (
    <Box sx={{ minHeight: "90vh", background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 5, borderRadius: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
            Donor Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
            <TextField label="Email" name="email" type="email" fullWidth margin="normal" required value={form.email} onChange={handleChange} />
            <TextField label="Phone" name="phone" fullWidth margin="normal" required value={form.phone} onChange={handleChange} />
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
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            <Button type="submit" variant="contained" sx={{ background: "#16a34a", color: "#fff", mt: 2, py: 1.5, borderRadius: 2 }} disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}