# Full Stack Blog

This project was a a fully functional full stack blog app, creating both the backend and frontend from scratch and integrating the two

## Installation

### API server

```bash
cd api
npm install
npm start
```
#### dependencies

```javascript
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.1",
    "mongodb": "^5.7.0",
    "mongoose": "^7.4.1"
  },
```
### React frontend

```bash
cd client
npm install
npm start
```

#### Front-end dependencies

```javascript
"dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.1",
    "@mui/material": "^5.14.2",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "moment": "^2.29.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
```
## Features

### logging in / registering

![alt text](https://github.com/wells1989/Full-stack-blog/assets/122035759/8422d685-d6bd-4104-9d3e-60c320cb0d47)

![alt text](https://github.com/wells1989/Full-stack-blog/assets/122035759/687a7ac5-2b8f-443f-8730-21f81c48980a)

#### Backend routes

- POST http://localhost:7000/api/user/login
- POST http://localhost:7000/api/user/logout
- POST http://localhost:7000/api/user/register

### Homepage

![alt text](https://github.com/wells1989/Full-stack-blog/assets/122035759/7387e796-11af-4514-b3d5-11118eb733b9)

#### Backend routes

- GET http://localhost:7000/api/blog/

### Create / Update blog posts

![alt text](https://github.com/wells1989/Full-stack-blog/assets/122035759/c1a2bb36-71fa-433b-bc29-689493a80b93)

![alt text](https://github.com/wells1989/Full-stack-blog/assets/122035759/4c4871a2-9e00-4e66-99d2-e9f357226d66)

#### Backend routes

- POST http://localhost:7000/api/blog/create
- PUT http://localhost:7000/api/blog/update/:id
- DELETE http://localhost:7000/api/blog/delete/:id

## Personal Notes

### Project Goals

To create a fully functional full stack app from scratch, developing both the api server and the front end components (to practice React and linking the front and back ends together.)

### Successes

- The middleware authentication in the back and front end was challenging but I was able to fully implement it, and do so in a different way to my prior projects.
- I gained experience using React and MUI materials to easily format and template basic front end UI's.
- I used the MUI interface and Auth Context in the front end to alter the UI depending on the logged in status and the logged in user (limiting the update / delete options only for the user's own posts.)

### Areas to work on in the next project

- The App could have been more advanced (searching for posts / adding like and comment buttons for posts etc) although the goal here was functionality rather than complexity.
- As I hadn't created a new React UI for a while the React components took longer than expected
