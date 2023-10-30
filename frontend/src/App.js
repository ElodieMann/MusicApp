import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "./components/Library";

function App() {
  return (
    <Router>
      <Navbar />
      <Library />
      <Routes></Routes>
    </Router>
  );
}

export default App;
