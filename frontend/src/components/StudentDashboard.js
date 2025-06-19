import React from "react";
import { Box, Typography } from "@mui/material";

function StudentDashboard() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Student Dashboard
      </Typography>
      <Typography>
        Welcome! Here you can view your vouchers, update your profile, and receive meals.
      </Typography>
    </Box>
  );
}

export default StudentDashboard;