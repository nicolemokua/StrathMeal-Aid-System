import React from "react";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterType() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ minHeight: "90vh", background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper sx={{ p: 5, borderRadius: 4, textAlign: "center", minWidth: 350 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#1976d2" }}>
            Create Account
          </Typography>
          <Typography sx={{ mb: 4 }}>Select your role to begin registration:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate("/register")} 
              >
                Student
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" sx={{ background: "#16a34a", color: "#fff" }} onClick={() => navigate("/register/donor")}>
                Donor
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" sx={{ background: "#f59e42", color: "#fff" }} onClick={() => navigate("/register/cafeteria")}>
                Cafeteria
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}