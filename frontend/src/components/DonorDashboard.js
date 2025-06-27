import React from "react";
import { Box, Typography } from "@mui/material";
import Register from "../pages/Register";

function DonorDashboard() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Donor Dashboard
      </Typography>
      <Typography>
        Make donations and view your donation history here.
      </Typography>
      <Register />
    </Box>
  );
}

export default DonorDashboard;