import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import React from 'react';
import classes from './LoginForm.module.css';
function LoginForm(props) {
  const formHandler = (event) => {
    event.preventDefault();
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
          <label htmlFor='username' className={classes.labels}>
            Username*
          </label>
          <TextField id='username' variant='outlined' />
        </div>
        <div className={classes.inputs}>
          <label htmlFor='password' className={classes.labels}>
            Password*
          </label>
          <TextField id='password' type='password' variant='outlined' />
        </div>
      </form>
      <div className={classes.options}>
        <FormControlLabel
          value='remember'
          control={<Checkbox />}
          label='Remember me'
          labelPlacement='end'
        />

        <button>Forgot Password</button>
      </div>
      <Button className={classes.submitBtn} variant='contained'>
        Sign in
      </Button>
      <button className={classes.signUpBtn}>Sign up</button>
    </div>
  );
}

export default LoginForm;

// NFN RFCE
