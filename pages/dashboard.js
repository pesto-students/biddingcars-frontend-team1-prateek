import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Test from '../components/Signin';
import { useSelector, useDispatch } from 'react-redux';
import RightDrawer from '../components/RightDrawer';
import { Box, Card, CircularProgress, Paper, Typography } from '@mui/material';
import firebase, { tokenSignin, checkSignin } from '../actions/auth.action';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { getUserinfo } from '../actions/userinfo.action';
import DashboardDrawer from '../components/DashboardDrawer';
import Reqsignin from '../components/Reqsignin';
import Profile from './profile';
export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(checkSignin());
      // dispatch(getUserinfo(auth.userId))
  }, [])
  return (
    !auth.authenticate?
    <Reqsignin/>:
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <DashboardDrawer/>
        <Profile/>
    </div>  );
}
