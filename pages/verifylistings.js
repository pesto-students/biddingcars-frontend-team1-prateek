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
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {timeline.waiting ? (
          <CircularProgress />
        ) : (
          timeline.timeline.filter((data)=>{return data.status=='pending for approval'}).map((car, index) => (
            <div
              key={index}
              style={{
                // height: "175px",
                // width: "1050px",
                width: { xs: "60vw", sm: "80vw", md: "100vw" },
                height: { xs: "60vw", sm: "50vw", md: "40vw" },
                display: "flex",
                flexDirection: "row",
                border: "solid #90caf9 3px",
                borderRadius: "10px",
                marginLeft: "240px",
                marginTop: "15px",
              }}
            >
              <div style={{ margin: "5px" }}>
                <Paper
                  onClick={() => {
                    router.push(`/auction/${car._id}`);
                  }}
                  elevation={5}
                  sx={{
                    width: { xs: "60vw", sm: "34vw", md: "20vw" },
                    borderRadius: "10px",
                    padding: "5px",
                    marginBottom: "20px",
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
                    background: "primary",
                    pt: "20px",
                    px: "10px",
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
                    py: "30px",
                    px: "10px",
                    fontSize: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "600px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>Current Bid Price: ₹{car.currentBid}</div>

                    <div>🕧 10 days &nbsp;</div>
                    <div>Total Bids: {89}</div>
                    <div>Base Price: ₹{car.basePrice}</div>
                  </div>
                </Box>
                {reduce(car.condition)}
              </Box>
              <div
                style={{
                  height: "160px",
                  margin: "5px",
                  width: "80px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <button onClick={()=>{dispatch(verifyCar(car._id,'approved',auth.accessToken,userinfo))}}>Verify</button>
                <button onClick={()=>{dispatch(rejectCar(car._id,'rejected',auth.accessToken,userinfo))}}>Reject</button>
              </div>
            </div>
          ))
        )}
      </Box>
    </div>
  ) : (
    <Unauthorized />
  );
}
