import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterCafeteria() {
  const [form, setForm] = useState({
    name: "",
    location: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const generateCafeteriaId = () => {
    return 'C' + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Auto-generate cafeteriaId
    const cafeteriaId = generateCafeteriaId();
    // Save to unique key in localStorage
    const uniqueKey = `cafeteria_${cafeteriaId}`;
    localStorage.setItem(uniqueKey, JSON.stringify({ ...form, cafeteriaId }));
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userCreated", "true");
    localStorage.setItem("cafeteriaName", form.name);
    localStorage.setItem("cafeteriaLocation", form.location);
    localStorage.setItem("userType", "cafeteria");
    navigate("/cafeteria");
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