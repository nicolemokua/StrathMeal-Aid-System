import React from "react";
import Navbar from "../components/Navbar";
import { Button, Container, Typography, Paper, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ForgotPassword() {
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
              Page Not Found
            </Typography>
            <Typography sx={{ mt: 2 }} color="text.secondary">
              Sorry, the page you are looking for does not exist.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2 }}
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