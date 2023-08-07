import { useState } from "react";
import React from 'react';
import {Card, CardContent, Button, TextField, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [user, setUser] =useState({name: "", email: "", password: ""})
  const navigator = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]: value})
  }

  const handleSubmit = async () => {
    console.log(user) 
    const res = await fetch("http://localhost:7000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()

    if(res.ok) {
      navigator("/login")
    } else {
      console.log(data)
    }
  }
  
  return (
    <Card sx={{p:3, maxWidth: "550px", margin: "50px auto", display: "flex", flexDirection: "column"}} elevation={10}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{m:1, textAlign: "center"}}>
          Register Here
        </Typography>
        <TextField id="outlined-basic" label="name" variant="outlined" sx={{width: "100%"}} type={"text"} name={"name"} onChange={handleChange} value={user.name}/>
        <TextField id="outlined-basic" label="email" variant="outlined" sx={{width: "100%"}} type={"email"} name={"email"} onChange={handleChange} value={user.email}  />
        <TextField id="outlined-basic" label="password" variant="outlined" sx={{width: "100%"}} type={"password"} name={"password"} onChange={handleChange} value={user.password} />
        <Button variant= "contained" onClick={() => {
          handleSubmit()
        }} sx={{width: "100%"}}>Register</Button>
      </CardContent>
    </Card>
  )
}

export default Register;