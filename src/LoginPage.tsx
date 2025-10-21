import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    login({ username, password })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        notify(
          typeof error === 'string'
            ? error
            : error.message || 'Invalid username or password',
          { type: 'error' }
        );
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Card sx={{ minWidth: 300, maxWidth: 400, padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main', marginBottom: 1 }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginTop: 1 }}>
            <TextField
              autoFocus
              fullWidth
              label="Username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              margin="normal"
              required
            />
          </Box>
          <CardActions sx={{ padding: 0, marginTop: 2 }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{ paddingY: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  );
};

export default LoginPage;
