//App.js
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Library from "./components/Library/Library";
import Search from "./pages/Search/Search";
import Album from "./pages/Album/Album";
import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "./redux/playlist";
import { getUserId, isLog } from "./redux/userId";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";


import "./App.css";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId.userId);
  const log = useSelector((state) => state.userId.isLog);


  const [token, setToken] = useState("");

  useEffect(() => {
    fetchData();
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [userId]);

  const getData = async () => {
    if (!userId) return
    try {
      const response = await axios.get(
        `http://localhost:3300/playlists/${userId}`
      );
      dispatch(getPlaylist(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "de5f0165882c43e8979310a70debebd3",
          client_secret: "003d3b9e0ff045299c03523b28598270",
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setToken(response.data.access_token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logOut = () => {
    dispatch(getUserId(""));
    dispatch(isLog(false));
  };

  return (
    <Router>
      <div className="musicapp">
        {log ? (
          <Link className="btnLog" onClick={logOut} to="/login">
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
          </Link>
        ) : (
          <Link className="btnLog" to="/login">
            <FontAwesomeIcon icon={faArrowRightToBracket} /> Log In
          </Link>
        )}
        <div>
          <Navbar />
          <Library />
        </div>
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search token={token} />} />
          <Route path="/search/:id" element={<Album token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
