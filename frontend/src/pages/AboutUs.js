import React from "react";
import Navbar from "../components/Navbar";
import { Box, Typography, Container, Paper } from "@mui/material";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 6 },
              borderRadius: 6,
              textAlign: "center",
              background: "rgba(255,255,255,0.97)",
              boxShadow: "0 8px 32px rgba(19,78,74,0.13)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative floating circles */}
            <Box sx={{
              position: "absolute", top: -40, left: -40, width: 120, height: 120,
              bgcolor: "teal.100", opacity: 0.18, borderRadius: "50%", filter: "blur(30px)", zIndex: 0
            }} />
            <Box sx={{
              position: "absolute", bottom: -40, right: -40, width: 140, height: 140,
              bgcolor: "blue.100", opacity: 0.13, borderRadius: "50%", filter: "blur(30px)", zIndex: 0
            }} />

            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  color: "#134e4a",
                  letterSpacing: "-1px",
                  textShadow: "0 2px 12px rgba(19,78,74,0.08)",
                }}
              >
                About StrathMeal Aid System
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: "#1976d2",
                  fontWeight: 600,
                  fontSize: { xs: "1.1rem", md: "1.35rem" },
                }}
              >
                Empowering Students. Nourishing Dreams.
              </Typography>
              <Typography
                sx={{
                  color: "#1e293b",
                  fontSize: "1.15rem",
                  mb: 3,
                  lineHeight: 1.7,
                  fontWeight: 500,
                }}
              >
                StrathMeal Aid is a comprehensive meal assistance platform designed for Strathmore University students. 
                Our mission is to ensure that no student has to choose between their education and a nutritious meal.
                <br /><br />
                <b>Key Features:</b>
                <ul style={{ textAlign: "left", margin: "16px auto 24px", maxWidth: 600, color: "#134e4a", fontWeight: 500 }}>
                  <li>Confidential, stigma-free meal support for all students in need.</li>
                  <li>Easy online requests and fast voucher distribution.</li>
                  <li>Multiple campus pickup points for convenience and privacy.</li>
                  <li>Community-driven: built by students, for students.</li>
                  <li>Secure, transparent, and always respectful of your dignity.</li>
                </ul>
                <span style={{ color: "#1976d2", fontWeight: 600 }}>
                  Together, we are building a stronger, healthier, and more supportive campus community.
                </span>
              </Typography>
              {/* The Join StrathMeal Aid button has been removed */}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}