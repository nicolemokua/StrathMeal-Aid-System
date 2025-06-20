import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          StrathMeal-Aid-System
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>
        <Button color="inherit" component={Link} to="/dashboard/vouchers">Vouchers</Button>
        <Button color="inherit" component={Link} to="/dashboard/profile">Profile</Button>
        <Button color="inherit" component={Link} to="/dashboard/support">Support</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

