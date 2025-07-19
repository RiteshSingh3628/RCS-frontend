import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = React.useState('');

  const onSubmit = (data) => {
    // TODO: Replace with real authentication logic
    if (data.email !== 'admin@example.com' || data.password !== 'password123!') {
      setLoginError('Invalid email or password');
    } else {
      setLoginError('');
      // Redirect or set auth state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Box className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <Typography variant="h5" className="font-bold text-center mb-6 text-indigo-700">
          Login to Your Account
        </Typography>
        {loginError && <Alert severity="error" className="mb-4">{loginError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="py-3 font-semibold"
          >
            Login
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link to="/user/register" className="text-indigo-600 hover:underline font-semibold">
              Register
            </Link>
          </Typography>
        </div>
      </Box>
    </div>
  );
}

export default Login;
