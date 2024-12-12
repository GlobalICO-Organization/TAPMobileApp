import React from 'react'
import {
  Grid,
  AppBar,
  Toolbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {  useLocation } from 'react-router'
import CryptoJS from 'crypto-js';

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: '#EBEBF5'
  },
})

const Header = () => {
  const classes = useStyles();
  const location = useLocation();
  // Get the pathname without the leading slash
  const userId = location.pathname.startsWith('/')
    ? location.pathname.slice(1)
    : location.pathname;
  let tuserId = userId ? userId?.replace(/p1L2u3S/g, '+')?.replace(/s1L2a3S4h/g, '/')?.replace(/e1Q2u3A4l/g, '=') : ''
  let bytes = CryptoJS.AES.decrypt(tuserId, 'direction is better than speed');
  const apiKey = bytes.toString(CryptoJS.enc.Utf8);
  const apiData = process.env.REACT_APP_SERVER_URLS;
  const jsonArray = JSON.parse(apiData)

  const getImageUrlByKeyValue = (key) => {
    const item = jsonArray.find(item => item.key === key);
    return item ? item.imageUrl : ''; // Return the companyName or an empty string if not found
  };
  const imageUrl = getImageUrlByKeyValue(apiKey) || "./VeepUSA.png";

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <img
              src={imageUrl}
              alt="Veep.png"
              height="50"
              width="150"
            />
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Header