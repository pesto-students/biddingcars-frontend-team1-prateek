import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { checkSignin } from "../actions/auth.action";
import { Fragment, useEffect, useState } from "react";
import DashboardDrawer from "../components/DashboardDrawer";
import Reqsignin from "../components/Reqsignin";
import { getUserinfo } from '../actions/userinfo.action';
import {
  Box,
  Button,
  Container,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  useEffect(() => {
    dispatch(checkSignin());
    dispatch(getUserinfo(auth.userId))
  }, []);

  let handleEdit=()=>{}
  return !auth.authenticate ? (
    <Reqsignin />
  ) : (
    <Fragment>
      <DashboardDrawer />
      <div
        className="profile-card"
        style={{ marginLeft: "226px", padding: "20px" }}
      >
        <div style={profilepic}></div>
        <div  className="gen-info" style={{marginTop:'10px'}}>
          <h3>User Information</h3>
          <div style={col}>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>First Name</label>
                <TextField disabled size='small' value={userinfo.firstName}/>
              </div>
              <div style={col}>
                <label style={txtlabel}>Last Name</label>
                <TextField disabled size='small' value={userinfo.lastName}/>
              </div>
            </div>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Email</label>
                <TextField disabled size='small' value={userinfo.email}/>
              </div>
            </div>
          </div>
        </div>
        <div className="gen-info" style={{marginTop:'40px'}}>
          <h3>Contact Information</h3>
          <div style={col}>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Address</label>
                <TextField disabled size='small' value={userinfo.address}/>
              </div>
            </div>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>City</label>
                <TextField disabled size='small' value={userinfo.city}/>
              </div>
              <div style={col}>
                <label style={txtlabel}>State</label>
                <TextField disabled size="small" value={userinfo.state}/>
              </div>
            </div>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>Zip Code</label>
                <TextField disabled size='small' value={userinfo.zipCode}/>
              </div>
              <div style={col}>
                <label style={txtlabel}>Country</label>
                <TextField disabled size='small' value={userinfo.country}/>
              </div>
            </div>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Mobile No</label>
                <TextField disabled size='small' value={userinfo.mobile}/>
              </div>
            </div>
          </div>
        </div>
        <div style={editbutton}>
          <Button
            variant="contained"
            onClick={() => {
             handleEdit()
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </Fragment>
  );
}

const col = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10px",
  width: "auto",
};
const rowfull = {
  marginTop: "10px",
  alignItems: "center",
  width: "430px",
};
const rowhalf = {
  marginTop: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "430px",
};
const txtlabel = { fontSize: "14px" };
const editbutton = {
  marginTop: "25px",
  display: "flex",
  flexDirection: "row",
  width: "430px",
  justifyContent: "flex-end",
};
const profilepic={
  height:'100px',
  width:'100px',
  borderRadius:'50px',
  border:'solid'
}