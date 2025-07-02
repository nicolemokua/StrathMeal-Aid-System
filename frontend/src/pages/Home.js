import React from "react";
import Navbar from "../components/Navbar";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "60vh",
          background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "#134e4a",
              fontSize: { xs: "2rem", md: "3rem" },
              textShadow: "0 2px 12px rgba(19,78,74,0.08)",
              textAlign: "center",
            }}
          >
            Nourishing Dreams at Strathmore
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "#475569",
              fontWeight: 400,
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            StrathMeal Aid connects university students with nutritious meals in a supportive, judgment-free environment. Focus on your studies, we'll handle the rest.
          </Typography>
          {/* CTA Button */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 8,
                fontWeight: 700,
                px: 5,
                py: 1.5,
                background: "linear-gradient(90deg, #134e4a 0%, #2dd4bf 100%)",
                color: "#fff",
                boxShadow: 3,
                ":hover": { background: "linear-gradient(90deg, #0f766e 0%, #2dd4bf 100%)" },
              }}
              href="/register/student"
            >
              Join StrathMeal Aid
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How We Support Students */}
      <Box sx={{ py: 8, background: "#f8fafc" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              mb: 6,
              color: "#134e4a",
              textShadow: "0 2px 12px rgba(19,78,74,0.08)",
            }}
          >
            How We Support Students
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 24px rgba(19,78,74,0.08)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-8px) scale(1.03)" },
                }}
              >
                <AccessTimeIcon
                  sx={{
                    fontSize: 50,
                    color: "#2dd4bf",
                    mb: 2,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.15)" },
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Quick Access
                </Typography>
                <Typography color="text.secondary">
                  Simple request process to get meal support when you need it most.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 24px rgba(19,78,74,0.08)",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-8px) scale(1.03)" },
                }}
              >
                <GroupIcon
                  sx={{
                    fontSize: 50,
                    color: "#1976d2",
                    mb: 2,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.15)" },
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Community Support
                </Typography>
                <Typography color="text.secondary">
                  Built by students, for students. We understand campus life challenges.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
    </>
  );
}