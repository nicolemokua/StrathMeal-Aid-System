import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterAdmin() {
  const [form, setForm] = useState({
    adminId: "",
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(form.adminId)) {
      setError("Admin ID must be 6 digits.");
      return;
    }
    // Save to unique key in localStorage
    const uniqueKey = `admin_${form.adminId}`;
    localStorage.setItem(uniqueKey, JSON.stringify(form));
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userCreated", "true");
    localStorage.setItem("adminName", form.name);
    localStorage.setItem("adminEmail", form.email);
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "90vh", background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <Paper elevation={5} sx={{ p: 5, borderRadius: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
              Admin Registration
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Admin ID" name="adminId" fullWidth margin="normal" required value={form.adminId} onChange={handleChange} inputProps={{ maxLength: 6 }} />
              <TextField label="Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
              <TextField label="Email" name="email" type="email" fullWidth margin="normal" required value={form.email} onChange={handleChange} />
              <TextField label="Phone" name="phone" fullWidth margin="normal" required value={form.phone} onChange={handleChange} />
              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
              <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 2, py: 1.5, borderRadius: 2 }}>
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}