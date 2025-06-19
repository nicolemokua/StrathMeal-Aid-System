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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to Flask backend
    alert("Registration submitted!");
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
    </Box>
  );
}

export default StudentRegisterForm;