import React from "react";
import { Box, Typography } from "@mui/material";

function UserManagement() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        User Management
      </Typography>
      <Typography>
        List of users and management actions will appear here.
      </Typography>
    </Box>
  );
}

export default UserManagement;