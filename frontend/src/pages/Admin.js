import React, { useState, useEffect } from "react"; // Restored useEffect import
import Navbar from "../components/Navbar";
import { Box, Typography, Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import UserManagement from "../components/UserManagement";

const MIN_MEAL_KITTY = 10000; // Set to your desired minimum value

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showKittyModal, setShowKittyModal] = useState(false);

  const [systemSetup, setSystemSetup] = useState({
    voucherValue: 300,
    vouchersPerMonth: 30,
    maxStudents: 1000,
    systemName: "EduMeal System",
  });

  const [mealKitty, setMealKitty] = useState({
    totalFunds: 0,
    availableFunds: 0,
    lastUpdated: new Date().toISOString(),
  });

  // Fetch meal kitty info from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/kitty")
      .then(res => res.json())
      .then(data => setMealKitty(data));
  }, []);

  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [error, setError] = useState(""); // Add this state

  useEffect(() => {
    if (mealKitty.totalFunds < MIN_MEAL_KITTY) {
      // Show warning in UI or send alert
      // alert("Meal kitty is below minimum required funds!");
    }
    const percentUsed = 1 - mealKitty.availableFunds / mealKitty.totalFunds;
    if (percentUsed >= 0.8 && percentUsed < 0.9) {
      // 80% depletion: create emergency backup funds
      // showEmergencyFundsUI();
    }
    if (percentUsed >= 0.8) {
      // send alert at 80%
    }
    if (percentUsed >= 0.9) {
      // send alert at 90%
    }
    if (percentUsed >= 0.95) {
      // send alert at 95%
    }
  }, [mealKitty]);

  useEffect(() => {
    if (activeTab === "students") {
      setLoadingApps(true);
      setError(""); // Reset error
      const token = localStorage.getItem("accessToken");
      fetch("http://localhost:5000/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch applications");
          return res.json();
        })
        .then((data) => {
          setApplications(data);
          setLoadingApps(false);
        })
        .catch((err) => {
          setError("Could not load applications. Please ensure you are logged in as admin.");
          setLoadingApps(false);
        });
    }
  }, [activeTab]);

  const formatCurrency = (amount) => `Shs. ${amount.toLocaleString()}`;

  // Stat Card
  const StatCard = ({ title, value, icon, color = "#1976d2", subtitle = "" }) => (
    <Paper sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
      <Avatar sx={{ bgcolor: color, width: 48, height: 48, mx: "auto", mb: 1 }}>
        {icon}
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography sx={{ color: "#666" }}>{title}</Typography>
      {subtitle && (
        <Typography sx={{ color: "#aaa", fontSize: 13 }}>{subtitle}</Typography>
      )}
    </Paper>
  );

  // Empty State
  const EmptyState = ({ icon, title, description, actionText, onAction, color = "#1976d2" }) => (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Avatar sx={{ bgcolor: color, width: 64, height: 64, mx: "auto", mb: 2 }}>
        {icon}
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ color: "#666", mb: 2 }}>{description}</Typography>
      {actionText && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ bgcolor: color }}>
          {actionText}
        </Button>
      )}
    </Box>
  );

  const addFunds = (amount) => {
    setMealKitty((prev) => ({
      ...prev,
      totalFunds: prev.totalFunds + amount,
      availableFunds: prev.availableFunds + amount,
      lastUpdated: new Date().toISOString(),
    }));
    setShowKittyModal(false);
  };

  //const handleGenerateVouchers = async (studentIds, voucherValue, count) => {
  //  const res = await fetch("http://localhost:5000/api/vouchers", {
  //    method: "POST",
  //    headers: { "Content-Type": "application/json" },
  //    body: JSON.stringify({ studentIds, voucherValue, count }),
  //  });
  //  const data = await res.json();
    // Show success/error message
  //};

  // Only render the admin dashboard if the user is an admin
  const userRole = localStorage.getItem("userRole"); // Assuming user role is stored in localStorage
  if (userRole !== "admin") {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Access Denied
        </Typography>
        <Typography sx={{ color: "#666", mb: 4 }}>
          You do not have permission to access this page. Please contact your administrator.
        </Typography>
        <Button variant="contained" onClick={() => window.location.href = "/"}>
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)", py: 4 }}>
        <Box maxWidth="lg" mx="auto">
          {/* Header */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Admin Dashboard
              </Typography>
              
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => setShowSetupModal(true)}
                sx={{ bgcolor: "#1976d2" }}
              >
                System Setup
              </Button>
            </Box>
          </Paper>

          {/* Navigation Tabs */}
          <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
            <Button
              variant={activeTab === "dashboard" ? "contained" : "outlined"}
              startIcon={<TrendingUpIcon />}
              onClick={() => setActiveTab("dashboard")}
              sx={{ fontWeight: 600 }}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === "students" ? "contained" : "outlined"}
              startIcon={<PeopleIcon />}
              onClick={() => setActiveTab("students")}
              sx={{ fontWeight: 600 }}
            >
              Students
            </Button>
            <Button
              variant={activeTab === "users" ? "contained" : "outlined"}
              startIcon={<PeopleIcon />}
              onClick={() => setActiveTab("users")}
              sx={{ fontWeight: 600 }}
            >
              Users
            </Button>
            <Button
              variant={activeTab === "vouchers" ? "contained" : "outlined"}
              startIcon={<CreditCardIcon />}
              onClick={() => setActiveTab("vouchers")}
              sx={{ fontWeight: 600 }}
            >
              Vouchers
            </Button>
            <Button
              variant={activeTab === "kitty" ? "contained" : "outlined"}
              startIcon={<AttachMoneyIcon />}
              onClick={() => setActiveTab("kitty")}
              sx={{ fontWeight: 600 }}
            >
              Meal Fund
            </Button>
          </Box>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <Box>
              <Paper sx={{ p: 4, mb: 3, borderRadius: 3, background: "linear-gradient(90deg, #134e4a 0%, #2dd4bf 100%)", color: "#fff" }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Welcome 
                </Typography>
                
              </Paper>
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={3}>
                  <StatCard title="Total Students" value="0" icon={<PeopleIcon />} color="#1976d2" subtitle="Registered users" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <StatCard title="Active Vouchers" value="0" icon={<CreditCardIcon />} color="#16a34a" subtitle="Currently available" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <StatCard title="Available Funds" value={formatCurrency(mealKitty.availableFunds)} icon={<AttachMoneyIcon />} color="#a21caf" subtitle="In meal fund" />
                </Grid>
              </Grid>
              <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Getting Started
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#1976d2", width: 32, height: 32 }}>1</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Configure System</Typography>
                        <Typography sx={{ color: "#666", fontSize: 14 }}>Set voucher values, monthly limits, and system parameters</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#16a34a", width: 32, height: 32 }}>2</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Add Initial Funds</Typography>
                        <Typography sx={{ color: "#666", fontSize: 14 }}>Fund the meal kitty to start issuing vouchers</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#a21caf", width: 32, height: 32 }}>3</Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>Approve Students</Typography>
                        <Typography sx={{ color: "#666", fontSize: 14 }}>Review and approve student registration applications</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Student Applications
              </Typography>
              <Typography sx={{ color: "#666", mb: 2 }}>
                View all student applications and their status.
              </Typography>
              {loadingApps ? (
                <Typography>Loading applications...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : !Array.isArray(applications) || applications.length === 0 ? (
                <Typography>No student applications found.</Typography>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Email</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, idx) => (
                      <tr key={app.id || idx}>
                        <td>{app.id}</td>
                        <td>{app.name}</td>
                        <td>
                          <span className={`status-badge status-${app.status.toLowerCase()}`}>
                            {app.status}
                          </span>
                        </td>
                        <td>{app.email}</td>
                        <td>{app.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Paper>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <UserManagement />
          )}

          {/* Vouchers Tab */}
          {activeTab === "vouchers" && (
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Voucher Management
                  </Typography>
                  <Typography sx={{ color: "#666" }}>Generate and manage meal vouchers</Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<CreditCardIcon />}
                  onClick={async () => {
                    // Call backend to auto-allocate vouchers
                    const res = await fetch("http://localhost:5000/api/vouchers", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                    });
                    const data = await res.json();
                    if (res.ok) {
                      alert(data.message);
                      // Optionally refresh voucher stats here
                    } else {
                      alert(data.message || "Failed to generate vouchers.");
                    }
                  }}
                  sx={{ bgcolor: "#1976d2" }}
                >
                  Auto Allocate Monthly Vouchers
                </Button>
              </Box>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, borderRadius: 2, background: "#e0f2f1" }}>
                    <Typography sx={{ color: "#666", fontSize: 13 }}>Default Voucher Value</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#1976d2" }}>{formatCurrency(systemSetup.voucherValue)}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, borderRadius: 2, background: "#e0f2f1" }}>
                    <Typography sx={{ color: "#666", fontSize: 13 }}>Monthly Allocation</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#16a34a" }}>{systemSetup.vouchersPerMonth}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, borderRadius: 2, background: "#e0f2f1" }}>
                    <Typography sx={{ color: "#666", fontSize: 13 }}>Approved Students</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#a21caf" }}>0</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, borderRadius: 2, background: "#e0f2f1" }}>
                    <Typography sx={{ color: "#666", fontSize: 13 }}>Active Vouchers</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#f59e42" }}>0</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <EmptyState
                icon={<CreditCardIcon />}
                title="No Vouchers Generated"
                description="Start by approving student applications, then generate vouchers for approved students. The system will automatically calculate costs based on your settings."
                actionText="Configure Voucher Settings"
                onAction={() => setShowSetupModal(true)}
                color="#16a34a"
              />
            </Paper>
          )}

          {/* Meal Kitty Tab */}
          {activeTab === "kitty" && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Fund Balance
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AttachMoneyIcon />}
                      onClick={() => setShowKittyModal(true)}
                      sx={{ bgcolor: "#16a34a" }}
                    >
                      Add Funds
                    </Button>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography> Total Funds: <b>{formatCurrency(mealKitty.totalFunds)}</b></Typography>
                    <Typography> Available Funds: <b style={{ color: "#16a34a" }}>{formatCurrency(mealKitty.availableFunds)}</b></Typography>
                    <Typography> Used Funds: <b style={{ color: "#f44336" }}>{formatCurrency(mealKitty.totalFunds - mealKitty.availableFunds)}</b></Typography>
                  </Box>
                  {mealKitty.totalFunds === 0 && (
                    <Paper sx={{ p: 2, background: "#fffde7", border: "1px solid #ffe082", borderRadius: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <WarningAmberIcon sx={{ color: "#f59e42" }} />
                        <Typography sx={{ color: "#f59e42", fontSize: 14 }}>Add funds to start issuing vouchers</Typography>
                      </Box>
                    </Paper>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Recent Transactions
                  </Typography>
                  {mealKitty.totalFunds === 0 ? (
                    <EmptyState
                      icon={<CalendarMonthIcon />}
                      title="No Transactions Yet"
                      description="Fund transactions will appear here once you start adding money to the meal kitty."
                      color="#a21caf"
                    />
                  ) : (
                    <Box sx={{ p: 2, background: "#e0f2f1", borderRadius: 2 }}>
                      <Typography>Initial Fund: <b>{formatCurrency(mealKitty.totalFunds)}</b></Typography>
                      <Typography sx={{ color: "#666", fontSize: 13 }}>System Setup</Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>

      {/* System Setup Modal */}
      <Dialog open={showSetupModal} onClose={() => setShowSetupModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>System Configuration</DialogTitle>
        <DialogContent>
          <TextField
            label="System Name"
            fullWidth
            margin="normal"
            value={systemSetup.systemName}
            onChange={(e) => setSystemSetup({ ...systemSetup, systemName: e.target.value })}
          />
          <TextField
            label="Voucher Value (Shs)"
            type="number"
            fullWidth
            margin="normal"
            value={systemSetup.voucherValue}
            onChange={(e) => setSystemSetup({ ...systemSetup, voucherValue: parseInt(e.target.value) })}
          />
          <TextField
            label="Vouchers per Month"
            type="number"
            fullWidth
            margin="normal"
            value={systemSetup.vouchersPerMonth}
            onChange={(e) => setSystemSetup({ ...systemSetup, vouchersPerMonth: parseInt(e.target.value) })}
          />
          <TextField
            label="Maximum Students"
            type="number"
            fullWidth
            margin="normal"
            value={systemSetup.maxStudents}
            onChange={(e) => setSystemSetup({ ...systemSetup, maxStudents: parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSetupModal(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowSetupModal(false);
              alert("System configuration saved successfully!");
            }}
          >
            Save Configuration
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Funds Modal */}
      <Dialog open={showKittyModal} onClose={() => setShowKittyModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Funds to Meal Kitty</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[5000, 10000, 25000, 50000, 100000, 200000].map((amount) => (
              <Grid item xs={6} key={amount}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => addFunds(amount)}
                  sx={{ my: 1 }}
                >
                  {formatCurrency(amount)}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowKittyModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Generate Vouchers Info Modal */}
      <Dialog open={showVoucherModal} onClose={() => setShowVoucherModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Vouchers</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CreditCardIcon sx={{ fontSize: 48, color: "#aaa", mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              No Approved Students
            </Typography>
            <Typography sx={{ color: "#666", mb: 2 }}>
              You need to have approved students before generating vouchers. Once students register and you approve their applications, you can generate vouchers for them.
            </Typography>
            <Paper sx={{ p: 2, background: "#e3f2fd", borderRadius: 2, mb: 2 }}>
              <Typography sx={{ fontWeight: 600, color: "#1976d2", mb: 1 }}>Next Steps:</Typography>
              <Typography sx={{ color: "#1976d2", fontSize: 14 }}>• Wait for student registrations</Typography>
              <Typography sx={{ color: "#1976d2", fontSize: 14 }}>• Review and approve applications</Typography>
              <Typography sx={{ color: "#1976d2", fontSize: 14 }}>• Ensure sufficient funds in meal kitty</Typography>
              <Typography sx={{ color: "#1976d2", fontSize: 14 }}>• Generate vouchers for approved students</Typography>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowVoucherModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

