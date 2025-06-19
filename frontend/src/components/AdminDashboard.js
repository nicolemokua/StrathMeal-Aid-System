import React from "react";
import { Box, Typography } from "@mui/material";

function AdminDashboard() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography>
        Manage users, approve applications, generate and allocate vouchers here.
      </Typography>
    </Box>
  );
}

export default AdminDashboard;