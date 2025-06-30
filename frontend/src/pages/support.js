import React from "react";
import Navbar from "../components/Navbar";
import { Box, Typography, Container, Paper, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Support() {
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
          <Paper elevation={5} sx={{ p: 5, borderRadius: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Contact Support
            </Typography>
            <Typography sx={{ mb: 2 }}>
              If you are unable to access your account, please email <b>support@strathmealaid.ac.ke</b> or call <b>+254 712 345 678</b> for assistance.
            </Typography>
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

export default Support;