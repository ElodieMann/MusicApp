//App.js
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./components/Library";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Album from './pages/Album/Album';


function App() {
  return (
    <Router>
    <Navbar />
    <Library />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/:id" element={<Album />} />
    </Routes>
  </Router>
  );
}

export default App;
