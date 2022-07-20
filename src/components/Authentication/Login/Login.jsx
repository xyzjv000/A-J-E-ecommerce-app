import axios from 'axios';
import React, { Fragment } from 'react';
import classes from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';

const API_URL = process.env.REACT_APP_API_URL;
const Login = (props) => {
  const requestLogin = (payload) => {
    axios.post(`${API_URL}users/login`, payload).then((res) => {
      console.log(res);
    });
  };

  return (
    <Fragment>
      <div className={classes.left}>
        <LoginForm setForm={requestLogin} />
      </div>
      <div className={classes.right}></div>
    </Fragment>
  );
};

export default Login;
