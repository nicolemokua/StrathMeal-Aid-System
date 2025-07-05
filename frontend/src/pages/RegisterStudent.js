import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function RegisterStudent() {
  const [studentDetails, setStudentDetails] = useState(null);
  const [form, setForm] = useState({
    fee_balance: "",
    parent_guardian_unemployed: false,
    has_siblings: false,
    has_scholarship: false,
    additional_info: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch student details on mount
  useEffect(() => {
    const email =
      localStorage.getItem("studentEmail") || localStorage.getItem("userEmail");
    if (!email) {
      setError("No student logged in.");
      return;
    }
    fetch(
      `http://localhost:5000/api/user-profile?email=${encodeURIComponent(email)}`
    )
      .then((res) => res.json())
      .then((data) => {
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
    setError("");
  };

  // Eligibility logic (for preview only)
  const calculateEligibilityScore = (application) => {
    let score = 0;
    let breakdown = [];
    if (Number(application.fee_balance) <= 30000) {
      score += 30;
      breakdown.push({
        criteria: "Fee balance ≤ 30,000",
        points: 30,
        met: true,
      });
    } else {
      breakdown.push({
        criteria: "Fee balance ≤ 30,000",
        points: 0,
        met: false,
      });
    }
    if (application.parent_guardian_unemployed) {
      score += 30;
      breakdown.push({
        criteria: "Parent/Guardian unemployed",
        points: 30,
        met: true,
      });
    } else {
      breakdown.push({
        criteria: "Parent/Guardian unemployed",
        points: 0,
        met: false,
      });
    }
    if (application.has_siblings) {
      score += 10;
      breakdown.push({
        criteria: "Has siblings",
        points: 10,
        met: true,
      });
    } else {
      breakdown.push({
        criteria: "Has siblings",
        points: 0,
        met: false,
      });
    }
    if (application.has_scholarship) {
      score -= 20;
      breakdown.push({
        criteria: "Has scholarship (deduction)",
        points: -20,
        met: true,
      });
    } else {
      breakdown.push({
        criteria: "No scholarship",
        points: 0,
        met: false,
      });
    }
    return { score, breakdown };
  };

  const getEligibilityRecommendation = (score) => {
    if (score >= 70)
      return {
        status: "highly_eligible",
        text: "Highly Eligible",
        color: "#16a34a",
        bg: "#e8f5e9",
      };
    if (score >= 40)
      return {
        status: "eligible",
        text: "Pre-Eligible",
        color: "#f59e42",
        bg: "#fffbe6",
      };
    return {
      status: "not_eligible",
      text: "Review Required",
      color: "#f44336",
      bg: "#ffebee",
    };
  };

  const validateForm = () => {
    if (
      form.fee_balance === "" ||
      isNaN(Number(form.fee_balance)) ||
      Number(form.fee_balance) < 0
    )
      return "Fee balance must be a non-negative number.";
    return "";
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
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken"); // <-- get JWT token
      const res = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...form,
          ...studentDetails,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Application failed");
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      setError("Network error");
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!studentDetails) {
    return (
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading student details...</Typography>
      </Box>
    );
  }

  if (isSubmitted) {
    return (
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={5}
          sx={{
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          <Box
            sx={{
              background: "#e8f5e9",
              width: 64,
              height: 64,
              mx: "auto",
              mb: 3,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Application Submitted!
          </Typography>
          <Typography sx={{ color: "#666", mb: 3 }}>
            Your meal aid application has been successfully submitted. You will receive an email confirmation shortly.
          </Typography>
          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>Status:</strong> Pending Review
          </Alert>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              setIsSubmitted(false);
              setForm({
                fee_balance: "",
                parent_guardian_unemployed: false,
                has_siblings: false,
                has_scholarship: false,
                additional_info: "",
              });
            }}
          >
            Submit Another Application
          </Button>
        </Paper>
      </Box>
    );
  }

  // Eligibility preview
  const eligibilityPreview = calculateEligibilityScore(form);
  const eligibilityStatus = getEligibilityRecommendation(eligibilityPreview.score);

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: "linear-gradient(120deg, #e3f2fd 0%, #fce4ec 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 5, borderRadius: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
            Student Meal Aid Application
          </Typography>
          <Typography sx={{ color: "#666", mb: 3 }}>
            Apply for financial assistance for your meals
          </Typography>

          {/* Eligibility Preview */}
          {(form.fee_balance ||
            form.parent_guardian_unemployed ||
            form.has_siblings ||
            form.has_scholarship) && (
            <Box
              sx={{
                background: eligibilityStatus.bg,
                borderRadius: 2,
                p: 2,
                mb: 3,
              }}
            >
              <Typography sx={{ fontWeight: 700, color: eligibilityStatus.color }}>
                Eligibility Score: {eligibilityPreview.score} ({eligibilityStatus.text})
              </Typography>
              <ul style={{ textAlign: "left", margin: "12px auto", maxWidth: 400 }}>
                <li style={{ color: eligibilityPreview.breakdown[0].met ? "#16a34a" : "#f44336" }}>
                  Fee balance ≤ 30,000: <b>{eligibilityPreview.breakdown[0].points > 0 ? "+" : ""}{eligibilityPreview.breakdown[0].points} pts</b>
                </li>
                <li style={{ color: eligibilityPreview.breakdown[1].met ? "#16a34a" : "#f44336" }}>
                  Parent/Guardian unemployed: <b>{eligibilityPreview.breakdown[1].points > 0 ? "+" : ""}{eligibilityPreview.breakdown[1].points} pts</b>
                </li>
                <li style={{ color: eligibilityPreview.breakdown[2].met ? "#16a34a" : "#f44336" }}>
                  Has siblings: <b>{eligibilityPreview.breakdown[2].points > 0 ? "+" : ""}{eligibilityPreview.breakdown[2].points} pts</b>
                </li>
                <li style={{ color: eligibilityPreview.breakdown[3].met ? "#16a34a" : "#f44336" }}>
                  Has scholarship: <b>{eligibilityPreview.breakdown[3].points > 0 ? "+" : ""}{eligibilityPreview.breakdown[3].points} pts</b>
                </li>
              </ul>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            {/* Personal Information (pre-filled) */}
            <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "#1976d2" }}>
              Personal Information
            </Typography>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              value={studentDetails.name}
              disabled
            />
            <TextField
              label="Student ID"
              name="student_id"
              fullWidth
              margin="normal"
              value={studentDetails.student_id || ""}
              disabled
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={studentDetails.email}
              disabled
            />
            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              margin="normal"
              value={studentDetails.phone}
              disabled
            />

            {/* Academic Information (pre-filled) */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#1976d2" }}>
              Academic Information
            </Typography>
            <TextField
              label="Course/Program"
              name="course"
              fullWidth
              margin="normal"
              value={studentDetails.course}
              disabled
            />
            <TextField
              label="Year of Study"
              name="year_of_study"
              fullWidth
              margin="normal"
              value={studentDetails.year_of_study}
              disabled
            />

            {/* Financial Information */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#1976d2" }}>
              Financial Information
            </Typography>
            <TextField
              label="Outstanding Fee Balance (KSh) *"
              name="fee_balance"
              type="number"
              fullWidth
              margin="normal"
              required
              value={form.fee_balance}
              onChange={handleChange}
              inputProps={{ min: 0 }}
              error={!!error && error.toLowerCase().includes("fee balance")}
              helperText={error && error.toLowerCase().includes("fee balance") ? error : ""}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.parent_guardian_unemployed}
                  onChange={handleChange}
                  name="parent_guardian_unemployed"
                />
              }
              label="My parent/guardian is currently unemployed"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.has_siblings}
                  onChange={handleChange}
                  name="has_siblings"
                />
              }
              label="I have siblings in school/college"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.has_scholarship}
                  onChange={handleChange}
                  name="has_scholarship"
                />
              }
              label="I currently receive a scholarship or bursary"
            />

            {/* Additional Information */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1, color: "#1976d2" }}>
              Additional Information
            </Typography>
            <TextField
              label="Additional comments (optional)"
              name="additional_info"
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              value={form.additional_info}
              onChange={handleChange}
            />

            {/* Important Notice */}
            <Alert severity="warning" sx={{ mt: 3, mb: 2 }}>
              By submitting this application, you confirm that all information provided is accurate and complete. False information may result in disqualification from the meal aid program.
            </Alert>

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: 600 }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}