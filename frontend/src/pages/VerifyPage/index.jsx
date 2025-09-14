import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};

  const [code, setCode] = useState("");

  if (!userId) {
    navigate("/signup");
  }

  const handleVerify = async () => {
    try {
      await axios.post("http://localhost:3000/auth/verify", {
        userId,
        verificationCode: code,
      });

      toast.success("Email verified! You can now login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Verification failed");
      navigate("/signup");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f4f8",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Verify Your Email
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 3 }}>
            Enter the verification code sent to your email.
          </Typography>
          <TextField
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleVerify}
          >
            Confirm
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
