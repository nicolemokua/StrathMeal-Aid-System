import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function StudentRegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    course: "",
    year_of_study: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.status === 201) {
        setMessage("Registration successful!");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Student Registration</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" fullWidth margin="normal" required onChange={handleChange} />
        <TextField label="Email" name="email" type="email" fullWidth margin="normal" required onChange={handleChange} />
        <TextField label="Password" name="password" type="password" fullWidth margin="normal" required onChange={handleChange} />
        <TextField label="Phone" name="phone" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Course" name="course" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Year of Study" name="year_of_study" type="number" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
      </form>
      {message && <Typography sx={{ mt: 2 }} color="primary">{message}</Typography>}
    </Box>
  );
}

export default StudentRegisterForm;