import React, { useState, useEffect } from "react";

import Login from "./pages/auth/login/Login";
import Home from "./pages/user/Home";
import Mawsd from "./pages/user/Mawsd";

// V.6
import { Routes, Route } from "react-router-dom";

// functions
import { currentUser } from "./functions/auth";
// redux
import { useDispatch } from "react-redux";

// Routes
import UserRoute from "./routes/UserRoute";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        //err
        console.log(err);
      });
  }


  return (
    <div className="App">
      {/* <Register/> */}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/user/index"
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        />

       <Route
          path="/user/mawsd"
          element={
            <UserRoute>
              <Mawsd />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
