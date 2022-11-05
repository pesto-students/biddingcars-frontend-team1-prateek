import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Test from '../components/Signin';
import { useSelector, useDispatch } from 'react-redux';
import RightDrawer from '../components/RightDrawer';
import { Box, Card, CircularProgress, Paper, Typography } from '@mui/material';
import Layout from '../components/Layout';
import firebase, { tokenSignin, checkSignin } from '../actions/auth.action';
import { useEffect, useState } from 'react';
import { getTimeline } from '../actions/timeline.action';
import { useRouter } from 'next/router';
import moment from 'moment/moment';

export default function Auctions() {
  const auth = useSelector((state) => state.auth);
  const timeline = useSelector((state) => state.timeline);
  const router = useRouter();
  const dispatch = useDispatch();

  const [rev, setRev] = useState([]);

  const reduce = (string) => {
    if (string.length > 60) {

      return string.split('').splice(0, 50).join('')+'...';
    }
    return string
  };

  const toIndianCurrency = (num) => {
    const curr = num?.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    return curr;
  };

  useEffect(() => {
    dispatch(getTimeline());
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap', alignItems: 'center' }}>
        {timeline.waiting ? (
          <CircularProgress />
        ) : (
          timeline.timeline.filter((car)=>{return car.status=='approved'}).map((car, index) => (
            <div key={index}>
              <Paper
                onClick={() => {
                  router.push(`/auction/${car._id}`);
                }}
                elevation={0}
                sx={{
                  width: { xs: '90vw', sm: '43vw', md: '22vw' },
                  borderRadius: '10px',
                  padding: '5px',
                  marginBottom: '20px',
                  mr: '1.3vw',
                  cursor: 'pointer',
                }}
                variant="outlined"
              >
                <Box sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: '20px',
                    }}
                  >
                    <Image
                      width="16"
                      height="9"
                      src={car.photos[0]}
                      layout="responsive"
                      style={{ position: 'absolute', borderRadius: '10px' }}
                      alt={car.modelName}
                    />
                    <Paper
                      sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        height: '35px',
                        position: 'absolute',
                        bottom: '0px',
                        left: '0px',
                        padding: '10px',
                        borderRadius: '0px 10px 0px 10px',
                        color: 'custom',
                      }}
                      elevation={0}
                      variant="outlined"
                    >
                      🕧 {moment(car?.endTime).fromNow()} &nbsp; {toIndianCurrency(car.currentBid)}
                    </Paper>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        height: '35px',
                        background: 'primary',
                        pt: '20px',
                        px: '10px',
                        borderRadius: '0px 10px 0px 0px',
                        color: 'text.primary',
                      }}
                    >
                      {car.modelYear}&nbsp;
                      {car.carCompany}&nbsp;
                      {car.modelName}&nbsp;
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'center',
                        height: '35px',
                        padding: '10px',
                        color: 'text.secondary',
                        py: '30px',
                        px: '10px',
                        fontSize: '15px',
                      }}
                    >
                     Description:  {reduce(car.condition)}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </div>
          ))
        )}
      </Box>
    </div>
  );
}
