import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)",
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
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "#1976d2",
                fontFamily: "'Titillium Web', 'Roboto', Arial, sans-serif",
              }}
            >
              StrathMeal-Aid-System
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: "#565656" }}>
              Empowering students with meal support.<br />
              Register or log in to get started.
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mr: 2, px: 4, borderRadius: 2 }}
            >
              Register
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ px: 4, borderRadius: 2 }}
            >
              Login
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Home;