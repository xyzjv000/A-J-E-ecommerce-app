import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import React, { useState } from 'react';
import classes from './LoginForm.module.css';
function LoginForm(props) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
    isEmailTouched: false,
    isPasswordTouched: false,
  });

  const isValidEmail =
    credentials.email.trim() !== '' &&
    credentials.email.trim().includes('@') &&
    credentials.email.trim().includes('.');
  const isValidPassword = credentials.password.trim().length >= 6;
  const formHandler = (event) => {
    event.preventDefault();
    setCredentials((prev) => {
      return { ...prev, isEmailTouched: true, isPasswordTouched: true };
    });
    if (!isValidEmail || !isValidPassword) {
      return;
    }

    props.setForm(credentials);
  };

  const onInputBlur = (event) => {
    if (event.target.id === 'email')
      setCredentials((prev) => {
        return { ...prev, isEmailTouched: true };
      });

    if (event.target.id === 'password')
      setCredentials((prev) => {
        return { ...prev, isPasswordTouched: true };
      });
  };

  const onInputChange = (event) => {
    setCredentials((prev) => {
      return event.target.id === 'email'
        ? { ...prev, email: event.target.value }
        : event.target.id === 'password'
        ? { ...prev, password: event.target.value }
        : { ...prev, remember: event.target.checked };
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>
          AJ2<span>Cart</span>
        </h1>
        <h3>Account Login</h3>
      </div>
      <form className={classes.form} onSubmit={formHandler}>
        <div className={classes.inputs}>
          <label htmlFor='email' className={classes.labels}>
            Username*
          </label>
          <TextField
            error={credentials.isEmailTouched && !isValidEmail}
            id='email'
            variant='outlined'
            value={credentials.email}
            onChange={onInputChange}
            onBlur={onInputBlur}
            type='email'
            helperText={
              credentials.isEmailTouched && !isValidEmail
                ? 'Invalid Email'
                : null
            }
          />
        </div>
        <div className={classes.inputs}>
          <label htmlFor='password' className={classes.labels}>
            Password*
          </label>
          <TextField
            error={credentials.isPasswordTouched && !isValidPassword}
            id='password'
            type='password'
            variant='outlined'
            value={credentials.password}
            onChange={onInputChange}
            onBlur={onInputBlur}
            helperText={
              credentials.isPasswordTouched && !isValidPassword
                ? 'Requires 6 characters above!'
                : null
            }
          />
        </div>
        <div className={classes.options}>
          <FormControlLabel
            value='remember'
            control={
              <Checkbox
                id='remember'
                checked={credentials.remember}
                onChange={onInputChange}
              />
            }
            label='Remember me'
            labelPlacement='end'
          />

          <button>Forgot Password</button>
        </div>
        <Button className={classes.submitBtn} type='submit' variant='contained'>
          Sign in
        </Button>
        <button className={classes.signUpBtn}>Sign up</button>
      </form>
    </div>
  );
}

export default LoginForm;

// NFN RFCE
