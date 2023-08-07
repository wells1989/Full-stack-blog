import React, { useState } from "react";
import { Box } from "@mui/material";
import PostCard from "./PostCard";
import { useEffect } from "react";

const DisplayPost = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:7000/api/blog/", {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json()
            if (res.ok) {
                setPosts(data)
            } else {
                console.log(data)
            }
        }
        fetchData()
    }, [posts])

    /* test post data
    const post = [{
        id: 1,
        title: "title 1",
        content: "content 1",
        image: "https://www.shutterstock.com/shutterstock/photos/338250266/display_1500/stock-vector-sample-red-square-grunge-stamp-on-white-sample-stamp-sample-sample-sign-338250266.jpg",
        user: "jack",
        timestamp: "2 days ago"
    },
    {
        id: 2,
        title: "title 2",
        content: "content 2",
        image: "https://images.nightcafe.studio/jobs/90vtZ4ujAMUpvpajs3wm/90vtZ4ujAMUpvpajs3wm.jpg?tr=w-1600,c-at_max",
        user: "joe",
        timestamp: "10 days ago"
    }]
    */

    return (
     <Box sx={{maxWidth: "500px", display: "flex", flexDirection: "column", margin: "auto", gap:3}}>
        {posts.map((post)=>{
            return <PostCard id={post._id} title={post.title} user={post.user} content={post.content} image={post.image} timestamp={post.createdOn} key={post._id}/>
        })}
        </Box>     
    )
}

export default DisplayPost;