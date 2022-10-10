import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getTimeline } from '../../actions/timeline.action';
import { SettingsCellSharp } from '@mui/icons-material';
import Image from 'next/image';

const AuctionDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { slug },
  } = router;
  const timeline = useSelector((state) => state.timeline);

  const [car, setCar] = useState(null);
  useEffect(() => {
    dispatch(getTimeline());
  }, []);

  useEffect(() => {
    setCar(timeline.timeline.filter((e) => e._id === slug)[0]);
  }, [slug, timeline]);

  const toIndianCurrency = (num) => {
    const curr = num?.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    return curr;
  };

  const carSnippets = {
    width: {
      xs: '100%',
      sm: '100%',
      md: '46%',
    },
    height: {
      xs: '100%',
      sm: '15%',
      md: '15%',
    },
    p: '5px',
    mx: '10px',
    my: '5px',
  };

  const innerSnippet = {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1.3rem' },
  };

  const innerSnippetUpper = { padding: '5px', fontWeight: '600', borderBottom: '1px solid lightgray' };

  const carAttributes = {
    display: 'flex',
    width: '100&',
    justifyContent: 'space-between',
    fontSize: '17px',
    mt: '10px',
  };

  return (
    <div>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box
          sx={{
            width: {
              xs: '100vw',
              sm: '60vw',
              md: '50vw',
            },
          }}
        >
          <Typography variant="h4" >
            {car?.modelYear} {car?.carCompany} {car?.modelName}
          </Typography>
          <Box sx={{ mt: { xs: '2vh', sm: '12vh', md: '6vh' } }}>
            <Carousel>
              {car?.photos.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  width="16"
                  height="9"
                  layout="responsive"
                  alt={car?.modelName}
                  style={{ borderRadius: '10px' }}
                />
              ))}
            </Carousel>
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              xs: '100vw',
              sm: '30vw',
              md: '40vw',
            },
            height: '',
            mx: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Paper variant="outlined" sx={carSnippets}>
            <Paper variant="outlined" sx={innerSnippet}>
              <Box sx={innerSnippetUpper}>Current Bid</Box>

              <Box sx={{ padding: '5px', textAlign: 'right' }}>{toIndianCurrency(6700000)}</Box>
            </Paper>
          </Paper>
          <Paper variant="outlined" sx={carSnippets}>
            <Paper variant="outlined" sx={innerSnippet}>
              <Box sx={innerSnippetUpper}>Time left</Box>
              <Box sx={{ padding: '5px', textAlign: 'right' }}>08:24:50:90</Box>
            </Paper>
          </Paper>
          <Paper variant="outlined" sx={carSnippets}>
            <Paper variant="outlined" sx={innerSnippet}>
              <Box sx={innerSnippetUpper}>Total Bids</Box>
              <Box sx={{ padding: '5px', textAlign: 'right' }}>69</Box>
            </Paper>
          </Paper>
          <Paper variant="outlined" sx={carSnippets}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: '100%', p: '15px', fontSize: { xs: '25px', sm: '20px', md: '36px' } }}
            >
              Place Bid
            </Button>
          </Paper>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, p: '15px', width: '100%' }}>
            <Box sx={{ fontSize: '25px' }}>Details</Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Company</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.carCompany} </Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Model Name</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.modelName} </Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Model Year</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.modelYear} </Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Color</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.color}</Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Kilometers Driven</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.kilometersDriven} Km</Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Base Price</Box>
              <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(car?.basePrice)} </Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Sticker Price</Box>
              <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(car?.fullPrice)} </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, p: '15px', width: '100%' }}>
          {/* <Box>{car?.description}</Box> */}
          <Box sx={{ fontSize: '25px' }}>Details</Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Company</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.carCompany} </Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Model Name</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.modelName} </Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Model Year</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.modelYear} </Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Color</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.color}</Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Kilometers Driven</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.kilometersDriven} Km</Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Base Price</Box>
            <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(car?.basePrice)} </Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Sticker Price</Box>
            <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(car?.fullPrice)} </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
          <Box
            sx={{
              p: '15px',
              width: {
                xs: '100vw',
                sm: '100vw',
                md: '45vw',
              },
              fontSize: '18px',
              color: 'text.primary',
            }}
          >
            <Box sx={{ fontSize: '22px', color: 'text.secondary', mb: '10px' }}>Description</Box>
            {car?.description}
          </Box>
          <Box
            sx={{
              p: '15px',
              width: {
                xs: '100vw',
                sm: '100vw',
                md: '45vw',
              },
              fontSize: '18px',
              color: 'text.primary',
            }}
          >
            <Box sx={{ fontSize: '22px', color: 'text.secondary', mb: '10px' }}>Condition</Box>
            {car?.condition}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AuctionDetail;
