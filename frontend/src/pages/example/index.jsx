import React, { useEffect, useState } from "react";
import { Box, Container, Paper, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch user data");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) return null;

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
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            My Profile
          </Typography>

          <Typography variant="body1"><strong>Name:</strong> {user.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="body1"><strong>Skills Have:</strong> {user.skillsHave.join(", ")}</Typography>
          <Typography variant="body1"><strong>Skills Want:</strong> {user.skillsWant.join(", ")}</Typography>
          <Typography variant="body1"><strong>Free Connections Left:</strong> {user.freeConnectionLeft}</Typography>
          <Typography variant="body1"><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</Typography>
        </Paper>
      </Container>
    </Box>
  );
}
