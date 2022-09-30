import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/auth.action';
import { TextField, Button } from '@mui/material';
// import RightDrawer from './RightDrawer';

const Signup = ({login}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [alert, setAlert] = useState('')

  const dispatch = useDispatch();

    const handleSubmit = () => {
        if (password === confirmpassword) {
            dispatch(signup({ email, password,fname,lname }));
        } else {
            setAlert('passwords doest not match')
      }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '65vh',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <div>
              <TextField
                id="outlined-basic"
                label="First name"
                variant="outlined"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
                      </div>
                      <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
                      </div>
                      <div>
              <TextField
                type='password'
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
                      </div>
                      <div>
              <TextField
                type='password'
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
                      <div>{ alert}</div>
            <Button type="submit" variant="outlined">
              Signup
                      </Button>
                      {login}
            <a href="#">Forgot password?</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
