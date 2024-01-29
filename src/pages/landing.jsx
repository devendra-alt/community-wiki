import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import LOGIN from '../graphql/user/mutation/signIn';
import { setAuthState } from '../redux/feature/authSlice';
import { useDispatch } from 'react-redux';

export default function Landing() {
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();

  const [login] = useMutation(LOGIN);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      variables: {
        email: data.get('email'),
        password: data.get('password'),
      },
    })
      .then((data) => {
        console.log(data);
        const {
          data: {
            login: { jwt, user },
          },
        } = data;
        dispatch(setAuthState({ jwt, id: user.id }));
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" style={{ background: '#fff' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {error && <Alert severity="error">error signing in!</Alert>}
      </Container>
    </div>
  );
}
