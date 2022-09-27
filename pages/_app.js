import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Provider } from 'react-redux';
import store from '../store';

const ColorModeContext = React.createContext({ MyApp: () => {} });

export function UISwitch() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: 'flex',
        // width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // bgcolor: 'background.default',
        color: 'text.primary',
        // borderRadius: 1,
        p: 1,
      }}
    >
      
      <IconButton onClick={colorMode.MyApp} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default function MyApp({ Component, pageProps }) {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      MyApp: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        {/* <App /> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
