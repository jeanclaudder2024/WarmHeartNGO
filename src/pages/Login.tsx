import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../data/api"; // adjust path to your actual file

const LoginForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token); // save token for auth use
      navigate("/dashboard"); // ✅ redirect after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Log In
          </Typography>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "16px" }}
              required
              InputLabelProps={{ style: { color: theme.palette.primary.main } }}
              InputProps={{ style: { color: theme.palette.primary.main } }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "16px" }}
              required
              InputLabelProps={{ style: { color: theme.palette.primary.main } }}
              InputProps={{ style: { color: theme.palette.primary.main } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "16px", padding: "10px" }}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginForm;
