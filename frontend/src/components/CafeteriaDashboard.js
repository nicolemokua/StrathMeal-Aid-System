import React from "react";
import { Box, Typography } from "@mui/material";

function CafeteriaDashboard() {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Cafeteria Dashboard
      </Typography>
      <Typography>
        Scan student IDs and serve meals here.
      </Typography>
    </Box>
  );
}

export default CafeteriaDashboard;