import React, { useState } from "react";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    course: "",
    year_of_study: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed");
        return;
      }
      localStorage.setItem("userLoggedIn", "true");
      navigate("/login"); 
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={5}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: 4,
              textAlign: "center",
              background: "rgba(255,255,255,0.97)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#1976d2",
                fontFamily: "'Titillium Web', 'Roboto', Arial, sans-serif",
              }}
            >
              Student Registration
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
              <TextField label="Email" name="email" type="email" fullWidth margin="normal" required value={form.email} onChange={handleChange} />
              <TextField label="Password" name="password" type="password" fullWidth margin="normal" required value={form.password} onChange={handleChange} />
              <TextField label="Phone" name="phone" fullWidth margin="normal" value={form.phone} onChange={handleChange} />
              <TextField label="Course" name="course" fullWidth margin="normal" value={form.course} onChange={handleChange} />
              <TextField label="Year of Study" name="year_of_study" type="number" fullWidth margin="normal" value={form.year_of_study} onChange={handleChange} />
              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5, borderRadius: 2 }}>
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Register;