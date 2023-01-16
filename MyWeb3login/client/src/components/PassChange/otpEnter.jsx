import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./otpform.css";
import "./otpenterAutofocus.js";

const OtpEnter = (props) => {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    otpcode: "",
    password: "",
    cpassword: "",
  });
  const [errField, setErrField] = useState({
    otpcodeErr: "",
    passwordErr: "",
    cpasswordErr: "",
  });
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      otpcodeErr: "",
      passwordErr: "",
      cpasswordErr: "",
    });

    if (inputField.password == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please enter new password",
      }));
    }
    if (inputField.cpassword == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        cpasswordErr: "Please enter confirm password",
      }));
    }
    if (
      inputField.cpassword != "" &&
      inputField.password != inputField.cpassword
    ) {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        cpasswordErr: "Password did not match",
      }));
    }
    if (inputField.otpcode == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        otpcodeErr: "Please enter otpcode",
      }));
    }

    return formIsValid;
  };
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const submitButton = async () => {
    // console.log(inputField,props);
    Object.assign(inputField, props);
    if (validForm()) {
      let url = "http://localhost:8080/users/change-password";
      let options = {
        method: "POST",
        url: url,
        data: inputField,
      };
      try {
        let response = await axios(options);
        
        // console.log("hiiresponse",response);
        if (response.data.satusText == "Success") {
          toast.success(response.data.message);
        } else {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("../Login");
          }, 1500);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Form Invalid!");
    }
  };
  // console.log("otpenter", localStorage.getItem("token"));

  return (
    <div className="main text-white">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card py-1 px-1">
          <ToastContainer />
          <form>
            <h5 className="m-0 text-center font-bold">Email varification</h5>
            <br></br>
            <span className="mobile-text">
              Enter the code we just send on your email
            </span>

            <div>
              <input
                className="textdesign"
                type="text"
                name="otpcode"
                autoComplete="off"
                value={inputField.otpcode}
                onChange={inputHandler}
                maxLength="4"
              />
            </div>
            {errField.otpcodeErr.length > 0 && (
              <span className="error_msg">{errField.otpcodeErr}</span>
            )}

            <br></br>
            <div className="form form-group">
              <label className="text-white">New Password:</label>
              <input
                className="textdesign"
                value={inputField.password}
                type="password"
                onChange={inputHandler}
                name="password"
              />
              {errField.passwordErr.length > 0 && (
                <span className="error_msg">{errField.passwordErr}</span>
              )}
              <br></br>
              <br></br>
              <label className="text-white">Confirm Password:</label>
              <input
                className="textdesign"
                value={inputField.cpassword}
                type="password"
                name="cpassword"
                onChange={inputHandler}
              />
              {errField.cpasswordErr.length > 0 && (
                <span className="error_msg">{errField.cpasswordErr}</span>
              )}
            </div>
            <br></br>
            <button
              type="button"
              onClick={submitButton}
              className="btn  btn-outline-primary text-white">
              Submit
            </button>

            <div className="text-center mt-4">
              <span className="d-block mobile-text">
                Don't receive the code?
              </span>
              <span className="font-weight-bold text-danger cursor">
                <button> Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpEnter;
