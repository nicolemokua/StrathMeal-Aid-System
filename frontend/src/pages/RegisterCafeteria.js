import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterCafeteria() {
  const [form, setForm] = useState({
    cafeteriaId: "",
    name: "",
    location: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(form.cafeteriaId)) {
      setError("Cafeteria ID must be 6 digits.");
      return;
    }
    // Save to localStorage or send to backend
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userCreated", "true");
    localStorage.setItem("cafeteriaName", form.name);
    localStorage.setItem("cafeteriaLocation", form.location);
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "90vh", background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <Paper elevation={5} sx={{ p: 5, borderRadius: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
              Cafeteria Registration
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Cafeteria ID" name="cafeteriaId" fullWidth margin="normal" required value={form.cafeteriaId} onChange={handleChange} inputProps={{ maxLength: 6 }} />
              <TextField label="Cafeteria Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
              <TextField label="Location" name="location" fullWidth margin="normal" required value={form.location} onChange={handleChange} />
              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
              <Button type="submit" variant="contained" sx={{ background: "#f59e42", color: "#fff", mt: 2, py: 1.5, borderRadius: 2 }}>
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}