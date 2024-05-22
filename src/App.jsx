import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LazyLoadHandler from "./components/LazyLoadHandler";
import { lazy } from "react";
import Navbar from "./components/Navbar";
import LoginSign from "./pages/LoginSign";

const Board = lazy(() => import("./pages/Board"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <LazyLoadHandler>
        <Routes>
          <Route exact path="/" element={<Board />} />
          <Route exact path="/login" element={<LoginSign />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LazyLoadHandler>
    </Router>
  );
}

export default App;
