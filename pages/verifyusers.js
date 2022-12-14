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
import {List,ListItem,ListItemButton,ListItemText} from '@mui/material';
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
  useEffect(() => {
    dispatch(getUsers(auth.accessToken));
  },[open]);

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
          alignItems: "flex-start",
          flexDirection: 'column',
        }}
      >
        <Box sx={{ width: "170px",marginLeft: { xs: "40px", sm: "150px", md: "230px" },marginTop:{ xs: "0px", sm: "0px", md: "0px" }}}>
        <List sx={{display: '-webkit-box',
          '&& .Mui-selected, && .Mui-selected:hover': {
            bgcolor: '#2979ff',
            '&, & .MuiListItemIcon-root': {
              color: 'white',
            },
          },}}>
          <ListItem  disablePadding>
            <ListItemButton selected sx={{ textAlign: 'center'}} >
              <ListItemText primary= 'Users to be verified'/>
            </ListItemButton>
          </ListItem>

      </List>
    </Box>
        <Box
          sx={{
            width: "auto",
            marginLeft: { xs: "50px", sm: "150px", md: "230px" },
          }}
        >
          {users.waiting ? (
            <CircularProgress sx={{  position: 'fixed',top: '100px', right: '10px'}}/>
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
        <DialogTitle>Bank Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Customer Name : {user?.customerName}</DialogContentText>
          <DialogContentText>Account Number : {user?.accountNumber}</DialogContentText>
          <DialogContentText>Aadhar : {user?.aadharNumber}</DialogContentText>
          <DialogContentText>PAN : {user?.panNumber}</DialogContentText>
          <DialogContentText>Account Type : {user?.accountType}</DialogContentText>
          <DialogContentText>Caredit Score : {user?.creditScore}</DialogContentText>
          <DialogContentText>Annual Income : {user?.annualAvgIncome}</DialogContentText>
          <DialogContentText>Income Source : {user?.incomeSource}</DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => {dispatch(verifyUser(user._id,auth.accessToken,userinfo))
          handleClose()}}>Verify</Button>

        </DialogActions>
      </Dialog>

        </Box>
      </Box>
    </div>
  ) : (
    <Unauthorized />
  );
}
