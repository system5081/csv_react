import React from 'react';
import { styled } from '@mui/material/styles';
import {AppBar} from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';

import { withCookies } from 'react-cookie';

// const useStyles=makeStyles((theme)=>({
//     title: {
//         flexGrow: 1,    
//     },
// }));
const TitleTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
  }));

const NavBar = (props) => {
    // const classes=useStyles();

    const Logout =()=>{
        props.cookies.remove('jwt-token');
        window.location.href='/';
    };

  return (
    <AppBar position='static'>
    <Toolbar>
      <button className='logo'>
      </button>
      <TitleTypography variant='h5' >CSV_JIME</TitleTypography>
      <button className='logout' onClick={()=>Logout()}>
        <LogoutIcon />
      </button>
    </Toolbar>
    </AppBar>
  )
}

export default withCookies(NavBar);
