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
import Box from "@mui/material/Box";
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick =(ind)=>{
    setSelectedIndex(ind)
  }
  const changeEmail = async (currentpassword, currentemail, newemail) => {
    dispatch(updateEmail({ currentpassword, currentemail, newemail ,userinfo}));
  };

  const changePassword = (currentpassword, password, confirmpassword) => {

    if(currentpassword == password){
      toast("Password cannot be same as the last password", { type: "warning" });
    }else if (password == confirmpassword) {
      dispatch(updatePassword({ currentpassword, password }));
    }
    else {
      toast("passwords do not match", { type: "warning" });
    }
  };
  const updateEmailTemp = () => {
    return (
      <Box sx={main}>
        <Box sx={{ marginLeft: { xs: "20px", sm: "20px", md: "0px" } }}>
          <h4>Update Email</h4>
        </Box>
        <Box sx={rowfull}>
          <Box sx={col_label}>
            <label style={txtlabel}>Current Password</label>
          </Box>
          <Box sx={col}>
            <TextField
              sx={{ width: "295px" }}
              size="small"
              value={currentpassword}
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Box>
        </Box>
        <Box sx={rowfull}>
          <Box sx={col_label}>
            <label style={txtlabel}>Email</label>
          </Box>
          <Box sx={col}>
            <TextField
              sx={{ width: "295px" }}
              size="small"
              type="email"
              value={newemail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              defaultValue={userinfo.email}
            />
          </Box>
        </Box>
        <Box sx={btn}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              changeEmail(currentpassword, userinfo.email, newemail);
            }}
          >
            Change Email
          </Button>
        </Box>
      </Box>
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
      <Box sx={main}>
        <Box sx={{ marginLeft: { xs: "20px", sm: "20px", md: "0px" } }}>
          <h4>Update Password</h4>
        </Box>
        <Box sx={rowfull}>
          <Box sx={col_label}>
            <label style={txtlabel}>Current Password</label>
          </Box>
          <Box sx={col}>
            <TextField
              sx={{ width: "295px" }}
              size="small"
              value={currentpassword}
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Box>
        </Box>
        <Box sx={rowfull}>
          <Box sx={col_label}>
            <label style={txtlabel}>New Password</label>
          </Box>
          <Box sx={col}>
            <TextField
              sx={{ width: "295px" }}
              size="small"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
        </Box>
        <Box sx={rowfull}>
          <Box sx={col_label}>
            <label style={txtlabel}>Confirm New Password</label>
          </Box>
          <Box sx={col}>
            <TextField
              value={confirmpassword}
              sx={{ width: "295px" }}
              size="small"
              type="password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
            />
          </Box>
        </Box>
        <Box sx={btn}>
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
        </Box>
      </Box>
    );
  };
  return !auth.authenticate ? (
    <Reqsignin />
  ) : (
    <div>
      <Head>
        <title>Bidding Cars</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardDrawer />
      <Box sx={{ width: "160px",marginLeft: { xs: "40px", sm: "150px", md: "230px" },marginTop:{ xs: "20px", sm: "20px", md: "5px" }}}>
        <List sx={{ display: "-webkit-box",
       // selected and (selected + hover) states
    '&& .Mui-selected, && .Mui-selected:hover': {
      bgcolor: '#2979ff',
      '&, & .MuiListItemIcon-root': {
        color: 'white',
      },
    },
     }}>
          {pages.map((page,index) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} selected={index === selectedIndex} onClick={()=>{setPage(page.link);handleListItemClick(index)
              }}>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {step()}
    </div>
  );
}
const main = {
  height: "auto",
  display: "flex",
  flexDirection: "column",
  // border: "solid #90caf9 3px",
  borderRadius: "10px",
  // marginLeft: "240px",
  marginLeft: { xs: "40px", sm: "150px", md: "240px" },
  // marginTop: "4px",
};
const rowfull = {
  display: "flex",
  flexDirection:{xs:"column",md: "row"},
  alignItems:{xs:"none",md: "center"},
  width: "auto",
  marginTop: "5px",
};
const col_label = {
  marginLeft: { xs: "20px", sm: "20px", md: "0px" },
  width: "145px",
};
const col = {
  marginLeft: { xs: "20px", sm: "20px", md: "0px" },
  width: "300px",
};
const txtlabel = { fontSize: "14px", width: "295px" };
const btn = {
  marginTop: "30px",
  marginRight: "20px",
  display: "flex",
  // justifyContent: "flex-end",
  flexDirection: "row-reverse",
  // width:{ xs: "66vw",sm:'35vw', md: "35vw" },
  width:{ xs: "315px",sm:'315px', md: "440px" },
};
