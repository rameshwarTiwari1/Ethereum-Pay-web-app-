import axios from "axios";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./otpform.css";
import OtpEnter from "../PassChange/otpEnter";
import logo from "../assets/ethgif.gif";

const Otpform = () => {
  // for showing error if inputfield is empty
  useEffect(() => {});
  const navigate = useNavigate();
  const emailRef = useRef();
  const [otpform, showForm] = useState(true);
  const [inputField, setInputField] = useState({
    email: "",
  });
  const [errField, setErrField] = useState({
    emailErr: "",
  });
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      emailErr: "",
    });
    if (inputField.email === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        emailErr: "Please enter email",
      }));
    }

    return formIsValid;
  };
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  // const submitButton = () => {

  // };

  // API call for send otp
  const sendOTP = async () => {
    validForm();
    try {
      let url = "http://localhost:8080/users/email-send";
      let options = {
        method: "POST",
        url: url,
        data: { email: emailRef.current.value },
      };
      let response = await axios(options);
      let record = response.data;
      if (record.statusText == "success") {
        toast.success(record.message);
        showForm(false);
        // setTimeout(() => {
        //   navigate("../otpenter");
        // }, 1500);
      } else {
        toast.error(record.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  //action='http://localhost:3001/otplogin' method='POST'
  return (
    <div className='main'>
      <ToastContainer />
      <div className='md:flex-[0.8] flex-initial justify-center items-center'>
        <img src={logo} alt='logo' className='w-40 h-50  cursor-pointer' />
      </div>
      {otpform ? (
        <form>
          <div className='container  EditContainer text-white'>
            <div className='card card-shadow'>
              <div className='card-header '>
                <h3>Reset Password</h3>
              </div>
              <div className='card-body'>
                <label className='label'>Email:</label>
                <input
                  className='input form-control'
                  type='email'
                  name='email'
                  placeholder='email'
                  ref={emailRef}
                  onClick={inputHandler}
                  // required
                />
                {errField.emailErr.length > 0 && (
                  <span className='error_msg'>{errField.emailErr}</span>
                )}
                <button
                  type='button'
                  onClick={sendOTP}
                  className='btn col mt-4 btn-lg btn-outline-primary'
                >
                  Send OTP
                </button>
                <br></br>
                <Link to='/'>
                  <button
                    className='btn mt-3 col btn-outline-danger btn-lg '
                    type='button'
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <OtpEnter email={emailRef.current.value} />
      )}
    </div>
  );
};

export default Otpform;
