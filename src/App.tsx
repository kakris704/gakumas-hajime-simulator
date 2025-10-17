import React, { useEffect } from 'react';
import './App.css';
import { createTheme, Stack, ThemeProvider } from '@mui/material';
import Schedule from './components/schedule/Container'
import InputArea from './components/inputSupport/Container'
import ResultView from './components/resultView/Container'

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: 'IBM Plex Sans JP',
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className='App' style={{width:"99vw",display:"flex",justifyContent:"center"}}>
      
      <Stack
        direction="row" spacing={2}
      >
        <Schedule />
        <Stack direction="column" spacing={5}>
          <InputArea/>
          <ResultView />
        </Stack>
      </Stack>
      </div>
      <div className='AppWrapper'></div>
    </ThemeProvider>
  );
}

export default App;
