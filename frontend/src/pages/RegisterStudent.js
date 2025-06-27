import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    year_of_study: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(form.studentId)) {
      setError("Student ID must be 6 digits.");
      return;
    }
    // Save to localStorage or send to backend
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userCreated", "true");
    localStorage.setItem("studentName", form.name);
    localStorage.setItem("studentEmail", form.email);
    localStorage.setItem("studentCourse", form.course);
    localStorage.setItem("studentYear", form.year_of_study);
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "90vh", background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <Paper elevation={5} sx={{ p: 5, borderRadius: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
              Student Registration
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField label="Student ID" name="studentId" fullWidth margin="normal" required value={form.studentId} onChange={handleChange} inputProps={{ maxLength: 6 }} />
              <TextField label="Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
              <TextField label="Email" name="email" type="email" fullWidth margin="normal" required value={form.email} onChange={handleChange} />
              <TextField label="Phone" name="phone" fullWidth margin="normal" required value={form.phone} onChange={handleChange} />
              <TextField label="Course" name="course" fullWidth margin="normal" required value={form.course} onChange={handleChange} />
              <TextField label="Year of Study" name="year_of_study" type="number" fullWidth margin="normal" required value={form.year_of_study} onChange={handleChange} />
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