import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

function DonationForm() {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend
    alert(`Thank you for donating KES ${amount}!`);
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
      </CardContent>
    </Card>
  );
}

export default DonationForm;