import React, { useState } from "react";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterDonor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "", 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const generateDonorId = () => {
    return 'D' + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const donorId = generateDonorId();
    const donors = JSON.parse(localStorage.getItem("donors") || "[]");
    donors.push({ ...form, donorId });
    localStorage.setItem("donors", JSON.stringify(donors));
    localStorage.setItem("donorEmail", form.email);
    const uniqueKey = `donor_${donorId}`;
    localStorage.setItem(uniqueKey, JSON.stringify({ ...form, donorId }));
    localStorage.setItem("userType", "donor");
    localStorage.setItem("donorPassword", form.password);
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userCreated", "true");
    localStorage.setItem("donorName", form.name);
    navigate("/login"); 
  };

  return (
    <>
      {/* <Navbar /> */}
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
              <TextField label="Password" name="password" type="password" fullWidth margin="normal" required value={form.password} onChange={handleChange} />
              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
              <Button type="submit" variant="contained" sx={{ background: "#16a34a", color: "#fff", mt: 2, py: 1.5, borderRadius: 2 }}>
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}