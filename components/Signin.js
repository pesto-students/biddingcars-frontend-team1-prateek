import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../actions/auth.action';
import { TextField, Button } from '@mui/material';
import RightDrawer from './RightDrawer';

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(signin({ userName, password }));
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
              height: '35vh',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <div>
              <TextField
                id="outlined-basic"
                label="User-name"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" variant="outlined">
              Login
            </Button>
            <a href='#'>Forgot password?</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
