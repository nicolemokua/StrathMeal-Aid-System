import React, { useState } from "react";
import { Button, Container, TextField, Typography, Paper, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function RegisterCafeteria() {
  const [form, setForm] = useState({
    cashierName: "",
    cashierEmail: "",
    cashierPassword: "",
    name: "",
    location: "",
  });
  const [showCashierPassword, setShowCashierPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Generate a unique cashier ID across all cafeterias
  const generateUniqueCashierId = () => {
    let cashierId;
    let isUnique = false;
    const cafeteriaKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith("cafeteria_")
    );
    while (!isUnique) {
      cashierId = 'CA' + Math.floor(100000 + Math.random() * 900000).toString();
      isUnique = true;
      for (let i = 0; i < cafeteriaKeys.length; i++) {
        const caf = JSON.parse(localStorage.getItem(cafeteriaKeys[i]));
        if (caf && caf.cashierId === cashierId) {
          isUnique = false;
          break;
        }
      }
    }
    return cashierId;
  };

  // Generate unique cafeteria ID
  const generateCafeteriaId = () => {
    return 'C' + Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    // Validation
    if (!form.cashierName || !form.cashierEmail || !form.cashierPassword || !form.name || !form.location) {
      setError("Please fill in all required fields.");
      return;
    }
    const cafeteriaId = generateCafeteriaId();
    const cashierId = generateUniqueCashierId();
    const uniqueKey = `cafeteria_${cafeteriaId}`;
    // Save cafeteria info (including cashier info)
    localStorage.setItem(
      uniqueKey,
      JSON.stringify({
        cafeteriaId,
        name: form.name,
        location: form.location,
        cashierId,
        cashierName: form.cashierName,
        cashierEmail: form.cashierEmail,
        cashierPassword: form.cashierPassword,
      })
    );
    // Save cashier info for login
    localStorage.setItem("cashierName", form.cashierName);
    localStorage.setItem("cashierEmail", form.cashierEmail);
    localStorage.setItem("cashierId", cashierId);
    localStorage.setItem("cashierPassword", form.cashierPassword);
    localStorage.setItem("userType", "cashier");
    localStorage.setItem("cafeteriaId", cafeteriaId);
    localStorage.setItem("cafeteriaName", form.name);
    localStorage.setItem("cafeteriaLocation", form.location);
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("userCreated", "true");
    navigate("/login"); // Redirect to login page after registration
  };

  return (
    <>
      <Box sx={{ minHeight: "90vh", background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <Paper elevation={5} sx={{ p: 5, borderRadius: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
              Register Cashier & Cafeteria
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Cashier Details */}
              <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#1976d2" }}>
                Cashier Details
              </Typography>
              <TextField label="Cashier Name" name="cashierName" fullWidth margin="normal" required value={form.cashierName} onChange={handleChange} />
              <TextField label="Cashier Email" name="cashierEmail" type="email" fullWidth margin="normal" required value={form.cashierEmail} onChange={handleChange} />
              <TextField
                label="Cashier Password"
                name="cashierPassword"
                type={showCashierPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                required
                value={form.cashierPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showCashierPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowCashierPassword((show) => !show)}
                        edge="end"
                      >
                        {showCashierPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* Cafeteria Details */}
              <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#1976d2" }}>
                Cafeteria Details
              </Typography>
              <TextField label="Cafeteria Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
              <TextField label="Location" name="location" fullWidth margin="normal" required value={form.location} onChange={handleChange} />
              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
              <Button type="submit" variant="contained" sx={{ background: "#f59e42", color: "#fff", mt: 2, py: 1.5, borderRadius: 2 }}>
                Register
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}