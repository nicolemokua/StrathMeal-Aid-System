import React from "react";
import Navbar from "../components/Navbar";
import StudentRegisterForm from "../components/StudentRegisterForm";
import { Container, Paper, Box, Typography } from "@mui/material";

function Register() {
  return (
    <>
      <Navbar />
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
            <StudentRegisterForm />
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Register;