import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from "./components/Navbar";
import CreateUser from "./components/CreateUser";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
