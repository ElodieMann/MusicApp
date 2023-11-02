//App.js
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./components/Library/Library";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Album from "./pages/Album/Album";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login/Login";

function App() {

  const [token, setToken] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "a0daa57c8ea4404caae7e7a8a42df5e1",
          client_secret: "ba77fd9929924e868318091cf91f53d9",
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

  return (
    <Router>
      {/* <div>
        <Navbar />
        <Library />
      </div> */}
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/search" element={<Search token={token}/>} />
        <Route path="/search/:id" element={<Album />} />
      </Routes>
    </Router>
  );
}

export default App;
