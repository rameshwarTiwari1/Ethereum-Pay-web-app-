import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ethgif.gif";

const Login = () => {
  const { useState } = React;
  // const [inputtext, setinputtext] = useState({
  //   email: "",
  //   password: "",
  // });

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);
  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
      settype(true);
    } else {
      setpassword("password");
      seteye(true);
      settype(false);
    }
  };

  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errField, setErrField] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const validForm = () => {
    let formIsValid = true;
    setErrField({
      emailErr: "",
      passwordErr: "",
    });

    if (inputField.email === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        emailErr: "Please enter email",
      }));
    }
    if (inputField.password === "") {
      formIsValid = false;
      setErrField((prevState) => ({
        ...prevState,
        passwordErr: "Please enter password",
      }));
    }

    return formIsValid;
  };
  const inputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const submitButton = async () => {
    if (validForm()) {
      let url = "http://localhost:8080/users/login";
      let options = {
        method: "POST",
        url: url,
        headers: {},
        data: inputField,
      };
      try {
        let response = await axios(options);
        console.log(response);
        if (response.data.data.message == "Login Successfully") {
          toast.success("hii Login Successfuly!");
          localStorage.setItem("token", response.data.data.token);
          //  console.log(localStorage.getItem("token"));
          setTimeout(() => {
            navigate("../home ");
          }, 1100);
        } else {
          toast.error(response.data.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Form Invalid!");
    }
  };

  return (
    <div className='main '>
      <div className='md:flex-[0.8] flex-initial justify-center items-center'>
        <img src={logo} alt='logo' className='w-40 h-50  cursor-pointer' />
      </div>
      <div className='container EditContainer'>
        <div className='card card-shadow'>
          <div className='text'>
            <h3 className='text-white'>Welcome Back</h3>
            <p className='text-white'>
              Enter your credentials to access your account.
            </p>
          </div>
          <ToastContainer />
          <form>
            <div className='input-text'>
              <input
                type='email'
                placeholder='Enter your email'
                value={inputField.email}
                onChange={inputHandler}
                name='email'
                autoComplete='off'
              />

              <i className='fa fa-envelope'></i>
              {errField.emailErr.length > 0 && (
                <span className='error_msg'>{errField.emailErr}</span>
              )}
            </div>
            <div className='input-text'>
              <input
                type={password}
                className='Password-first'
                placeholder='Enter your password'
                value={inputField.password}
                onChange={inputHandler}
                name='password'
                autoComplete='off'
              />

              <i className='fa fa-lock'></i>
              {errField.passwordErr.length > 0 && (
                <span className='error_msg'>{errField.passwordErr}</span>
              )}
              <i
                onClick={Eye}
                className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </div>
            <div className='buttons'>
              <button type='button' className="btn-btn-outline-primary" onClick={submitButton}>
                Sign in
              </button>
            </div>
            <div className='forgot'>
              <p className='text-white'>
                Forgot your password?{" "}
                <Link className='reset' to='../Otpform'>
                  Reset Password
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      );
    </div>
  );
};
// ReactDOM.render(<Form />, document.getElementById("root"));

export default Login;
