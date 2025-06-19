import React from "react";
import Navbar from "../components/Navbar";
import { Box, Typography, Paper, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #fce4ec 0%, #e3f2fd 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: 4,
              textAlign: "center",
              background: "rgba(255,255,255,0.97)",
            }}
          >
            <Typography
              variant="h2"
              color="error"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontFamily: "'Titillium Web', 'Roboto', Arial, sans-serif",
              }}
            >
              404
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Page Not Found
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, px: 4 }}
            >
              Go Home
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default NotFound;