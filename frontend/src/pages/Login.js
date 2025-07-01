import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Container, TextField, Typography, Paper, Box, Link as MuiLink } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // After successful login, redirect to the correct dashboard based on user type
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }
      localStorage.setItem("userLoggedIn", "true");
      // Determine user type and redirect accordingly
      if (data.userType === "student") {
        navigate("/student");
      } else if (data.userType === "admin") {
        navigate("/admin");
      } else if (data.userType === "donor") {
        navigate("/donor");
      } else if (data.userType === "cafeteria") {
        navigate("/cafeteria");
      } else {
        navigate("/notfound");
      }
    } catch (err) {
      setError("Network error");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: `
            linear-gradient(135deg, #e0e7efcc 0%, #e0f2f1cc 100%),
            url('/C:/Users/nicol/Downloads/images/download.jpeg') center/cover no-repeat
          `,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative" }}>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              overflow: "hidden",
              borderRadius: 4,
              minHeight: 500,
              position: "relative",
              background: "rgba(255,255,255,0.95)",
            }}
          >
            {/* Left Side - Branding */}
            <Box
              sx={{
                flex: 1,
                background: "linear-gradient(135deg, #134e4a 0%, #2dd4bf 100%)",
                color: "#fff",
                p: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Decorative Circles */}
              <Box sx={{ position: "absolute", top: 30, left: 30, width: 80, height: 80, bgcolor: "white", opacity: 0.08, borderRadius: "50%", filter: "blur(8px)" }} />
              <Box sx={{ position: "absolute", bottom: 30, right: 30, width: 100, height: 100, bgcolor: "white", opacity: 0.08, borderRadius: "50%", filter: "blur(12px)" }} />

              <Box sx={{ mb: 4, zIndex: 1, textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  Strath Meal Aid
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Supporting student nutrition and well-being through accessible meal assistance
                </Typography>
              </Box>
            </Box>

            {/* Right Side - Login Form */}
            <Box sx={{ flex: 1, p: { xs: 4, md: 6 }, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#222" }}>
                    Welcome Back
                  </Typography>
                  <Typography sx={{ color: "#666" }}>
                    Log in to access your account
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      label="Email Address"
                      name="email"
                      type="email"
                      fullWidth
                      required
                      value={form.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <PersonIcon size={20} style={{ marginRight: 8, color: "#888" }} />
                        ),
                      }}
                      inputProps={{ maxLength: 200 }}
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <TextField
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      required
                      value={form.password}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <LockIcon size={20} style={{ marginRight: 8, color: "#888" }} />
                        ),
                        endAdornment: (
                          <Button
                            onClick={() => setShowPassword((v) => !v)}
                            tabIndex={-1}
                            sx={{ minWidth: 0, p: 0, color: "#888" }}
                          >
                            {showPassword ? <VisibilityOff size={20} /> : <Visibility size={20} />}
                          </Button>
                        ),
                      }}
                      inputProps={{ maxLength: 20 }}
                    />
                  </Box>
                  {error && (
                    <Typography color="error" sx={{ mb: 2, fontSize: 15 }}>
                      {error}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #134e4a 0%, #2dd4bf 100%)", // Match left side branding color
                      color: "#fff",
                      boxShadow: 3,
                      ":hover": {
                        background: "linear-gradient(135deg, #2dd4bf 0%, #134e4a 100%)",
                        color: "#fff",
                      },
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </Button>
                </form>
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Typography sx={{ fontSize: 15, color: "#666" }}>
                    Don't have an account?{" "}
                    <MuiLink component={Link} to="/register-type" sx={{ color: "#1976d2", fontWeight: 600 }}>
                      Create account
                    </MuiLink>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Login;