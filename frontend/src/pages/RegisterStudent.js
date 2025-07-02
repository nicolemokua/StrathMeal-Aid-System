import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Typography, Paper, Box, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
  const [studentDetails, setStudentDetails] = useState(null);
  const [form, setForm] = useState({
    fee_balance: "",
    parent_guardian_unemployed: false,
    has_siblings: false,
    has_scholarship: false,
  });
  const [error, setError] = useState("");
  const [eligibility, setEligibility] = useState(null);
  const navigate = useNavigate();

  // Fetch student details on mount
  useEffect(() => {
    // Get the current user's email from localStorage
    const email = localStorage.getItem("studentEmail") || localStorage.getItem("userEmail");
    if (!email) {
      setError("No student logged in.");
      return;
    }
    fetch(`http://localhost:5000/api/user-profile?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.user) setStudentDetails(data.user);
        else setError("Could not fetch student details.");
      })
      .catch(() => setError("Could not fetch student details."));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Eligibility logic (unchanged)
  const calculateEligibilityScore = (application) => {
    let score = 0;
    let breakdown = [];
    if (Number(application.fee_balance) <= 30000) {
      score += 30;
      breakdown.push({ criteria: "Fee balance ≤ 30,000", points: 30, met: true });
    } else {
      breakdown.push({ criteria: "Fee balance ≤ 30,000", points: 0, met: false });
    }
    if (application.parent_guardian_unemployed) {
      score += 30;
      breakdown.push({ criteria: "Parent/Guardian unemployed", points: 30, met: true });
    } else {
      breakdown.push({ criteria: "Parent/Guardian unemployed", points: 0, met: false });
    }
    if (application.has_siblings) {
      score += 10;
      breakdown.push({ criteria: "Has siblings", points: 10, met: true });
    } else {
      breakdown.push({ criteria: "Has siblings", points: 0, met: false });
    }
    if (application.has_scholarship) {
      score -= 20;
      breakdown.push({ criteria: "Has scholarship (deduction)", points: -20, met: true });
    } else {
      breakdown.push({ criteria: "No scholarship", points: 0, met: false });
    }
    return { score, breakdown };
  };

  const getEligibilityRecommendation = (score) => {
    if (score >= 70)
      return { status: "highly_eligible", text: "Highly Eligible", color: "#16a34a", bg: "#e8f5e9" };
    if (score >= 40)
      return { status: "eligible", text: "Pre-Eligible", color: "#f59e42", bg: "#fffbe6" };
    return { status: "not_eligible", text: "Review Required", color: "#f44336", bg: "#ffebee" };
  };

  const validateForm = () => {
    if (form.fee_balance === "" || isNaN(Number(form.fee_balance)) || Number(form.fee_balance) < 0)
      return "Fee balance must be a non-negative number.";
    return "";
  };

  const handleEligibilityCheck = (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setEligibility(null);
      return;
    }
    const result = calculateEligibilityScore(form);
    setEligibility({
      ...result,
      recommendation: getEligibilityRecommendation(result.score),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!studentDetails) {
      setError("Student details not loaded.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...studentDetails, // Send all student details along with eligibility fields
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Application failed");
        return;
      }
      navigate("/dashboard/student");
    } catch (err) {
      setError("Network error");
    }
  };

  if (error) {
    return (
      <Box sx={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!studentDetails) {
    return (
      <Box sx={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Loading student details...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ minHeight: "90vh", background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <Paper elevation={5} sx={{ p: 5, borderRadius: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
              Student Application
            </Typography>
            <Box sx={{ mb: 3, textAlign: "left" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Student Details</Typography>
              <Typography>Name: {studentDetails.name}</Typography>
              <Typography>Email: {studentDetails.email}</Typography>
              <Typography>Phone: {studentDetails.phone}</Typography>
              <Typography>Course: {studentDetails.course}</Typography>
              <Typography>Year of Study: {studentDetails.year_of_study}</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Fee Balance (KSh)"
                name="fee_balance"
                type="number"
                fullWidth
                margin="normal"
                required
                value={form.fee_balance}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.parent_guardian_unemployed}
                    onChange={handleChange}
                    name="parent_guardian_unemployed"
                  />
                }
                label="Parent/Guardian is unemployed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.has_siblings}
                    onChange={handleChange}
                    name="has_siblings"
                  />
                }
                label="I have siblings"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.has_scholarship}
                    onChange={handleChange}
                    name="has_scholarship"
                  />
                }
                label="I have a scholarship"
              />
              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="outlined" color="primary" fullWidth onClick={handleEligibilityCheck}>
                  Check Eligibility
                </Button>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5, borderRadius: 2 }}>
                  Submit Application
                </Button>
              </Box>
            </form>
            {eligibility && (
              <Box sx={{ mt: 3, p: 2, borderRadius: 2, background: eligibility.recommendation.bg }}>
                <Typography sx={{ fontWeight: 700, color: eligibility.recommendation.color }}>
                  Eligibility Score: {eligibility.score} ({eligibility.recommendation.text})
                </Typography>
                <ul style={{ textAlign: "left", margin: "12px auto", maxWidth: 400 }}>
                  {eligibility.breakdown.map((item, idx) => (
                    <li key={idx} style={{ color: item.met ? "#16a34a" : "#f44336" }}>
                      {item.criteria}: <b>{item.points > 0 ? "+" : ""}{item.points} pts</b>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}