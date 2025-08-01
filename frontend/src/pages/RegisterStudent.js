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
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

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
  const [eligibility, setEligibility] = useState({
    loading: true,
    eligible: false,
    reason: "",
  });
  const [applicationResult, setApplicationResult] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setEligibility({
        loading: false,
        eligible: false,
        reason: "Not logged in.",
      });
      return;
    }
    fetch("http://localhost:5000/api/application-eligibility", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEligibility({
          loading: false,
          eligible: data.eligible,
          reason: data.reason || "",
        });
      })
      .catch(() =>
        setEligibility({
          loading: false,
          eligible: false,
          reason: "Could not check eligibility.",
        })
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
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
      const token = localStorage.getItem("accessToken");
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
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Application failed");
        setIsSubmitting(false);
        localStorage.setItem("studentEligible", "false"); // Not eligible if failed
        return;
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
      setApplicationResult({
        status: data.status,
        remarks: data.remarks,
      });
      if (data.status === "Approved") {
        localStorage.setItem("studentEligible", "true");
      } else {
        localStorage.setItem("studentEligible", "false");
      }
    } catch (err) {
      setError("Network error");
      setIsSubmitting(false);
      localStorage.setItem("studentEligible", "false");
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

  if (eligibility.loading || !studentDetails) {
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
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  if (!eligibility.eligible && eligibility.last_status !== null) {
    // Show status if not eligible and there is a last_status (Pending, Approved, Rejected)
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
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Application Status
          </Typography>
          
          {eligibility.last_status === "Approved" && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your application for this semester has been <b>approved</b>.
              {eligibility.remarks && (
                <>
                  <br />
                  <i>Remarks: {eligibility.remarks}</i>
                </>
              )}
            </Alert>
          )}
          {eligibility.last_status === "Rejected" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Your application for this semester was <b>rejected</b>. Please wait
              for the next semester to re-apply.
              {eligibility.remarks && (
                <>
                  <br />
                  <i>Remarks: {eligibility.remarks}</i>
                </>
              )}
            </Alert>
          )}
          {!eligibility.last_status && (
            <Typography sx={{ color: "#f44336", mb: 2 }}>
              {eligibility.reason || "You are not eligible to apply at this time."}
            </Typography>
          )}
        </Paper>
      </Box>
    );
  }

  if (isSubmitted && applicationResult) {
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
              background: applicationResult.status === "Approved" ? "#e8f5e9" : "#ffebee",
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
            {applicationResult.status === "Approved" ? (
              <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
            ) : (
              <WarningAmberIcon color="error" sx={{ fontSize: 40 }} />
            )}
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {applicationResult.status === "Approved"
              ? "Application Approved!"
              : "Application Rejected"}
          </Typography>
          <Typography sx={{ color: "#666", mb: 3 }}>
            {applicationResult.remarks}
          </Typography>
          {applicationResult.status === "Approved" && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => {
                localStorage.setItem("studentEligible", "true");
                window.location.href = "/student";
              }}
            >
              Go to Dashboard
            </Button>
          )}
          {applicationResult.status === "Rejected" && (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => window.location.href = "/home"}
            >
              Back to Homepage
            </Button>
          )}
        </Paper>
      </Box>
    );
  }

  

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