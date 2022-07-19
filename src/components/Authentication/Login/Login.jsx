import axios from 'axios';
import React, { Fragment, useState } from 'react';
import classes from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';

const API_URL = process.env.REACT_APP_API_URL;
const Login = (props) => {
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    remember: '',
  });
  console.log(process.env);
  const credentialHandler = (params) => {
    const { email, password, remember } = params;
    if (remember) {
    }
    setPayload({ email, password, remember });
    requestLogin(payload);
  };

  const requestLogin = (payload) => {
    console.log(payload);
    axios.post(`${API_URL}users/login`, payload).then((res) => {
      console.log(res);
    });
  };

  return (
    <Fragment>
      <div className={classes.left}>
        <LoginForm setForm={credentialHandler} />
      </div>
      <div className={classes.right}></div>
    </Fragment>
  );
};

export default Login;
