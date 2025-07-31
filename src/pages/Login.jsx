import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');
    
    try {
      const result = await login({
        email: data.email,
        password: data.password
      });
      
      if (result.success) {
        console.log("login was successful")
        navigate('/dashboard');
      } else {
        setLoginError('Login failed');
      }
    } catch (error) {
      setLoginError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="py-3 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline font-semibold">
              Register
            </Link>
          </Typography>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <Typography variant="caption" className="text-gray-600 block text-center">
            Demo: Use any email and password to login
          </Typography>
        </div>
      </Box>
    </div>
  );
}

export default Login;
