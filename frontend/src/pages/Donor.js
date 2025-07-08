import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  TextField,
  Container,
  Alert,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber"; // Install framer-motion if not already: npm install framer-motion

export default function Donor() {
  const donorName = localStorage.getItem("donorName") || "Donor";
  const [donationAmount, setDonationAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: donorName,
    phone: localStorage.getItem("donorPhone") || "",
    email: localStorage.getItem("donorEmail") || "",
    age: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const donorId = localStorage.getItem("donorToken");
  const [totalDonations, setTotalDonations] = useState(0);

  // Fetch total donations for this donor from backend on mount
  useEffect(() => {
    async function fetchTotal() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/donations/total?donor_id=${donorId}`
        );
        const data = await res.json();
        if (res.ok && typeof data.total === "number") {
          setTotalDonations(data.total);
        }
      } catch (err) {
        setTotalDonations(0);
      }
    }
    if (donorId) fetchTotal();
  }, [donorId]);

  const handleDonation = (e) => {
    e.preventDefault();
    setError("");
    const age = parseInt(donorInfo.age, 10);
    const amount = parseInt(donationAmount, 10);

    if (!age || age < 18) {
      setError("You must be at least 18 years old to donate.");
      return;
    }
    if (isNaN(amount) || amount < (age <= 30 ? 50 : 150)) {
      setError(
        age <= 30
          ? "Minimum donation for ages 18-30 is Kshs. 50."
          : "Minimum donation for ages 31+ is Kshs. 150."
      );
      return;
    }
    if (!donorInfo.name || !donorInfo.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setDonationAmount("");
    }, 3000);
  };

  // Only render the donor dashboard if the user is a donor
  if (!localStorage.getItem("donorToken")) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#333", textAlign: "center" }}
        >
          Access denied. This page is for donors only.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "#e11d48", width: 48, height: 48 }}>
                <FavoriteIcon sx={{ color: "#fff" }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Welcome, {donorInfo.name}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Only Total Donations Stat */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography sx={{ color: "#666", fontSize: 14 }}>
                    Total Donations
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    KSh {totalDonations.toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "inline-block",
                    transition: "transform 0.15s cubic-bezier(.4,2,.6,1)",
                    cursor: "pointer",
                    "&:hover, &:active": {
                      transform: "scale(1.15) rotate(8deg)",
                    },
                  }}
                >
                  <AttachMoneyIcon sx={{ color: "#16a34a", fontSize: 40 }} />
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            {/* Donation Form */}
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FavoriteIcon sx={{ color: "#e11d48" }} /> Make a Donation
                </Typography>
                {/* Removed voucher breakdown and suggested donations */}
                {showSuccess && (
                  <Alert
                    icon={<CheckCircleIcon fontSize="inherit" />}
                    severity="success"
                    sx={{ mb: 2 }}
                  >
                    Thank you! Your donation has been processed successfully.
                  </Alert>
                )}
                <form onSubmit={handleDonation}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Your Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Full Name"
                          value={donorInfo.name}
                          onChange={(e) =>
                            setDonorInfo({ ...donorInfo, name: e.target.value })
                          }
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: (
                              <PersonIcon sx={{ mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Phone Number (M-Pesa)"
                          value={donorInfo.phone}
                          onChange={(e) =>
                            setDonorInfo({ ...donorInfo, phone: e.target.value })
                          }
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: (
                              <PhoneIcon sx={{ mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Email (Optional)"
                          value={donorInfo.email}
                          onChange={(e) =>
                            setDonorInfo({ ...donorInfo, email: e.target.value })
                          }
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <EmailIcon sx={{ mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Age"
                          type="number"
                          value={donorInfo.age}
                          onChange={(e) =>
                            setDonorInfo({ ...donorInfo, age: e.target.value })
                          }
                          fullWidth
                          required
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Donation Amount
                    </Typography>
                    <TextField
                      label="Amount (KSh)"
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      fullWidth
                      required
                      sx={{ mt: 1 }}
                      inputProps={{ min: 1 }}
                    />
                    {error && (
                      <Typography color="error" sx={{ mt: 1 }}>
                        {error}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: 16,
                      borderRadius: 2,
                    }}
                  >
                    Donate Now via M-Pesa
                  </Button>
                </form>
              </Paper>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* REMOVE the "Your Impact" section below */}
                {/* 
                <Paper sx={{ p: 3, borderRadius: 3, background: "linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)" }}>
                  <Typography sx={{ fontWeight: 700, color: "#16a34a", mb: 1 }}>Your Impact</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>KSh 300</Typography>
                    <Typography>= 1 meal voucher</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>KSh 1,500</Typography>
                    <Typography>= 5 meals</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>KSh 9,000</Typography>
                    <Typography>= 1 month of meals</Typography>
                  </Box>
                </Paper>
                */}
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Typography sx={{ fontWeight: 700, mb: 2 }}>How It Works</Typography>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#e0e7ef", color: "#1976d2", fontWeight: 700 }}>1</Avatar>
                    <Typography sx={{ color: "#666" }}>You make a donation via M-Pesa</Typography>
                  </Box>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#e0e7ef", color: "#1976d2", fontWeight: 700 }}>2</Avatar>
                    <Typography sx={{ color: "#666" }}>Funds go to the meal kitty</Typography>
                  </Box>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#e0e7ef", color: "#1976d2", fontWeight: 700 }}>3</Avatar>
                    <Typography sx={{ color: "#666" }}>Vouchers are generated for students</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#e0e7ef", color: "#1976d2", fontWeight: 700 }}>4</Avatar>
                    <Typography sx={{ color: "#666" }}>Students get nutritious meals</Typography>
                  </Box>
                </Paper>
                <Paper sx={{ p: 2, borderRadius: 3, background: "#fffbe6", border: "1px solid #ffe082" }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                    <WarningAmberIcon sx={{ color: "#f59e42", mt: "2px" }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: "#f59e42" }}>New System</Typography>
                      <Typography sx={{ color: "#b45309", fontSize: 14 }}>
                        This is a new system. Once students register and get approved, your donations will start making an impact!
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}