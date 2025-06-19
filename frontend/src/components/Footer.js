import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ mt: 5, py: 2, textAlign: "center", background: "#f4f6f8" }}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} StrathMeal-Aid-System. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;