import Head from "next/head";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkSignin } from "../actions/auth.action";
import { useEffect } from "react";
import DashboardDrawer from "../components/DashboardDrawer";
import Reqsignin from "../components/Reqsignin";
import Unauthorized from "../components/Unauthorized";
import { Box } from "@mui/material";
import { getUsers,verifyUser } from "../actions/users.action";
import { useRouter } from "next/router";
import { getUserinfo } from "../actions/userinfo.action";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button, TextField ,CircularProgress} from "@mui/material";
export default function Verifylistings() {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    dispatch(checkSignin());
    dispatch(getUserinfo(auth.userId, auth.accessToken));
    dispatch(getUsers(auth.accessToken));
  },[]);


  const handleClose = () => {
    setOpen(false);
  };

  return !auth.authenticate ? (
    <Reqsignin />
  ) : auth.role == "admin" ? (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardDrawer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "auto",
            marginLeft: { xs: "50px", sm: "150px", md: "230px" },
          }}
        >
          <h2>Users to be verified</h2>
          {users.waiting ? (
            <CircularProgress />
          ) : (
            users.userList.map((user, index) => (
              <Box key={index}>
                <Button variant="standard" onClick={()=>{
                  console.log(user)
                  setUser(user)
                  setOpen(true);
                }}>
                  {`${user.firstname} ${user.lastname}`}
                </Button>
              </Box>
            ))
          )}
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <DialogContentText>First Name : {user?.firstname}</DialogContentText>
          <DialogContentText>Last Name : {user?.lastname}</DialogContentText>
          <DialogContentText>Email : {user?.email}</DialogContentText>
          <DialogContentText>Address : {`${user?user.address:''} ${user?user.city:''} ${user?user.state:''} ${user?user.country:'d'} Zip : ${user?user.zipCode:''}`}</DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleClose}>Cancel</Button>
          <Button onClick={() => {dispatch(verifyUser(user._id,auth.accessToken,userinfo))}}>Verify</Button>

        </DialogActions>
      </Dialog>

        </Box>
      </Box>
    </div>
  ) : (
    <Unauthorized />
  );
}
