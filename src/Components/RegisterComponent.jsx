/* eslint-disable no-unused-vars */
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import { useState } from "react";
import LinkedinLogo from "../assets/linkedinLogo.png";
import "../Scss/LoginComponent.scss";
//for google signin button
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import getUniqueId from "../helpers/getUniqueId";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [credentails, setCredentials] = useState({});

  const register = () => {
    RegisterAPI(credentails.email, credentails.password).then(
      (res) => {
        toast.success("Account successfully registered!");
        localStorage.setItem("userEmail", res.user.email);
        postUserData({
          userID: getUniqueId(),
          name: credentails.name,
          email: credentails.email,
        });
        navigate("/");
      },
      (err) => {
        toast.error(`Cannot register ${err.message}`);
      }
    );
  };

  const googleSignIn = () => {
    GoogleSignInAPI().then(
      (res) => {
        toast.success("Signed In to linkedIn with google");
        localStorage.setItem("userEmail", res.user.email);
        navigate("/home");
      },
      (err) => toast.error("Please check your credentials")
    );
  };

  return (
    <div className="login-wrapper">
      <img className="linkedinLogo" src={LinkedinLogo} alt="" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            className="common-input"
            type="text"
            placeholder="your Name"
            onChange={(e) =>
              setCredentials({ ...credentails, name: e.target.value })
            }
          />
          <input
            className="common-input"
            type="email"
            placeholder="Email or phone number"
            onChange={(e) =>
              setCredentials({ ...credentails, email: e.target.value })
            }
          />
          <input
            className="common-input"
            type="password"
            placeholder="password (6 or mor characters)"
            onChange={(e) =>
              setCredentials({ ...credentails, password: e.target.value })
            }
          />
          <button onClick={register} className="login-btn">
            Agree & join
          </button>
        </div>
        <hr className="hr-text" data-content="Or" />
        <div className="google-btn-container">
          <GoogleButton className="google-btn" onClick={googleSignIn} />
          <p className="go-to-signup">
            Already on LinkedIn?{" "}
            <span className="join-now" onClick={() => navigate("/")}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
