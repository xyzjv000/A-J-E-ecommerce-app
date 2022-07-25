import axios from 'axios';
import React, { Fragment, useState } from 'react';
import classes from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../Store/store';
import { Stack, Snackbar, Alert } from '@mui/material';
const API_URL = process.env.REACT_APP_API_URL;
const Login = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLaoding] = useState(false);
  const [open, setOpen] = useState({
    value: false,
    message: '',
    exists: false,
  });
  const dispatch = useDispatch();
  const requestLogin = (payload) => {
    setLaoding(true);
    axios.post(`${API_URL}users/login`, payload).then((res) => {
      if (res.data.result) {
        actionHandler(res.data);
        dispatch(authActions.login());
      } else {
        actionHandler(res.data);
      }

      setLaoding(false);
    });
  };

  const logoutHandler = (params) => {
    dispatch(authActions.logout());
  };

  const actionHandler = (result) => {
    console.log(result);
    setOpen({
      value: true,
      message: result.message,
      exists: result.result ? true : false,
    });
  };

  const actionHandlerClose = () => {
    setOpen({ value: false, message: '', exists: false });
  };

  const snackBar = (
    <Snackbar open={open} autoHideDuration={3000} onClose={actionHandlerClose}>
      <Alert
        onClose={actionHandlerClose}
        severity={open.exists ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {open.message}
      </Alert>
    </Snackbar>
  );

  return (
    <Stack>
      <Fragment>
        <div className={classes.left}>
          {!isLoggedIn && (
            <LoginForm isloading={loading} setForm={requestLogin} />
          )}
          {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </div>
        <div className={classes.right}></div>
      </Fragment>
      {open.value && snackBar}
    </Stack>
  );
};

export default Login;
