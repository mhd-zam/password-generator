import "./App.css";
import ExternalContext from "./context/ExternalContext";
import AdminLogin from "./pages/AdminLogin";
import Adminhome from "./pages/Adminhome";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OutsideAuth from "./pages/OutsideAuth";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <BrowserRouter>
      <ExternalContext>
        <Routes>
          <Route element={<Auth />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<OutsideAuth />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Route>
          <Route  >
            <Route path="/Admin" element={<AdminLogin />} />
            <Route path="/Adminhome" element={<Adminhome/>} />
          </Route>
        </Routes>
      </ExternalContext>
    </BrowserRouter>
  );
}

export default App;
