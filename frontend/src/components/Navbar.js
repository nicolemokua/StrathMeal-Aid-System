import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("userLoggedIn");

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #e0e7ef 0%, #e0f2f1 100%)",
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

