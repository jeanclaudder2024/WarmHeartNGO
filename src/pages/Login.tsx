import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../data/api"; // adjust path to your actual file

const LoginForm: React.FC = () => {
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
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `
        radial-gradient(circle at 15% 50%, rgba(229, 57, 53, 0.08), transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(255, 138, 101, 0.12), transparent 25%),
        linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)
      `,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#e53935\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        zIndex: 0,
        opacity: 0.6
      }
    }}>
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Card elevation={0} sx={{
          borderRadius: 4,
          padding: 3,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 10px 40px rgba(229, 57, 53, 0.15)'
        }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: 'primary.dark' }}>
                تسجيل الدخول
              </Typography>
              <Typography variant="body2" color="textSecondary">
                الوصول إلى لوحة تحكم منظمة القلب الدافئ
              </Typography>
            </Box>

            {error && (
              <Box sx={{ bgcolor: 'error.light', color: 'error.dark', p: 1.5, borderRadius: 2, mb: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{error}</Typography>
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                label="البريد الإلكتروني"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover fieldset': { borderColor: 'rgba(229,57,53,0.4)' },
                    '&.Mui-focused fieldset': { borderColor: '#E53935', borderWidth: '2px' }
                  }
                }}
              />
              <TextField
                label="كلمة المرور"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover fieldset': { borderColor: 'rgba(229,57,53,0.4)' },
                    '&.Mui-focused fieldset': { borderColor: '#E53935', borderWidth: '2px' }
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 12,
                  boxShadow: '0 4px 14px rgba(229,57,53,0.39)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(229,57,53,0.23)'
                  }
                }}
              >
                تسجيل الدخول
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginForm;
