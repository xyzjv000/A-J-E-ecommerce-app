import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import classes from './LoginForm.module.css';

function LoginForm(props) {
  const [remember, setRemember] = useState(false);
  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    touched: emailIsTouched,
    onInputChangeHandler: onInputChangeEmail,
    onInputBlurHandler: onInputBlurEmail,
  } = useInput((value) => value.trim() !== '' && value.trim().includes('@'));

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    touched: passwordIsTouched,
    onInputChangeHandler: onInputChangePassword,
    onInputBlurHandler: onInputBlurPassword,
  } = useInput((value) => value.trim().length >= 6);

  const formHandler = (event) => {
    event.preventDefault();
    onInputBlurEmail();
    onInputBlurPassword();
    if (passwordHasError || emailHasError) {
      return;
    }
    let credentials = {
      email: emailValue,
      password: passwordValue,
      remember: remember,
    };

    props.setForm(credentials);
  };

  const rememberHandler = (event) => {
    console.log(event.target);
    setRemember(event.target.checked);
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
            Email*
          </label>
          <TextField
            error={emailIsTouched && !emailIsValid}
            id='email'
            variant='outlined'
            value={emailValue}
            onChange={onInputChangeEmail}
            onBlur={onInputBlurEmail}
            type='email'
            helperText={
              emailIsTouched && !emailIsValid ? 'Invalid Email' : null
            }
          />
        </div>
        <div className={classes.inputs}>
          <label htmlFor='password' className={classes.labels}>
            Password*
          </label>
          <TextField
            error={passwordIsTouched && !passwordIsValid}
            id='password'
            type='password'
            variant='outlined'
            value={passwordValue}
            onChange={onInputChangePassword}
            onBlur={onInputBlurPassword}
            helperText={
              passwordIsTouched && !passwordIsValid
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
                checked={remember}
                onChange={rememberHandler}
              />
            }
            label='Remember me'
            labelPlacement='end'
          />

          <button>Forgot Password</button>
        </div>
        <Button className={classes.submitBtn} type='submit' variant='contained'>
          {props.isloading && (
            <CircularProgress
              sx={{ color: 'grey.500' }}
              size={'1.5rem'}
              spacing={2}
            />
          )}
          Sign in
        </Button>

        <button className={classes.signUpBtn} type='button'>
          <Link to='/registration'>Sign up</Link>
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

// NFN RFCE
