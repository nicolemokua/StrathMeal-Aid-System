import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    year_of_study: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const currentYear = new Date().getFullYear();
  const minYear = 2025;

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email)) return "Invalid email.";
    if (!/^0[17]\d{8}$/.test(form.phone)) return "Phone must be a valid Kenyan number.";
    if (!form.course.trim()) return "Course is required.";
    if (
      !/^\d{4}$/.test(form.year_of_study) ||
      parseInt(form.year_of_study) < minYear ||
      parseInt(form.year_of_study) > currentYear + 10 // allow up to 10 years ahead
    ) return `Year of study must be a 4-digit year from ${minYear} onwards.`;
    return "";
  };

  const generateStudentId = () => {
    return 'S' + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    // Auto-generate studentId
    const studentId = generateStudentId();
    const uniqueKey = `student_${studentId}`;
    localStorage.setItem(uniqueKey, JSON.stringify({
      ...form,
      studentId,
      status: "pending",
      registration_date: new Date().toISOString(),
      fee_balance: 0,
      parent_guardian_unemployed: false,
      has_siblings: false,
      has_scholarship: false,
      referral_letter: false,
    }));
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userCreated", "true");
    localStorage.setItem("studentName", form.name);
    localStorage.setItem("userType", "student");
    navigate("/student");
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
              <TextField label="Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
              <TextField label="Email" name="email" type="email" fullWidth margin="normal" required value={form.email} onChange={handleChange} />
              <TextField label="Phone" name="phone" fullWidth margin="normal" required value={form.phone} onChange={handleChange} />
              <TextField label="Course" name="course" fullWidth margin="normal" required value={form.course} onChange={handleChange} />
              <TextField
                label="Year of Study"
                name="year_of_study"
                type="number"
                fullWidth
                margin="normal"
                required
                value={form.year_of_study}
                onChange={handleChange}
                inputProps={{ min: minYear, max: currentYear + 10 }}
              />
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