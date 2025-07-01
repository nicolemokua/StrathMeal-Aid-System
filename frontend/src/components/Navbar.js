import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("userLoggedIn");
  const userType = localStorage.getItem("userType"); // Assuming userType is stored in localStorage
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDashboardMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDashboardClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)", // Match main page background
        boxShadow: "0 4px 24px rgba(19,78,74,0.08)",
      }}
    >
      <Toolbar>
        {/* Title only, logo removed */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: "#111",
              letterSpacing: "-1px",
              fontSize: { xs: "1.1rem", sm: "1.7rem" },
              textShadow: "0 2px 12px rgba(30,41,59,0.08)",
            }}
          >
            
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/home" sx={{ color: "#111", fontWeight: 700 }}>
          
        </Button>
        {isLoggedIn && (
          <>
            {/* Dashboard Dropdown */}
            <Button
              color="inherit"
              onClick={handleDashboardMenu}
              aria-controls="dashboard-menu"
              aria-haspopup="true"
              sx={{ color: "#111", fontWeight: 700 }}
            >
              Dashboard
            </Button>
            <Menu
              id="dashboard-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDashboardClose}
              MenuListProps={{
                "aria-labelledby": "dashboard-button",
              }}
            >
              {userType === "student" && (
                <MenuItem component={Link} to="/dashboard/student" onClick={handleDashboardClose}>
                  Student
                </MenuItem>
              )}
              {userType === "admin" && (
                <MenuItem component={Link} to="/dashboard/admin" onClick={handleDashboardClose}>
                  Admin
                </MenuItem>
              )}
              {userType === "cafeteria" && (
                <MenuItem component={Link} to="/dashboard/cafeteria" onClick={handleDashboardClose}>
                  Cafeteria
                </MenuItem>
              )}
              {userType === "donor" && (
                <MenuItem component={Link} to="/dashboard/donor" onClick={handleDashboardClose}>
                  Donor
                </MenuItem>
              )}
            </Menu>
            <Button color="inherit" component={Link} to="/about-us" sx={{ color: "#111", fontWeight: 700 }}>
              About Us
            </Button>
            <Button color="inherit" component={Link} to="/support" sx={{ color: "#111", fontWeight: 700 }}>
              Support
            </Button>
            <Button color="inherit" component={Link} to="/logout" sx={{ color: "#111", fontWeight: 700 }}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

