import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import firebase, { tokenSignin, checkSignin } from "../actions/auth.action";
import { useEffect } from "react";
import DashboardDrawer from "../components/DashboardDrawer";
import Reqsignin from "../components/Reqsignin";
import Unauthorized from "../components/Unauthorized";
import { Box, Card, CircularProgress, Paper, Typography } from "@mui/material";
import { getTimeline } from "../actions/timeline.action";
import Image from "next/image";
import { useRouter } from "next/router";
import { verifyCar,rejectCar } from "../actions/list.action";
 import { getUserinfo } from "../actions/userinfo.action";
 import moment from 'moment/moment';
export default function Verifylistings() {
  const auth = useSelector((state) => state.auth);
  const timeline = useSelector((state) => state.timeline);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  const router = useRouter();
  const reduce = (string) => {
    if (string.length > 60) {
      return string.split("").splice(0, 50).join("") + "...";
    }
    return string;
  };
  useEffect(() => {
    dispatch(checkSignin());
    dispatch(getUserinfo(auth.userId,auth.accessToken));
    dispatch(getTimeline());
  }, []);

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
          // justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {timeline.waiting ? (
          <CircularProgress />
        ) : (
          timeline.timeline.filter((data)=>{return data.status=='pending'}).map((car, index) => (
            <Box
              key={index}
              sx={{
                // height: "175px",
                height: "auto",
                // height: {xs:"60vh",md:"27vh"},
                width: "80vw",
                // width: { xs: "60vw", sm: "150px", md: "1050px" },
                display: "flex",
                flexDirection: {xs:"column",md:"row"},
                border: "solid #90caf9 3px",
                borderRadius: "10px",
                marginLeft: { xs: "55px", sm: "150px", md: "240px" },
                marginTop: "15px",
              }}
            >
              <div style={{ margin: "5px" }}>
                <Paper
                  onClick={() => {
                    router.push(`/auction/${car._id}`);
                  }}
                  elevation={0}
                  sx={{
                    width: { xs: "76vw", md: "20vw" },
                    borderRadius: "10px",
                    padding: "5px",
                    // position: 'absolute',npm run dev
                    position: 'relative',
                    // marginBottom: "20px",
                    cursor: "pointer",
                  }}
                  variant="outlined"
                >
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        borderRadius: "20px",
                      }}
                    >
                      <Image
                        width="16"
                        height="9"
                        layout="responsive"
                        src={car.photos[0]}
                        style={{ position: "absolute", borderRadius: "10px" }}
                        alt={car.modelName}
                      />
                    </Box>
                  </Box>
                </Paper>
              </div>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    height: "35px",
                    width:'30vw',
                    background: "primary",
                    pt: "20px",
                    px: "10px",
                    pb:"20px",
                    borderRadius: "0px 10px 0px 0px",
                    color: "text.primary",
                  }}
                >
                  {car.modelYear}&nbsp;
                  {car.carCompany}&nbsp;
                  {car.modelName}&nbsp;
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    height: "35px",
                    padding: "10px",
                    color: "text.secondary",
                    py: "50px",
                    px: "10px",
                    fontSize: "15px",
                    flexWrap:'nowrap',
                  }}
                >
                  <Box
                    sx={{
                      width: "50vw",
                      display: "inline-flex",
                      flexDirection: {xs:'column',sm:'column',md:'row'},
                      flexWrap:'wrap',
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Current Bid Price: ₹{car.currentBid}</div>

                    <div>🕧 {moment(car?.endTime).fromNow()} &nbsp;</div>
                    <div>Total Bids: {car.numberOfBids}</div>
                    <div>Base Price: ₹{car.basePrice}</div>
                  </Box>
                </Box>
                <Box
                    sx={{
                      width: "50vw",
                      display: "inline-flex",
                      flexDirection: {xs:'column',sm:'column',md:'row'},
                      flexWrap:'wrap',
                      justifyContent: "space-between",
                      pt: "10px",
                    pl: "10px",
                    }}
                  >
                   <div>Description: {reduce(car.condition)}</div>
                  </Box>

              </Box>
              <Box
                sx={{
                  height: {xs:"20px",md:"160px"},
                  margin: "5px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  px: "10px",
                    pl: "10px",
                }}
              >
                <Box  sx={{

                display: "flex",
                flexDirection: {xs:'row',sm:'column',md:'column'},
                borderRadius: "2px",
                width:{xs:'130px',sm:'30px',md:'30px'},
                height:'70px',
                color:'black',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}><button onClick={()=>{dispatch(verifyCar(car._id,'approved',auth.accessToken,userinfo))}}>Verify</button>
             <button onClick={()=>{dispatch(rejectCar(car._id,'rejected',auth.accessToken,userinfo))}}>Reject</button></Box>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </div>
  ) : (
    <Unauthorized />
  );
}
