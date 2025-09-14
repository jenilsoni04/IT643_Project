import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  Stepper,
  Step,
  Link,
  StepLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const steps = ["Create Account", "Add Skills"];

export default function SignupForm() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    skillsHave: "",
    skillsWant: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/auth/register", {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      skillsHave: formData.skillsHave.split(","),
      skillsWant: formData.skillsWant.split(","), 
    });

    toast.success(res.data.message || "Signup successful!");
    navigate("/verify-email", { state: { userId: res.data.userId } });
  } catch (err) {
    console.error("Error during signup:", err);
    toast.error(err.response?.data?.message || "Signup failed");
  }
};

  return (
   <Box
  sx={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f0f4f8 0%, #e9eff6 100%)",
    p: 2,
  }}
>


      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "600", color: "#2c3e50" }}
          >
            {step === 0 ? "Create Account" : "Add Your Skills"}
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            {step === 0
              ? "Enter your account details"
              : "Tell us about your skills"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSubmit}>
            {step === 0 && (
              <>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  onClick={handleNext}
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.4,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    backgroundColor: "#1976d2",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#1259a3",
                    },
                  }}
                >
                  Next
                </Button>
                <Typography variant="body2" sx={{ color: "text.secondary"  , mt: 2 }} align="center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    underline="hover"
                    sx={{ color: "primary.main", fontWeight: 500 }}
                  >
                    Log in
                  </Link>
                </Typography>
              </>
            )}

            {step === 1 && (
              <>
                <TextField
                  label="Skills Have (comma separated)"
                  name="skillsHave"
                  value={formData.skillsHave}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Skills Want (comma separated)"
                  name="skillsWant"
                  value={formData.skillsWant}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 1.4,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: "none",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.4,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      backgroundColor: "#1976d2",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#1259a3",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
