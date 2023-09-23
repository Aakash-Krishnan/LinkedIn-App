/* eslint-disable no-unused-vars */
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import { useState } from "react";
import "../Scss/LoginComponent.scss";
import { Card, Col, Row } from "antd";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import userIcon from "../assets/images/user.svg";

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
          imageLink: userIcon,
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
        postUserData({
          userID: getUniqueId(),
          name: res.user.displayName,
          email: res.user.email,
          imageLink: userIcon,
        });
        navigate("/home");
      },
      (err) => toast.error("Please check your credentials")
    );
  };

  return (
    <div className="login-wrapper">
      <h1 className="app-name">SkyApp</h1>

      <Row className="login-wrapper-inner" gutter={16}>
        <Col>
          <Card>
            <div className="login-wrapper-inner">
              <h1 className="heading">
                Join our media and connect with your friends
              </h1>
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterComponent;
