import React, { Fragment } from 'react';
import classes from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';
const Login = (props) => {
  return (
    <Fragment>
      <div className={classes.left}>
        <LoginForm />
      </div>
      <div className={classes.right}></div>
    </Fragment>
  );
};

export default Login;
