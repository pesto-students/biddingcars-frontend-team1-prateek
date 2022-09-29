import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function Layout({children}) {
  return (
    <React.Fragment>
      <CssBaseline />
          <Container sx={{marginTop:'70px'}} maxWidth='xl'>
              {children}
              
      </Container>
    </React.Fragment>
  );
}
