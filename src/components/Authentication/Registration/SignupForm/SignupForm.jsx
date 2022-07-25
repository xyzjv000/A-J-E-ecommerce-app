import React, { useState, useRef } from 'react';
import classes from './SignupForm.module.css';
import {
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Select,
  MenuItem,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
const SignupForm = (props) => {
  const phone = useRef();
  const address = useRef();
  const [gender, setGender] = useState('Others');
  const [birthdate, setBirthdate] = useState(new Date());
  const [accountType, setAccountType] = useState('Customer');
  const accountTypeHandler = (event) => {
    let id = event.target.id;
    setAccountType(id);
  };

  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    touched: emailIsTouched,
    onInputChangeHandler: onInputChangeEmail,
    onInputBlurHandler: onInputBlurEmail,
  } = useInput((value) => value.trim() !== '' && value.trim().includes('@'));

  const {
    value: firstNameValue,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    touched: firstNameIsTouched,
    onInputChangeHandler: onInputChangefirstName,
    onInputBlurHandler: onInputBlurfirstName,
  } = useInput((value) => value.trim() !== '');

  const {
    value: lastNameValue,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    touched: lastNameIsTouched,
    onInputChangeHandler: onInputChangelastName,
    onInputBlurHandler: onInputBlurlastName,
  } = useInput((value) => value.trim() !== '');

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    touched: passwordIsTouched,
    onInputChangeHandler: onInputChangepassword,
    onInputBlurHandler: onInputBlurpassword,
  } = useInput((value) => value.trim() !== '' && value.trim().length >= 6);

  const {
    value: cpasswordValue,
    hasError: cpasswordHasError,
    isValid: cpasswordIsValid,
    touched: cpasswordIsTouched,
    onInputChangeHandler: onInputChangecpassword,
    onInputBlurHandler: onInputBlurcpassword,
  } = useInput((value) => value.trim() === passwordValue);

  const genderHandler = (events) => {
    setGender(events.target.value);
  };

  const formSubmitHandler = async (events) => {
    events.preventDefault();
    if (
      passwordHasError ||
      firstNameHasError ||
      lastNameHasError ||
      emailHasError ||
      cpasswordHasError
    ) {
      onInputBlurpassword();
      onInputBlurfirstName();
      onInputBlurlastName();
      onInputBlurEmail();
      onInputBlurcpassword();
      props.hasError(true);
      return;
    }

    const payload = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      gender: gender,
      birthdate: birthdate,
      email: emailValue,
      phone: phone.current.value,
      password: passwordValue,
      address: address.current.value,
      userType: accountType,
    };
    props.submitForm(payload);
  };
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>
          AJ2<span>Cart</span>
        </h1>
        <h3>Create an Account</h3>
      </div>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.inputs}>
          <div className={classes.wd100}>
            <label htmlFor='firstName' className={classes.labels}>
              First Name*
            </label>
            <TextField
              type='text'
              id='firstName'
              className={`${classes.inputField} ${classes.wd100}`}
              error={firstNameIsTouched && !firstNameIsValid}
              value={firstNameValue}
              onChange={onInputChangefirstName}
              onBlur={onInputBlurfirstName}
              helperText={
                firstNameIsTouched && !firstNameIsValid
                  ? 'First Name is required'
                  : null
              }
            />
          </div>
          <div className={classes.wd100}>
            <label htmlFor='lastName' className={classes.labels}>
              Last Name*
            </label>
            <TextField
              type='text'
              id='lastName'
              className={`${classes.inputField} ${classes.wd100}`}
              error={lastNameIsTouched && !lastNameIsValid}
              value={lastNameValue}
              onChange={onInputChangelastName}
              onBlur={onInputBlurlastName}
              helperText={
                lastNameIsTouched && !lastNameIsValid
                  ? 'Last Name is required'
                  : null
              }
            />
          </div>
        </div>

        <div className={classes.inputs}>
          <div className={classes.wd100}>
            <label htmlFor='email' className={classes.labels}>
              Email*
            </label>
            <TextField
              type='email'
              id='email'
              className={`${classes.inputField} ${classes.wd100}`}
              error={emailIsTouched && !emailIsValid}
              value={emailValue}
              onChange={onInputChangeEmail}
              onBlur={onInputBlurEmail}
              helperText={
                emailIsTouched && !emailIsValid ? 'Invalid Email' : null
              }
            />
          </div>
          <div className={classes.wd70}>
            <label htmlFor='gender' className={classes.labels}>
              Gender
            </label>
            <Select
              labelId='gender'
              className={`${classes.inputField} ${classes.wd100}`}
              id='gender'
              value={gender}
              onChange={genderHandler}
            >
              <MenuItem value='Others'>Others</MenuItem>
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
            </Select>
          </div>
        </div>

        <div className={classes.inputs}>
          <div className={classes.wd100}>
            <label htmlFor='phone' className={classes.labels}>
              Phone Number
            </label>
            <TextField
              type='text'
              id='phone'
              className={`${classes.inputField} ${classes.wd100}`}
              inputRef={phone}
            />
          </div>
          <div className={classes.wd70}>
            <label htmlFor='dob' className={classes.labels}>
              Date of Birth
            </label>
            {/* <TextField
              type='text'
              id='dob'
              className={`${classes.inputField} ${classes.wd100}`}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={birthdate}
                onChange={(newValue) => {
                  setBirthdate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                className={`${classes.inputField} ${classes.wd100}`}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className={classes.inputs}>
          <div className={classes.wd100}>
            <label htmlFor='password' className={classes.labels}>
              Password*
            </label>
            <TextField
              type='password'
              id='password'
              className={`${classes.inputField} ${classes.wd100}`}
              error={passwordIsTouched && !passwordIsValid}
              value={passwordValue}
              onChange={onInputChangepassword}
              onBlur={onInputBlurpassword}
              helperText={
                passwordIsTouched && !passwordIsValid
                  ? 'Password must be 6 characters above!'
                  : null
              }
            />
          </div>
        </div>

        <div className={classes.inputs}>
          <div className={classes.wd100}>
            <label htmlFor='cpassword' className={classes.labels}>
              Confirm Password*
            </label>
            <TextField
              type='password'
              id='cpassword'
              className={`${classes.inputField} ${classes.wd100}`}
              error={cpasswordIsTouched && !cpasswordIsValid}
              value={cpasswordValue}
              onChange={onInputChangecpassword}
              onBlur={onInputBlurcpassword}
              helperText={
                cpasswordIsTouched && !cpasswordIsValid
                  ? "Password didn't match!"
                  : null
              }
            />
          </div>
        </div>

        <div className={classes.inputs}>
          <div className={classes.wd100}>
            <label htmlFor='address' className={classes.labels}>
              Address
            </label>
            <TextField
              type='text'
              id='address'
              className={`${classes.inputField} ${classes.wd100}`}
              inputRef={address}
            />
          </div>
        </div>

        <div className={`${classes.inputs} ${classes.options}`}>
          <FormControlLabel
            value='customer'
            control={
              <Checkbox
                id='Customer'
                checked={accountType === 'Customer'}
                onChange={accountTypeHandler}
              />
            }
            label='Customer Account'
            labelPlacement='end'
          />

          <FormControlLabel
            value='business'
            control={
              <Checkbox
                id='Merchant'
                checked={accountType === 'Merchant'}
                onChange={accountTypeHandler}
              />
            }
            label='Business Account'
            labelPlacement='end'
          />
        </div>

        <Button className={classes.submitBtn} type='submit' variant='contained'>
          {props.isSubmitted && (
            <CircularProgress
              sx={{ color: 'grey.500' }}
              size={'1.5rem'}
              spacing={2}
            />
          )}
          Sign up
        </Button>
        <p className={classes.signIn}>
          Already have an account? <Link to='/'>Sign in</Link> instead
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
