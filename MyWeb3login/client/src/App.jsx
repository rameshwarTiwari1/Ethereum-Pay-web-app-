import {
  BrowserRouter as router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { useContext } from "react";

import Login from "./components/Login/login.jsx";
import Signup from "./components/SignupPage/signup.jsx";
import OtpForm from "./components/ForgetReset/otpform.jsx";
import OtpEnter from "./components/PassChange/otpEnter.jsx";
import LandingP from "./components/HomePage/home";
import { Navbar, Welcome, Footer, Services, Transactions } from "./components";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route
            path="landing"
            element={
              <>
                <Navbar />
                <LandingP />
              </>
            }
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpform" element={<OtpForm />} />
          <Route exact path="/otpenter" element={<OtpEnter />} />
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <Welcome />
                <Services />
                <Transactions />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
