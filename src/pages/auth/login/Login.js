import * as React from 'react';
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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import Swal from 'sweetalert2'
import { useState } from "react";

//import apilogin from "../../../functions/auth/"
import { apilogin } from "../../../functions/auth";

import useForm from "./useForm";
import validate from './LoginFormValidationRules';

// redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



function Login() {

  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);

  const roleBaseRedirect = (role) => {
    console.log(role);
    if (role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/user/index");
    }
  };
  const [loading, setLoading] = useState(false);

  function login() {
   // setLoading(true);
    console.log('ถูกต้องหมด');
    console.log(values);

    //code
    apilogin(values)
      .then((res) => {
       // setLoading(false);
       console.log('then');
        toast.success(res.data.payload.user.username + " Login Success");
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });

        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        console.log('catch');
       // setLoading(false);
       Swal.fire('แจ้งเตือน',err.response.data,'error')
        ///toast.error(err.response.data);
      });

   
  }
    
      return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
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
            <Typography component="h1" variant="h5">
              Sign in App lalin WSD
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="E-mail"
                name="username"
                type="email"
                autoComplete="off"
                onChange={handleChange}
                value={values.username || ''}
                autoFocus
              />{errors.username && (
                <Alert severity="error">{errors.username}</Alert>
               
              )}
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={values.password || ''}
                onChange={handleChange}
              />{
                errors.password && (
                  <Alert severity="error">{errors.password}</Alert>
                )
              }
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
                เข้าสู่ระบบ
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
}

export default Login
