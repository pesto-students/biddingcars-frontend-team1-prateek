import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
const drawerWidth = 240;

export default function DashboardDrawer(props) {
    const router = useRouter();
    const { window } = props;
    const auth = useSelector((state) => state.auth);
    const navItems = auth.role==='admin'? [
        { name: 'Profile', link: '/profile' },
        { name: 'My Listings', link: '/mylistings' },
        { name: 'Settings', link: '/settings' },
        { name: 'Verify Listings', link: '/verifylistings' },

      ]:[
        { name: 'Profile', link: '/profile' },
        { name: 'My Listings', link: '/mylistings' },
        { name: 'Settings', link: '/settings' },
      ];

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop:'10vh',
            paddingTop:'5vh',
          },
        }}
        variant="permanent"
        anchor="left"
      >

      <Box sx={{ display: { xs: 'none', sm: 'block' },
              display:'flex',
              alignItems:'center',
              flexDirection:'column', }}>
          {navItems.map((item, i) => {
            {console.log(item.link,router.pathname)}
            if (item.link === router.pathname ||
              item.link.includes('auction') &&router.pathname.includes('auction')) {
              return (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  key={i}
                  onClick={() => router.push(item.link)}
                  sx={{
                    height: '7vh',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    px: 2,
                    textTransform: 'capitalize',
                    width: '150px',
                  }}
                >
                  {item.name}
                </Button>
              );
            } else {
              return (
                <Button

                  size="large"
                  key={i}
                  onClick={() => router.push(item.link)}
                  sx={{
                    height: '7vh',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    px: 2,
                    textTransform: 'capitalize',
                    width: '150px',
                    justifyContent:'centre',
                    alignItems:'centre'

                  }}
                >
                  {item.name}
                </Button>
              );
            }
          })}
        </Box>
        </Drawer>
    </Box>
  );
}
