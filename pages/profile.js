import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { checkSignin } from "../actions/auth.action";
import { Fragment, useEffect, useState } from "react";
import DashboardDrawer from "../components/DashboardDrawer";
import Reqsignin from "../components/Reqsignin";
import { userinfoConstants } from "../actions/constants";
import {
  Box,
  Button,
  Container,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { postUserinfo } from "../actions/userinfo.action";
export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  const [disabledForm, setdisabledForm] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    dispatch(checkSignin());
    setData(userinfo)
  }, []);

  const handleEdit = () => {
    dispatch(postUserinfo(userinfo,auth.accessToken,userinfo))
  };
  return !auth.authenticate ? (
    <Reqsignin />
  ) : disabledForm ? (
    <Fragment>
      <DashboardDrawer />
      <div
        className="profile-card"
        style={{ marginLeft: "226px", padding: "20px" }}
      >
        <div style={profilepic}></div>
        <div className="gen-info" style={{ marginTop: "10px" }}>
          <h3>User Information</h3>
          <div style={col}>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>First Name</label>
                <TextField disabled size="small" value={userinfo.firstName} />
              </div>
              <div style={col}>
                <label style={txtlabel}>Last Name</label>
                <TextField disabled size="small" value={userinfo.lastName} />
              </div>
            </div>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Email</label>
                <TextField disabled size="small" value={userinfo.email} />
              </div>
            </div>
          </div>
        </div>
        <div className="gen-info" style={{ marginTop: "40px" }}>
          <h3>Contact Information</h3>
          <div style={col}>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Address</label>
                <TextField disabled size="small" value={userinfo.address} />
              </div>
            </div>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>City</label>
                <TextField disabled size="small" value={userinfo.city} />
              </div>
              <div style={col}>
                <label style={txtlabel}>State</label>
                <TextField disabled size="small" value={userinfo.state} />
              </div>
            </div>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>Zip Code</label>
                <TextField disabled size="small" value={userinfo.zipCode} />
              </div>
              <div style={col}>
                <label style={txtlabel}>Country</label>
                <TextField disabled size="small" value={userinfo.country} />
              </div>
            </div>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Mobile No</label>
                <TextField disabled size="small" value={userinfo.mobile} />
              </div>
            </div>
          </div>
        </div>
        <div style={editbutton}>
          <Button
            variant="contained"
            onClick={() => {
              setdisabledForm(false);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <DashboardDrawer />
      <div
        className="profile-card"
        style={{ marginLeft: "226px", padding: "20px" }}
      >
        <div style={profilepic}></div>
        <div className="gen-info" style={{ marginTop: "10px" }}>
          <h3>User Information</h3>
          <div style={col}>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>First Name</label>
                <TextField
                  size="small"
                  value={userinfo.firstName}
                  onChange={() => {
                    dispatch({
                      type: userinfoConstants.UPDATE_USERINFO,
                      state:{firstName: event.target.value},
                    });
                  }}
                />
              </div>
              <div style={col}>
                <label style={txtlabel}>Last Name</label>
                <TextField size="small" value={userinfo.lastName}
                onChange={() => {
                  dispatch({
                    type: userinfoConstants.UPDATE_USERINFO,
                    state:{lastName: event.target.value},
                  });
                }}/>
              </div>
            </div>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Email</label>
                <TextField disabled size="small" value={userinfo.email} />
              </div>
            </div>
          </div>
        </div>
        <div className="gen-info" style={{ marginTop: "40px" }}>
          <h3>Contact Information</h3>
          <div style={col}>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Address</label>
                <TextField size="small" value={userinfo.address}
                onChange={() => {
                  dispatch({
                    type: userinfoConstants.UPDATE_USERINFO,
                    state:{address: event.target.value},
                  });
                }}/>
              </div>
            </div>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>City</label>
                <TextField size="small" value={userinfo.city}
                onChange={() => {
                  dispatch({
                    type: userinfoConstants.UPDATE_USERINFO,
                    state:{city: event.target.value},
                  });
                }} />
              </div>
              <div style={col}>
                <label style={txtlabel}>State</label>
                <TextField size="small" value={userinfo.state}
                onChange={() => {
                  dispatch({
                    type: userinfoConstants.UPDATE_USERINFO,
                    state:{state: event.target.value},
                  });
                }}/>
              </div>
            </div>
            <div style={rowhalf}>
              <div style={col}>
                <label style={txtlabel}>Zip Code</label>
                <TextField size="small" value={userinfo.zipCode}
                onChange={() => {
                  dispatch({
                    type: userinfoConstants.UPDATE_USERINFO,
                    state:{zipCode: event.target.value},
                  });
                }}/>
              </div>
              <div style={col}>
                <label style={txtlabel}>Country</label>
                <TextField size="small" value={userinfo.country}
                onChange={() => {
                  dispatch({
                    type: userinfoConstants.UPDATE_USERINFO,
                    state:{country: event.target.value},
                  });
                }} />
              </div>
            </div>
            <div style={rowfull}>
              <div style={col}>
                <label style={txtlabel}>Mobile No</label>
                <TextField size="small" value={userinfo.mobile}
                onChange={() => {
                  dispatch({
                    type: userinfoConstants.UPDATE_USERINFO,
                    state:{mobile: event.target.value},
                  });
                }}/>
              </div>
            </div>
          </div>
        </div>
        <div style={editbutton}>
          <Button
            marginLeft="10px"
            variant="contained"
            onClick={() => {
              handleEdit();
            }}
          >
            Update Changes
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setdisabledForm(true);
              dispatch({
                type: userinfoConstants.UPDATE_USERINFO,
                state:data,
              });
          }}
          >
            Cancel
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
  flexDirection: "row-reverse",
  width: "420px",
  justifyContent: "space-between",
  marginLeft: "20px",
};
const profilepic = {
  height: "100px",
  width: "100px",
  borderRadius: "50px",
  border: "solid",
};
