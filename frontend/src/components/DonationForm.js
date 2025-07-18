import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

function DonationForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Call your backend to initiate M-Pesa payment
    try {
      const res = await fetch("http://localhost:5000/api/mpesa-donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("M-Pesa payment initiated. Please complete on your phone.");
      } else {
        setMessage(data.message || "Donation failed.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Make a Donation</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount (KES)"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Donate</Button>
        </form>
        {message && <Typography sx={{ mt: 2 }} color="primary">{message}</Typography>}
      </CardContent>
    </Card>
  );
}

export default DonationForm;