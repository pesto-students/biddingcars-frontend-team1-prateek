import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import firebase, {
  tokenSignin,
  checkSignin,
  updateEmail,
  updatePassword,
} from "../actions/auth.action";
import { useEffect } from "react";
import DashboardDrawer from "../components/DashboardDrawer";
import Reqsignin from "../components/Reqsignin";
import {
  FormGroup,
  FormLabel,
  Button,
  Card,
  Alert,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { getTimeline } from "../actions/timeline.action";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
export default function Settings() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userinfo);
  const [newemail, setNewEmail] = useState(userinfo.email);
  const [currentpassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [page, setPage] = useState("updateEmailTemp")
  const pages = [{name:'Update Email',link:'updateEmailTemp'},
  {name:'Update Password',link:'updatePasswordTemp'}];
  useEffect(() => {
    dispatch(checkSignin());
    dispatch(getTimeline());
  }, []);
  const changeEmail = async (currentpassword, currentemail, newemail) => {
    dispatch(updateEmail({ currentpassword, currentemail, newemail ,userinfo}));
  };

  const changePassword = (currentpassword, password, confirmpassword) => {
    console.log(currentpassword, password, confirmpassword);
    if (password == confirmpassword) {
      dispatch(updatePassword({ currentpassword, password }));
    } else {
      alert("passwords do not match");
    }
  };
  const updateEmailTemp = () => {
    return (
      <div style={main}>
        <div style={{ marginLeft: "20px" }}>
          <h4>Update Email</h4>
        </div>
        <div style={rowfull}>
          <div style={col_label}>
            <label style={txtlabel}>Current Password</label>
          </div>
          <div style={col}>
            <TextField
              sx={{ width: "270px" }}
              size="small"
              value={currentpassword}
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={rowfull}>
          <div style={col_label}>
            <label style={txtlabel}>Email</label>
          </div>
          <div style={col}>
            <TextField
              sx={{ width: "270px" }}
              size="small"
              type="email"
              value={newemail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              defaultValue={userinfo.email}
            />
          </div>
        </div>
        <div style={btn}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              changeEmail(currentpassword, userinfo.email, newemail);
            }}
          >
            Change Email
          </Button>
        </div>
      </div>
    );
  };
  const step = () => {
    switch (page) {
      case "updatePasswordTemp":
        return updatePasswordTemp();
      case "updateEmailTemp":
        return updateEmailTemp();
    }
  };
  const updatePasswordTemp = () => {
    return (
      <div style={main}>
        <div style={{ marginLeft: "20px" }}>
          <h4>Update Password</h4>
        </div>
        <div style={rowfull}>
          <div style={col_label}>
            <label style={txtlabel}>Current Password</label>
          </div>
          <div style={col}>
            <TextField
              sx={{ width: "270px" }}
              size="small"
              value={currentpassword}
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={rowfull}>
          <div style={col_label}>
            <label style={txtlabel}>New Password</label>
          </div>
          <div style={col}>
            <TextField
              sx={{ width: "270px" }}
              size="small"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={rowfull}>
          <div style={col_label}>
            <label style={txtlabel}>Confirm New Password</label>
          </div>
          <div style={col}>
            <TextField
              value={confirmpassword}
              sx={{ width: "270px" }}
              size="small"
              type="password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={btn}>
          <Button
            variant="contained"
            size="small"
            sx={{ width: "165px" }}
            onClick={() => {
              changePassword(currentpassword, password, confirmpassword);
            }}
          >
            Change Password
          </Button>
        </div>
      </div>
    );
  };
  return !auth.authenticate ? (
    <Reqsignin />
  ) : (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardDrawer />
      <div style={{ width: "170px", marginLeft: "230px" }}>
        <List sx={{ display: "-webkit-box" }}>
          {pages.map((page) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} onClick={()=>{setPage(page.link)
              console.log(step)}}>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      {step()}
    </div>
  );
}
const main = {
  height: "auto",
  width: "470px",
  display: "flex",
  flexDirection: "column",
  // border: "solid #90caf9 3px",
  borderRadius: "10px",
  marginLeft: "240px",
  marginTop: "15px",
};
const rowfull = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "auto",
  marginTop: "5px",
};
const col_label = {
  marginLeft: "20px",
  width: "145px",
};
const col = {
  marginLeft: "20px",
  width: "300px",
};
const txtlabel = { fontSize: "14px", width: "270px" };
const btn = {
  marginTop: "10px",
  marginRight: "20px",
  display: "flex",
  justifyContent: "flex-end",
};
