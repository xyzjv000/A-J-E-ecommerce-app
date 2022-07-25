import axios from 'axios';
import React, { useState } from 'react';
import classes from './Registration.module.css';
import SignupForm from './SignupForm/SignupForm';
import { Stack, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
const Registration = (props) => {
  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errorSnackBar = (message) => {
    setMessage(message);
    setIsInvalid(true);
    setIsSuccess(false);
  };

  const successSnackBar = () => {
    setMessage('Registration Success!');
    setIsSuccess(true);
    setIsInvalid(false);
  };

  const closeSnackBar = () => {
    setIsInvalid(false);
    setIsSuccess(false);
  };

  const errorHandler = (event) => {
    if (event) {
      errorSnackBar('Form invalid!');
    }
  };

  const signUpHandler = (payload) => {
    setIsSubmitted(true);
    axios
      .post(`${API_URL}users`, payload)
      .then((res) => {
        if (res.data.result) {
          successSnackBar();
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);
        }
        setIsSubmitted(false);
      })
      .catch(() => {
        errorSnackBar('Something went wrong!');
        setIsSubmitted(false);
      });
  };
  const snackBar = (
    <Snackbar
      open={isInvalid || isSuccess}
      autoHideDuration={3000}
      onClose={closeSnackBar}
    >
      <Alert
        onClose={closeSnackBar}
        severity={isSuccess && !isInvalid ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
  return (
    <Stack sx={{ width: '100%' }}>
      <div className={classes.left}>
        <SignupForm
          hasError={errorHandler}
          submitForm={signUpHandler}
          isSubmitted={isSubmitted}
        />
      </div>
      <div className={classes.right}></div>
      {snackBar}
    </Stack>
  );
};

export default Registration;
