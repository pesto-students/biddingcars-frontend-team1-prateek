import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  signin, googleSignIn } from "../actions/auth.action";
import { TextField, Button } from "@mui/material";

const Signin = ({ createAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(signin({ email, password ,role}));
  };
  const googleSign = () => {
    dispatch(googleSignIn());
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "55vh",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
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
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                height: "7vh",
                fontSize: "1.1rem",
                fontWeight: 500,
                mx: 3,
                textTransform: "capitalize",
                width: "100px",
              }}
            >
              Login
            </Button>
            {createAccount}
            {/* <a href="#">Forgot password?</a> */}
            <Button
              type="submit"
              onClick={() => {
                setEmail("dummyuser@gmail.com");
                setPassword("9999999999");
              }}
              variant="outlined"
            >
              Sign In as a Dummy User
            </Button>
            <Button
              type="submit"
              onClick={() => {
                setEmail("dummyadmin@gmail.com");
                setPassword("9999999999");
              }}
              variant="outlined"
            >
              Sign In as a Dummy Admin
            </Button>
            <Button onClick={() => googleSign()} variant="outlined">
              Sign In With Google
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
