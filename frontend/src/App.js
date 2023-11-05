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
import Login from "./pages/LoginRegister/Login";
import Register from "./pages/LoginRegister/Register";

function App() {
  const [token, setToken] = useState("");

  const [isLog, setIsLog] = useState(
    localStorage.getItem("isLog") === "true" || false
  );
  useEffect(() => {
    localStorage.setItem("isLog", isLog);
  }, [isLog]);


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
      {isLog ? (
        <div className="musicapp">
         
          <div>
            <Navbar />
            <Library />
          </div>
          <Routes>
            
            <Route path="/" element={<Home token={token}  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search token={token} />} />
            <Route path="/search/:id" element={<Album token={token} />} />
          </Routes>
        </div>
      ) : (
        
        <Routes>
          <Route path="/" element={<Login setIsLog={setIsLog} />} />
          
          <Route path="/register" element={<Register setIsLog={setIsLog} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
