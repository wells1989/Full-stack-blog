import React, { useState } from 'react'
import { Card, CardContent, Typography, TextField, SpeedDial, SpeedDialIcon } from "@mui/material"
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

    const [blog, setBlog] =useState({title: "", content: "", image: ""})
    const navigator = useNavigate()

    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setBlog({...blog, [name]: value})
    }
  
    const handleSubmit = async () => {
        const res = await fetch("http://localhost:7000/api/blog/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        })
        const data = await res.json()
        if(res.ok){
            alert("blog created")
            setBlog({title: "", content: "", image: ""})
            navigator("/")
        }else{
            alert("error in creating blog")
        }
    }

    return (
        <Card sx={{ p: 4, py: 5, maxWidth: "700px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: "15px" }} elevation={10}>
            <CardContent sx={{ m: 0 }}>
                <Typography gutterBottom variant="h4" component="div" sx={{ m: 0, textAlign: "center" }}>
                    Write Blog!
                </Typography>
            </CardContent>
            <TextField id="outlined-basic" label="title" variant="outlined" name='title' onChange={handleChange} value={blog.title} />
            <TextField id="outlined-basic" label="imageURL" variant="outlined" name='image' onChange={handleChange} value={blog.image} />
            <TextField id="outlined-basic" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}} label="content" variant="outlined" name='content' onChange={handleChange} value={blog.content} multiline rows={5}/>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                onClick={handleSubmit}
            />
        </Card>
    )
}

export default CreatePost;