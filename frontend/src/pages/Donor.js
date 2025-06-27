import React, { useState } from "react";
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
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function Donor() {
  const donorName = localStorage.getItem("donorName") || "Donor";
  const [donationAmount, setDonationAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: donorName,
    phone: localStorage.getItem("donorPhone") || "",
    email: localStorage.getItem("donorEmail") || "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDonation = (e) => {
    e.preventDefault();
    if (donationAmount && donorInfo.name && donorInfo.phone) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setDonationAmount("");
      }, 3000);
    }
  };

  const quickAmounts = [500, 1000, 2500, 5000];

  const stats = [
    { icon: <PeopleIcon color="primary" />, label: "Students Helped", value: "0" },
    { icon: <AttachMoneyIcon sx={{ color: "#16a34a" }} />, label: "Total Donations", value: "KSh 0" },
    { icon: <FavoriteIcon sx={{ color: "#e11d48" }} />, label: "Meals Funded", value: "0" },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)", py: 4 }}>
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
                <Typography sx={{ color: "#666" }}>
                  Help feed hungry students with your donations
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Stats */}
          <Grid container spacing={3} mb={4}>
            {stats.map((stat, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Paper sx={{ p: 3, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography sx={{ color: "#666", fontSize: 14 }}>{stat.label}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: "#f1f5f9", width: 40, height: 40 }}>{stat.icon}</Avatar>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            {/* Donation Form */}
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <FavoriteIcon sx={{ color: "#e11d48" }} /> Make a Donation
                </Typography>
                <Typography sx={{ color: "#666", mb: 2 }}>
                  Every KSh 300 provides one meal voucher to a student
                </Typography>
                {showSuccess && (
                  <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
                    Thank you! Your donation has been processed successfully.
                  </Alert>
                )}
                <form onSubmit={handleDonation}>
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 600, mb: 1 }}>Your Information</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Full Name"
                          value={donorInfo.name}
                          onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                          fullWidth
                          required
                          InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Phone Number (M-Pesa)"
                          value={donorInfo.phone}
                          onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                          fullWidth
                          required
                          InputProps={{ startAdornment: <PhoneIcon sx={{ mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Email (Optional)"
                          value={donorInfo.email}
                          onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                          fullWidth
                          InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1 }} /> }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontWeight: 600, mb: 1 }}>Donation Amount</Typography>
                    <Grid container spacing={2} mb={1}>
                      {quickAmounts.map((amount) => (
                        <Grid item xs={6} md={3} key={amount}>
                          <Button
                            variant={donationAmount === amount.toString() ? "contained" : "outlined"}
                            color="primary"
                            fullWidth
                            onClick={() => setDonationAmount(amount.toString())}
                          >
                            KSh {amount.toLocaleString()}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                    <TextField
                      label="Custom Amount (KSh)"
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      fullWidth
                      required
                      sx={{ mt: 1 }}
                    />
                    {donationAmount && (
                      <Typography sx={{ mt: 1, color: "#1976d2", fontSize: 14 }}>
                        This will fund approximately <b>{Math.floor(parseInt(donationAmount) / 300)}</b> meal vouchers
                      </Typography>
                    )}
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ py: 1.5, fontWeight: 700, fontSize: 16, borderRadius: 2 }}
                  >
                    Donate Now via M-Pesa
                  </Button>
                </form>
              </Paper>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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