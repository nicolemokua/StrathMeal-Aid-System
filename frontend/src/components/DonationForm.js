import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

function DonationForm() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Replace donor_id and date with actual values in a real app
    const donation = {
      donor_id: 1,
      amount: parseFloat(amount),
      date: new Date().toISOString().slice(0, 10),
    };
    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donation),
      });
      const data = await res.json();
      if (res.status === 201) {
        setMessage("Thank you for your donation!");
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