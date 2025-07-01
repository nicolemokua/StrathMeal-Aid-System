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
} from "@mui/material";
import CoffeeIcon from "@mui/icons-material/LocalCafe";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Cafeteria() {
  // Fetch cafeterias from localStorage
  const [cafeterias, setCafeterias] = useState([]);

  useEffect(() => {
    // Get all keys that start with 'cafeteria_'
    const cafeteriaKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith("cafeteria_")
    );
    const cafeteriaList = cafeteriaKeys.map((k) =>
      JSON.parse(localStorage.getItem(k))
    );
    setCafeterias(cafeteriaList);
  }, []);

  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState(null);

  const formatCurrency = (amount) => `KSh ${amount.toLocaleString()}`;

  const StatCard = ({
    title,
    value,
    icon,
    color = "#1976d2",
    gradient = false,
  }) => (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        background: gradient
          ? "linear-gradient(135deg, #1976d2 0%, #2dd4bf 100%)"
          : "#fff",
        color: gradient ? "#fff" : "#222",
        boxShadow: 3,
      }}
    >
      <Avatar
        sx={{
          bgcolor: gradient ? "rgba(255,255,255,0.15)" : color,
          width: 48,
          height: 48,
          mx: "auto",
          mb: 1,
        }}
      >
        {icon}
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography sx={{ color: gradient ? "#e0f2f1" : "#666" }}>
        {title}
      </Typography>
    </Paper>
  );

  const EmptyState = ({ icon, title, description, actionText }) => (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Avatar
        sx={{
          bgcolor: "#e0e7ef",
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
      <Typography sx={{ color: "#666", mb: 2 }}>{description}</Typography>
      {actionText && (
        <Button variant="contained" sx={{ bgcolor: "#1976d2" }}>
          {actionText}
        </Button>
      )}
    </Box>
  );

  const scanVoucher = () => {
    if (!scanInput.trim()) {
      setScanResult({
        type: "error",
        message: "Please enter a voucher ID to scan",
      });
      return;
    }
    setScanResult({
      type: "info",
      message:
        "No vouchers in system yet. Start by allocating vouchers to students.",
    });
  };

  // Only render the cafeteria dashboard if the user is a cafeteria
  if (cafeterias.length === 0) {
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
          This dashboard is restricted to registered cafeterias only. If you are
          a cafeteria owner, please register your cafeteria to access this
          dashboard.
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "#1976d2", px: 4, py: 1.5, borderRadius: 2 }}
          onClick={() => window.location.href = '/register'}
        >
          Register Cafeteria
        </Button>
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
              Registered Cafeterias
            </Typography>
            {cafeterias.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Avatar
                  sx={{
                    bgcolor: "#e0e7ef",
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <CoffeeIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  No Cafeterias Registered
                </Typography>
                <Typography sx={{ color: "#666", mb: 2 }}>
                  Cafeterias will appear here once they are registered in the
                  system.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {cafeterias.map((caf, idx) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={caf.cafeteriaId || idx}
                  >
                    <Paper sx={{ p: 3, borderRadius: 3, mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Avatar
                          sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}
                        >
                          <CoffeeIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {caf.name}
                          </Typography>
                          <Typography sx={{ color: "#1976d2" }}>
                            📍 {caf.location}
                          </Typography>
                          <Typography sx={{ color: "#888", fontSize: 14 }}>
                            ID: {caf.cafeteriaId}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>

          {/* Stats Grid */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={3}>
              <StatCard
                title="Total Transactions"
                value="0"
                icon={<BarChartIcon />}
                color="#16a34a"
                gradient
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                title="Active Vouchers"
                value="0"
                icon={<CreditCardIcon />}
                color="#1976d2"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                title="Today's Revenue"
                value={formatCurrency(0)}
                icon={<TrendingUpIcon />}
                color="#a21caf"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <StatCard
                title="Students Served"
                value="0"
                icon={<PeopleIcon />}
                color="#f59e42"
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
                  <EmptyState
                    icon={<AccessTimeIcon />}
                    title="No Activity Yet"
                    description="Transactions will appear here once students start using their vouchers."
                  />
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
        </Container>
      </Box>
    </>
  );
}