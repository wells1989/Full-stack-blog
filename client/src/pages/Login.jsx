import React, { useContext } from 'react';
import { useState } from 'react';
import {Card, CardContent, Button, TextField, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';

const Login = () => {

  const [user, setUser] =useState({email: "", password: ""})
  const {setRefresh} = useContext(AuthContext);
  const navigator = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]: value})
  }

  const handleSubmit = async () => {

    const res = await fetch("http://localhost:7000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()

    if(res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_email", user.email)
      setRefresh(true)
      navigator("/")
    } else {
      console.log(data)
    }
  }
  
  return (
    <Card sx={{p:3, maxWidth: "550px", margin: "50px auto", display: "flex", flexDirection: "column"}} elevation={10}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{m:1, textAlign: "center"}}>
          Login Here
        </Typography>
        <TextField id="outlined-basic" label="email" variant="outlined" sx={{width: "100%"}} type={"email"} name={"email"} onChange={handleChange} value={user.email}  />
        <TextField id="outlined-basic" label="password" variant="outlined" sx={{width: "100%"}} type={"password"} name={"password"} onChange={handleChange} value={user.password} />
        <Button variant= "contained" sx={{width: "100%"}} onClick={handleSubmit}>Login</Button>
      </CardContent>
    </Card>
  )
}

export default Login;