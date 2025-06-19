import React from "react";
import { Box, Typography } from "@mui/material";

function StudentProfile() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        My Profile
      </Typography>
      <Typography>
        Profile details and update form will appear here.
      </Typography>
    </Box>
  );
}

export default StudentProfile;