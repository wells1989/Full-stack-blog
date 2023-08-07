import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Actions from './Actions';
import moment from "moment";

export default function PostCard(props) {

    const user = props.user;
    const id = props.id;
    const title = props.title;
    const content = props.content;
    const image = props.image;
    const timestamp = props.timestamp;

    const loggedin_user = localStorage.getItem("user_email")

  return (
    <Card sx={{ width: "100%", boxShadow: "0 0 15px", borderRadius: "5px" }} id = {id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width:"100%", padding: "10px"}} aria-label="recipe">
            {user.name}
          </Avatar>
        }
    action={
          user.email === loggedin_user && <Actions id={id}/> 
          // checking local storage to allow update / delete methods on your own posts
        }
        title={title}
        subheader={moment(timestamp).fromNow()}
      />
      <CardMedia
        component="img"
        height="80%"
        image={image}
        alt={null}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}
