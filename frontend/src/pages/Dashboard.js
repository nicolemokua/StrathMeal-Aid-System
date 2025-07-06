import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Typography, Paper, Grid, Avatar } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BookIcon from "@mui/icons-material/Book";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Always fetch the current user's email from localStorage
    const email = localStorage.getItem("studentEmail") || localStorage.getItem("userEmail");
    if (!email) {
      navigate("/login");
      return;
    }

    // Fetch the student profile from the backend
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/user-profile?email=${encodeURIComponent(email)}`
        );
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data.user);
      } catch (err) {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (profile) {
      fetch(`http://localhost:5000/api/vouchers/${profile.studentId}`)
        .then(res => res.json())
        .then(data => setVouchers(data));
    }
  }, [profile]);

  if (!profile) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Loading profile...</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)",
          py: 6,
        }}
      >
        <Box maxWidth="md" mx="auto">
          {/* Welcome Banner */}
          <Paper
            elevation={4}
            sx={{
              mb: 4,
              p: 4,
              borderRadius: 4,
              background:
                "linear-gradient(90deg, #134e4a 0%, #2dd4bf 100%)",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome, {profile.name}!
            </Typography>
          </Paper>

          {/* Profile Summary */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#2dd4bf",
                  width: 56,
                  height: 56,
                  mr: 2,
                }}
              >
                {profile.name[0]}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {profile.name}
                </Typography>
                <Typography sx={{ color: "#1976d2" }}>
                  {profile.email}
                </Typography>
                <Typography sx={{ color: "#134e4a" }}>
                  {profile.course} - Year{" "}
                  {profile.year_of_study || profile.yearOfStudy}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <AccessTimeIcon
                    sx={{ fontSize: 18, color: "#f59e42", mr: 0.5 }}
                  />
                  <Typography sx={{ fontSize: 14, color: "#f59e42" }}>
                    Profile Under Review
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Stats Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                <CreditCardIcon sx={{ fontSize: 40, color: "#16a34a" }} />
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                  {vouchers.length}
                </Typography>
                <Typography sx={{ color: "#666" }}>Active Vouchers</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                  0
                </Typography>
                <Typography sx={{ color: "#666" }}>
                  Vouchers Used This Month
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                }}
              >
                <BookIcon sx={{ fontSize: 40, color: "#a21caf" }} />
                <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                  Shs 0
                </Typography>
                <Typography sx={{ color: "#666" }}>Total Saved</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Empty State */}
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              My Meal Vouchers
            </Typography>
            <Typography sx={{ color: "#666", mb: 3 }}>
              Your meal vouchers will appear here once your profile is approved.
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    mb: 2,
                    background: "#e0f2f1",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <AccessTimeIcon sx={{ color: "#134e4a", mr: 1 }} />
                    <Typography sx={{ fontWeight: 600 }}>
                      Real-time Tracking
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#134e4a" }}>
                    Monitor voucher expiry times and usage history.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    mb: 2,
                    background: "#e0f2f1",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <LocationOnIcon sx={{ color: "#16a34a", mr: 1 }} />
                    <Typography sx={{ fontWeight: 600 }}>
                      Multiple Locations
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#134e4a" }}>
                    Use vouchers at any participating campus cafeteria.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  );
}