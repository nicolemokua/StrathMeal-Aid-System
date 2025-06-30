import React from "react";
import Navbar from "../components/Navbar";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShieldIcon from "@mui/icons-material/Shield";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section with animated background */}
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #e0f2f1 0%, #f0f9ff 100%)",
          display: "flex",
          alignItems: "center",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated floating circles */}
        <Box
          sx={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 180,
            height: 180,
            bgcolor: "#2dd4bf",
            opacity: 0.13,
            borderRadius: "50%",
            filter: "blur(30px)",
            zIndex: 0,
            animation: "float1 8s ease-in-out infinite",
            "@keyframes float1": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(40px)" },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 220,
            height: 220,
            bgcolor: "#1976d2",
            opacity: 0.10,
            borderRadius: "50%",
            filter: "blur(40px)",
            zIndex: 0,
            animation: "float2 10s ease-in-out infinite",
            "@keyframes float2": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-30px)" },
            },
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            sx={{
              animation: "fadeIn 1.2s",
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(40px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "#134e4a",
                  fontSize: { xs: "2rem", md: "3rem" },
                  textShadow: "0 2px 12px rgba(19,78,74,0.08)",
                  animation: "fadeInLeft 1.5s",
                  "@keyframes fadeInLeft": {
                    from: { opacity: 0, transform: "translateX(-40px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                  },
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
                  animation: "fadeInLeft 1.8s",
                  "@keyframes fadeInLeft": {
                    from: { opacity: 0, transform: "translateX(-40px)" },
                    to: { opacity: 1, transform: "translateX(0)" },
                  },
                }}
              >
                StrathMeal Aid connects university students with nutritious meals
                in a supportive, judgment-free environment. Focus on your studies,
                we'll handle the rest.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: "white",
                  maxWidth: 320,
                  mx: "auto",
                  boxShadow: "0 8px 32px rgba(19,78,74,0.13)",
                  border: "3px solid",
                  borderImage: "linear-gradient(90deg, #2dd4bf 0%, #1976d2 100%) 1",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 36px rgba(19,78,74,0.18)",
                  },
                  animation: "fadeInUp 1.5s",
                  "@keyframes fadeInUp": {
                    from: { opacity: 0, transform: "translateY(40px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <FavoriteIcon
                  sx={{
                    fontSize: 60,
                    color: "#2dd4bf",
                    mb: 2,
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.12)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#134e4a" }}>
                  Meal Support
                </Typography>
                <Typography color="text.secondary">
                  Dignified, confidential, and fast.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: "#f8fafc",
          animation: "fadeIn 1.5s",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(40px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
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
                <ShieldIcon
                  sx={{
                    fontSize: 50,
                    color: "#f59e0b",
                    mb: 2,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.15)" },
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Safe & Private
                </Typography>
                <Typography color="text.secondary">
                  Your privacy is our priority. Discrete pickup locations across campus.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: "white",
          animation: "fadeIn 2s",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(40px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={12}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "#134e4a",
                  textAlign: "center",
                  textShadow: "0 2px 12px rgba(19,78,74,0.08)",
                }}
              >
                Focus on What Matters
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "#475569",
                  lineHeight: 1.7,
                  textAlign: "center",
                  fontSize: "1.15rem",
                  animation: "fadeIn 2.2s",
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(40px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                When you don't have to worry about your next meal, you can focus
                entirely on your education, building relationships, and achieving
                your academic goals.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: 8,
          bgcolor: "#134e4a",
          color: "white",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(19,78,74,0.13)",
          background: "linear-gradient(90deg, #134e4a 0%, #2dd4bf 100%)",
          animation: "fadeInUp 2.2s",
          "@keyframes fadeInUp": {
            from: { opacity: 0, transform: "translateY(40px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join our community of students supporting students.
            No judgment, just help when you need it most.
          </Typography>
        </Container>
      </Box>
    </>
  );
}