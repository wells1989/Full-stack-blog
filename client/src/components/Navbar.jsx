import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AppBar, Box, Toolbar, Button, useMediaQuery, IconButton} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../App';
import { useContext, useEffect, useState} from 'react';

const Navbar= () => {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {auth, setAuth, refresh, setRefresh} = useContext(AuthContext);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNonMobileDevice = useMediaQuery("(min-width: 1000px)") // changes settings for smaller devices
  
  useEffect(() => {
    const fetchUser = async () => {
    const res = await fetch("http://localhost:7000/api/user/auth", {
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    // above links to auth route, which provides auth data from the token (if it exists) and gets the token from local storage
    })
    const data = await res.json()
    if (res.ok) {
      setAuth(data)
      setRefresh(false)
    }else{
      setAuth(null)
    }
  }
  fetchUser()
}, [auth, refresh])

    const logout = () => {
      navigate("/login")
      localStorage.clear() // to remove the token and the logged in user email (used to filter permissions for update / delete)
      setRefresh(true)
    }
  
  return (
    <AppBar sx={{p: "2% 10%"}}>
      <Toolbar sx={{justifyContent: "space-between"}}>
      <h3>Blog</h3>
      <Box sx={{display: "flex", alignItems: "center", gap: 5}}>
        {isNonMobileDevice? 
        <>
        {auth ? 
        <>
        <Button><Link style={{color: "#ffff", textDecoration: "none"}} to={("/")}>Home</Link></Button>
        <Button><Link style={{color: "#ffff", textDecoration: "none"}} to={("/create")}>Create</Link></Button>
        <Button color= "inherit" onClick={logout}>Logout</Button>
        </>
        : 
        <>
        <Button><Link style={{color: "#ffff", textDecoration: "none"}} to={("/login")}>Login</Link></Button>
        <Button><Link style={{color: "#ffff", textDecoration: "none"}} to={("/register")}>Register</Link></Button>
         </>}
        </> 
        // above, display is Non mobile device, i.e. large screens, below displayed on smaller devices (menu and drop down options)

        : <> <IconButton 
        sx={{color: "#ffff"}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
          <MenuIcon/>
        </IconButton>

        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        // menu links below, links to the different pages
      >
        {auth ? [
        <MenuItem onClick={handleClose}><Link style={{color: "black", fontWeight: "800"}} to={"/"}>Home</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link style={{color: "black", textDecoration: "none"}} to={("/create")}>Create Post</Link></MenuItem>,
        <MenuItem onClick={() => {handleClose(); logout()}} color="inherit">Logout</MenuItem>
          ]  :
          [
        <MenuItem onClick={handleClose}><Link style={{color: "black", textDecoration: "none"}} to={("/login")}>login</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link style={{color: "black", textDecoration: "none"}} to={("/register")}>register</Link></MenuItem>
          ]
      }
      </Menu> 
      

        </>} 
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar