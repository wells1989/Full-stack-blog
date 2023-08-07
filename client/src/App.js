import React, { createContext } from 'react';
import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/Navbar";
import { Container } from '@mui/material';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';

export const AuthContext = createContext();

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [auth, setAuth] = useState(null);

  return (
      <AuthContext.Provider value={{auth, setAuth, refresh, setRefresh}}>
      <BrowserRouter>
        <NavBar/>

        <Container sx={{p:1, mt: 15}}>

          <Routes>
              <Route path='/' element = {<Home />}/>
              <Route path='/login' element = {<Login />}/>
              <Route path='/register' element = {<Register />}/>
              <Route path='/create' element = {<CreatePost />}/>
              <Route path='/update/:id' element = {<UpdatePost />}/>
              {!localStorage.getItem("token") && <Route path='*' element={<Login/>}/>}
          </Routes>

        </Container>

      </BrowserRouter>
      </AuthContext.Provider>
  )
}

export default App;