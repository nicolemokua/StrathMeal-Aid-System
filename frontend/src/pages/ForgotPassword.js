import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, TextField, Typography, Paper, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend to send reset email
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(120deg, #fce4ec 0%, #e3f2fd 100%)",
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
              Forgot Password
            </Typography>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Enter your email"
                  name="email"
                  type="email"
                  fullWidth
                  margin="normal"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <Typography sx={{ mt: 2 }} color="success.main">
                If an account with that email exists, a password reset link has been sent.
              </Typography>
            )}
            <Box sx={{ mt: 3 }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="text"
                color="primary"
              >
                Back to Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default ForgotPassword;