import React, { useState } from "react"; // removed useEffect
import Navbar from "../components/Navbar";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  IconButton,
  InputAdornment,
  Container,
  Grid,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Edit as EditIcon, Save as SaveIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function CashierProfileSection() {
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: localStorage.getItem("cashierName") || "",
    email: localStorage.getItem("cashierEmail") || "",
    password: localStorage.getItem("cashierPassword") || "",
    id: localStorage.getItem("cashierId") || "",
  });

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = () => {
    setEditMode(false);
    localStorage.setItem("cashierName", profile.name);
    localStorage.setItem("cashierEmail", profile.email);
    localStorage.setItem("cashierPassword", profile.password);

    // Also update in the cafeteria object in localStorage
    const cafeteriaId = localStorage.getItem("cafeteriaId");
    const cafeteriaKey = `cafeteria_${cafeteriaId}`;
    const cafeteriaObj = JSON.parse(localStorage.getItem(cafeteriaKey));
    if (cafeteriaObj) {
      cafeteriaObj.cashierName = profile.name;
      cafeteriaObj.cashierEmail = profile.email;
      cafeteriaObj.cashierPassword = profile.password;
      localStorage.setItem(cafeteriaKey, JSON.stringify(cafeteriaObj));
    }
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 4, mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Cashier Profile
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
        <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
          {profile.name ? profile.name[0].toUpperCase() : "C"}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode}
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={profile.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!editMode}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Cashier ID is not shown */}
        </Box>
        <Box>
          {editMode ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ mb: 2 }}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
              sx={{ mb: 2 }}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default function Cafeteria() {
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const formatCurrency = (amount) => `KSh ${amount.toLocaleString()}`;

  const StatCard = ({
    title,
    value,
    icon,
    color = "#e0e7ef",
    gradient = false,
  }) => (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        background: gradient
          ? "linear-gradient(135deg, #e0e7ef 0%, #f8fafc 100%)"
          : "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        transition: "transform 0.15s cubic-bezier(.4,2,.6,1), box-shadow 0.15s",
        cursor: "pointer",
        "&:hover, &:active": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
        userSelect: "none",
      }}
    >
      <Avatar
        sx={{
          bgcolor: color,
          width: 64,
          height: 64,
          mx: "auto",
          mb: 2,
        }}
      >
        {icon}
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ color: "#666", mb: 2 }}>{value}</Typography>
    </Paper>
  );

  const scanVoucher = async () => {
    if (!scanInput.trim()) {
      setScanResult({ type: "error", message: "Please enter a voucher ID to scan" });
      return;
    }
    const res = await fetch("http://localhost:5000/api/vouchers/use", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: scanInput }),
    });
    const data = await res.json();
    if (res.ok) {
      setScanResult({ type: "success", message: "Voucher redeemed successfully!" });
    } else {
      setScanResult({ type: "error", message: data.message || "Invalid voucher." });
    }
  };

  // Get cashier name for header
  const cashierName = localStorage.getItem("cashierName") || "Cashier";

  // Only render the cafeteria dashboard if the user is a cashier
  if (!localStorage.getItem("userType") || localStorage.getItem("userType") !== "cashier") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
          py: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Access Denied
        </Typography>
        <Typography sx={{ color: "#666", mb: 4, textAlign: "center" }}>
          This dashboard is restricted to registered cashiers only. Please log in as a cashier to access this dashboard.
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
          background:
            "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Paper sx={{ p: 4, mb: 4, borderRadius: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Welcome, {cashierName}
            </Typography>
            {/* No cafeteria ID or list shown */}
          </Paper>

          {/* Stats Grid */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={3}>
              <StatCard
                title="Total Transactions"
                value="0"
                icon={
                  <BarChartIcon sx={{ fontSize: 48, color: "#16a34a", filter: "drop-shadow(0 2px 6px #16a34a44)" }} />
                }
                color="#e8f5e9" // light green background
                gradient
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                title="Active Vouchers"
                value="0"
                icon={
                  <CreditCardIcon sx={{ fontSize: 48, color: "#1976d2", filter: "drop-shadow(0 2px 6px #1976d244)" }} />
                }
                color="#e3f2fd" // light blue background
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                title="Today's Revenue"
                value={formatCurrency(0)}
                icon={
                  <TrendingUpIcon sx={{ fontSize: 48, color: "#a21caf", filter: "drop-shadow(0 2px 6px #a21caf44)" }} />
                }
                color="#f3e8fd" // light purple background
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                title="Students Served"
                value="0"
                icon={
                  <PeopleIcon sx={{ fontSize: 48, color: "#f59e42", filter: "drop-shadow(0 2px 6px #f59e4244)" }} />
                }
                color="#fff7ed" // light orange background
              />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            {/* Voucher Scanner */}
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 4, borderRadius: 4, mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#e0f2f1" }}>
                    <SearchIcon sx={{ color: "#1976d2" }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Voucher Scanner
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField
                    label="Enter or Scan Voucher ID"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    fullWidth
                    onKeyPress={(e) => e.key === "Enter" && scanVoucher()}
                  />
                  <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={scanVoucher}
                    sx={{ bgcolor: "#1976d2" }}
                  >
                    Scan
                  </Button>
                </Box>
                {scanResult && (
                  <Paper
                    sx={{
                      p: 2,
                      mt: 2,
                      background:
                        scanResult.type === "success"
                          ? "#e8f5e9"
                          : scanResult.type === "error"
                          ? "#ffebee"
                          : "#e3f2fd",
                      borderLeft: `6px solid ${
                        scanResult.type === "success"
                          ? "#16a34a"
                          : scanResult.type === "error"
                          ? "#f44336"
                          : "#1976d2"
                      }`,
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          scanResult.type === "success"
                            ? "#16a34a"
                            : scanResult.type === "error"
                            ? "#f44336"
                            : "#1976d2",
                        fontWeight: 600,
                      }}
                    >
                      {scanResult.message}
                    </Typography>
                  </Paper>
                )}

                {/* New System Message */}
                <Paper
                  sx={{
                    p: 3,
                    mt: 4,
                    background: "#e0f2f1",
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                      <SettingsIcon />
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{ fontWeight: 600, color: "#1976d2" }}
                      >
                        Welcome to Your New Cafeteria System!
                      </Typography>
                      <Typography sx={{ color: "#1976d2", fontSize: 14 }}>
                        This is a fresh installation with no existing data. Once
                        you start allocating vouchers to students and processing
                        transactions, this dashboard will come alive with real-time
                        analytics and insights.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Quick Actions */}
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: "#16a34a",
                        color: "#fff",
                        py: 2,
                        borderRadius: 2,
                      }}
                    >
                      Issue Vouchers
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: "#a21caf",
                        color: "#fff",
                        py: 2,
                        borderRadius: 2,
                      }}
                    >
                      View Reports
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* System Overview */}
            <Grid item xs={12} lg={4}>
              <Paper sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  System Overview
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>
                    Today's Activity
                  </Typography>
                  {/* ... */}
                </Box>
                <Box sx={{ borderTop: "1px solid #e0e7ef", pt: 3 }}>
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>Quick Stats</Typography>
                  <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "#666" }}>Peak Hours</Typography>
                    <Typography sx={{ color: "#222" }}>12:00 - 14:00</Typography>
                  </Box>
                  <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "#666" }}>Avg. Meal Cost</Typography>
                    <Typography sx={{ color: "#222" }}>{formatCurrency(300)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "#666" }}>System Uptime</Typography>
                    <Typography sx={{ color: "#16a34a" }}>100%</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Voucher Status Overview */}
          <Paper sx={{ mt: 6, borderRadius: 4 }}>
            <Box
              sx={{
                background: "#f8fafc",
                p: 3,
                borderBottom: "1px solid #e0e7ef",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Voucher Management
              </Typography>
              <Typography sx={{ color: "#666" }}>
                Monitor and manage all allocated vouchers
              </Typography>
            </Box>
            <Box sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "#e8f5e9",
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <CheckCircleIcon sx={{ color: "#16a34a", fontSize: 36 }} />
                    </Avatar>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#16a34a",
                        fontSize: 18,
                      }}
                    >
                      Active Vouchers
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#16a34a",
                        fontSize: 32,
                      }}
                    >
                      0
                    </Typography>
                    <Typography sx={{ color: "#666" }}>Ready to be used</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "#e3f2fd",
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <CreditCardIcon sx={{ color: "#1976d2", fontSize: 36 }} />
                    </Avatar>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#1976d2",
                        fontSize: 18,
                      }}
                    >
                      Used Vouchers
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#1976d2",
                        fontSize: 32,
                      }}
                    >
                      0
                    </Typography>
                    <Typography sx={{ color: "#666" }}>Successfully redeemed</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        bgcolor: "#ffebee",
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <CancelIcon sx={{ color: "#f44336", fontSize: 36 }} />
                    </Avatar>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#f44336",
                        fontSize: 18,
                      }}
                    >
                      Expired Vouchers
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#f44336",
                        fontSize: 32,
                      }}
                    >
                      0
                    </Typography>
                    <Typography sx={{ color: "#666" }}>Past expiry date</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography sx={{ color: "#888", mb: 2 }}>
                  No vouchers have been allocated yet
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#1976d2",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                  }}
                >
                  Allocate First Vouchers
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Cashier Profile Section */}
          <CashierProfileSection />

        </Container>
      </Box>
    </>
  );
}