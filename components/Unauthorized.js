import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container } from "@mui/material";
import firebase, { tokenSignin, checkSignin } from "../actions/auth.action";
import { useEffect } from "react";
import DashboardDrawer from "./DashboardDrawer";
export default function Unauthorized() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSignin());
  }, []);

  return (
    <div>
      <Head>
        <title>Bidding Cars</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection:"column",
          justifyContent: "center",
          marginTop: "10vh",
        }}
      >
        <div><h2>Unauthorized Access</h2></div>
        <div><h3>You need to be an admin to access the page</h3></div>

      </div>
    </div>
  );
}
