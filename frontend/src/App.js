import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "./redux/playlist";
import { getUserId, isLog } from "./redux/userId";
import { getDataPlaylist, getToken } from "./services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Library from "./components/Library/Library";
import Search from "./pages/Search/Search";
import Album from "./pages/Album/Album";
import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";
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
      const response = await getDataPlaylist(userId)
      dispatch(getPlaylist(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getToken()
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
