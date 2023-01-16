import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ethgif.gif";

function Signup() {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const [errField, setErrField] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    cpasswordErr: "",
  });
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const submitButton = async () => {
    if (validForm()) {
      let url = "http://localhost:8080/users/add";
      let option = {
        method: "POST",
        url: url,
        headers: {},
        data: inputField,
      };
      try {
        let response = await axios(option);
        if (response.status == 200 && response.status !== 409) {
          toast.success("Added Successfuly!");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } catch (error) {
        toast.error("Email-Id alreay exist");
      }
    } else {
      toast.error("Something went wrong!");
    }
  };
  const validForm = () => {
    let formIsValid = true;
    setErrField({
      nameErr: "",
      emailErr: "",
      passwordErr: "",
      cpasswordErr: "",
    });
    if (inputField.name == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        nameErr: "Please enter name",
      }));
    }
    if (inputField.email == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        emailErr: "Please enter email",
      }));
    }
    if (inputField.password == "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please enter password",
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
    return formIsValid;
  };

  // axios.get("http://localhost:3001/data").then((res) => {
  //   console.log(res.data);
  // });
  //action='http://localhost:3001/create' method='post'

  return (
    <div className='main'>
      <div className='md:flex-[0.8] flex-initial justify-center items-center'>
        <img src={logo} alt='logo' className='w-28 h-50  cursor-pointer' />
      </div>
      <div className='signup-form  text-white '>
        <ToastContainer />
        <form>
          <h2>Create an Account</h2>
          <p className='hint-text text-white'>
            Sign up with your social media account or email address
          </p>
          <div className='social-btn text-center'>
            <a href='#' className='btn btn-outline-primary btn-lg'>
              <i className='fa fa-facebook'></i> Facebook
            </a>
            <a href='#' className='btn btn-outline-info btn-lg'>
              <i className='fa fa-twitter'></i> Twitter
            </a>
            <a href='#' className='btn btn-outline-danger btn-lg'>
              <i className='fa fa-google'></i> Google
            </a>
          </div>
          <div id='or'>or</div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control input-lg'
              autoComplete='off'
              name='name'
              placeholder='Name'
              value={inputField.name}
              onChange={inputHandler}
            />
            <i className='fa-solid fa-user'></i>
            {errField.nameErr.length > 0 && (
              <span className='error_msg'>{errField.nameErr}</span>
            )}
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control input-lg'
              autoComplete='off'
              name='email'
              placeholder='Email Address'
              value={inputField.email}
              onChange={inputHandler}
            />
            <i className='fa-solid fa-envelope'></i>
            {errField.emailErr.length > 0 && (
              <span className='error_msg'>{errField.emailErr}</span>
            )}
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control input-lg'
              name='password'
              autoComplete='off'
              placeholder='Password'
              // required='required'
              value={inputField.password}
              onChange={inputHandler}
            />
            <i className='fa-solid fa-lock'></i>
            {errField.passwordErr.length > 0 && (
              <span className='error_msg'>{errField.passwordErr}</span>
            )}
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control input-lg'
              name='cpassword'
              autoComplete='off'
              placeholder='Confirm Password'
              value={inputField.cpassword}
              onChange={inputHandler}
            />
            <i className='fa-solid fa-lock'></i>

            {errField.cpasswordErr.length > 0 && (
              <span className='error_msg'>{errField.cpasswordErr}</span>
            )}
          </div>
          <div className='form-group'>
            <button
              type='button'
              onClick={submitButton}
              className='btn btn-outline-primary btn-block '
            >
              Sign Up
            </button>
          </div>
          <div className='text-center '>
            Already have an account? <Link to='../Login'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
