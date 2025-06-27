import React from "react";
import Navbar from "../components/Navbar";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShieldIcon from "@mui/icons-material/Shield";

export default function Home() {
  // Custom styles for subtle animation and background
  const customStyles = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    .animate-fade-in { animation: fade-in 1s ease-out; }
    .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
    .animate-float { animation: float 6s ease-in-out infinite; }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <Navbar />
      {/* Floating Background Elements */}
      <Box sx={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Box sx={{ position: "absolute", top: -120, right: -120, width: 320, height: 320, bgcolor: "teal.100", opacity: 0.18, borderRadius: "50%", filter: "blur(60px)" }} className="animate-float" />
        <Box sx={{ position: "absolute", top: "30%", left: -100, width: 200, height: 200, bgcolor: "blue.100", opacity: 0.13, borderRadius: "50%", filter: "blur(60px)" }} className="animate-float" />
        <Box sx={{ position: "absolute", bottom: "20%", right: "25%", width: 160, height: 160, bgcolor: "orange.100", opacity: 0.13, borderRadius: "50%", filter: "blur(60px)" }} className="animate-float" />
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)",
          display: "flex",
          alignItems: "center",
          pt: { xs: 10, md: 12 },
          pb: { xs: 6, md: 10 },
          color: "#1a202c",
          position: "relative",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  lineHeight: 1.1,
                  color: "#134e4a",
                  letterSpacing: "-1px",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  textShadow: "0 2px 12px rgba(19,78,74,0.08)",
                }}
                className="animate-fade-in"
              >
                Nourishing Dreams at Strathmore
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  lineHeight: 1.6,
                  color: "#1e293b",
                  fontWeight: 500,
                  fontSize: { xs: "1.1rem", md: "1.35rem" },
                }}
                className="animate-fade-in-up"
              >
                StrathMeal Aid connects university students with nutritious meals in a supportive, judgment-free environment. Focus on your studies, we'll handle the rest.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  mb: 2,
                }}
                className="animate-fade-in-up"
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 8,
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #134e4a 0%, #2dd4bf 100%)",
                    color: "#fff",
                    fontSize: "1.1rem",
                    px: 4,
                    py: 2,
                    boxShadow: 3,
                    ":hover": {
                      background: "linear-gradient(90deg, #0f766e 0%, #2dd4bf 100%)",
                    },
                  }}
                  href="#"
                >
                  Request Meal Support
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 8,
                    fontWeight: 700,
                    color: "#134e4a",
                    borderColor: "#134e4a",
                    fontSize: "1.1rem",
                    px: 4,
                    py: 2,
                    ":hover": {
                      borderColor: "#2dd4bf",
                      color: "#2dd4bf",
                    },
                  }}
                  href="#"
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: "rgba(19,78,74,0.09)",
                  color: "#134e4a",
                  textAlign: "center",
                  minWidth: 260,
                  transition: "0.3s",
                  ":hover": {
                    transform: "scale(1.05)",
                  },
                }}
                className="animate-fade-in-up"
              >
                <Typography variant="h2" sx={{ mb: 1 }}>
                  <FavoriteIcon sx={{ fontSize: 60, color: "#2dd4bf" }} />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1, color: "#134e4a" }}
                >
                  Meal Support
                </Typography>
                <Typography sx={{ color: "#1e293b" }}>
                  Dignified, confidential, and fast.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, background: "#f1f5f9" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
                background: "linear-gradient(135deg, #134e4a 0%, #2dd4bf 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              How We Support Students
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#334155", maxWidth: 600, mx: "auto", fontWeight: 500, fontSize: "1.1rem" }}
            >
              Simple, dignified access to nutritious meals for every student
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  background: "#fff",
                  color: "#134e4a",
                  transition: "0.3s",
                  ":hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
                className="animate-fade-in-up"
              >
                <AccessTimeIcon sx={{ fontSize: 50, color: "#2dd4bf" }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                  Quick Access
                </Typography>
                <Typography sx={{ color: "#334155" }}>
                  Simple request process to get meal support when you need it most. Available during all campus hours with no complicated forms.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  background: "#fff",
                  color: "#134e4a",
                  transition: "0.3s",
                  ":hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
                className="animate-fade-in-up"
              >
                <GroupIcon sx={{ fontSize: 50, color: "#1976d2" }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                  Community Support
                </Typography>
                <Typography sx={{ color: "#334155" }}>
                  Built by students, for students. We understand campus life challenges and provide support with complete confidentiality.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  background: "#fff",
                  color: "#134e4a",
                  transition: "0.3s",
                  ":hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
                className="animate-fade-in-up"
              >
                <ShieldIcon sx={{ fontSize: 50, color: "#f59e42" }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                  Safe & Private
                </Typography>
                <Typography sx={{ color: "#334155" }}>
                  Your privacy is our priority. Discrete pickup locations across campus ensure you get help without judgment or embarrassment.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(90deg, #e0f2f1 0%, #e0e7ef 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2083&q=80"
                alt="University students studying together"
                style={{
                  borderRadius: 24,
                  boxShadow: "0 8px 32px rgba(19,78,74,0.13)",
                  width: "100%",
                  height: 320,
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, mb: 3, color: "#134e4a" }}
              >
                Focus on What Matters
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: "#334155", fontWeight: 500 }}>
                When you don't have to worry about your next meal, you can focus entirely on your education, building relationships, and achieving your academic goals.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 10, background: "#f1f5f9" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, mb: 1, color: "#1976d2" }}
            >
              Ready to Launch
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#334155", maxWidth: 600, mx: "auto", fontWeight: 500 }}
            >
              Join us as we build something meaningful for our campus community
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  background: "#e0f2f1",
                  color: "#134e4a",
                }}
                className="animate-fade-in-up"
              >
                <FavoriteIcon sx={{ fontSize: 40, color: "#2dd4bf" }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                  New
                </Typography>
                <Typography sx={{ color: "#334155" }}>
                  System Launch - Fresh start, proven care
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  background: "#e0e7ef",
                  color: "#134e4a",
                }}
                className="animate-fade-in-up"
              >
                <AccessTimeIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                  24/7
                </Typography>
                <Typography sx={{ color: "#334155" }}>
                  Support Available - Help when you need it
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  background: "#fff3e0",
                  color: "#134e4a",
                }}
                className="animate-fade-in-up"
              >
                <ShieldIcon sx={{ fontSize: 40, color: "#f59e42" }} />
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                  100%
                </Typography>
                <Typography sx={{ color: "#334155" }}>
                  Confidential - Your privacy protected
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(90deg, #134e4a 0%, #2dd4bf 100%)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: "-1px" }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, fontWeight: 500 }}>
            Join our community of students supporting students. No judgment, just help when you need it most.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 8,
              fontWeight: 700,
              background: "#fff",
              color: "#134e4a",
              px: 6,
              py: 2,
              boxShadow: 3,
              fontSize: "1.1rem",
              ":hover": { background: "#e0f2f1" },
            }}
            href="#"
          >
            Get Meal Support Now
          </Button>
        </Container>
      </Box>
    </>
  );
}