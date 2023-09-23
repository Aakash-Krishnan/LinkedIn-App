/* eslint-disable no-unused-vars */
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { useState } from "react";
import "../Scss/LoginComponent.scss";
//for google signin button
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { Card, Col, Row, FloatButton, Popover } from "antd";
import userIcon from "../assets/images/user.svg";
import { InfoOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { postUserData } from "../api/FirestoreAPI";
import getUniqueId from "../helpers/getUniqueId";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [credentails, setCredentials] = useState({});

  const login = () => {
    LoginAPI(credentails.email, credentails.password).then(
      (res) => {
        toast.success("Signed In to linkedIn");
        localStorage.setItem("userEmail", res.user.email);
        navigate("/home");
      },
      (err) => toast.error("Please check your credentials")
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
  const content = (
    <div className="project-info">
      <p>This is my personal project to showcase my skills</p>
      <p>The Project is still in development!!</p>
      <p>you can provide a dummy ID to get in and explore</p>
      <h4>Your datas are safe here!</h4>
      <p>
        Link to{" "}
        <a href="https://github.com/Aakash-Krishnan/Sky-App" target="blank">
          GitHub
        </a>{" "}
      </p>
    </div>
  );
  return (
    <div className="login-wrapper">
      <h1 className="app-name">SkyApp</h1>

      <Row className="login-wrapper-inner" gutter={16}>
        <Col>
          <Card>
            <div className="login-wrapper-inner">
              <h1 className="heading">Sign in</h1>
              <p className="sub-heading">
                Stay updated on your professional world
              </p>

              <div className="auth-inputs">
                <input
                  className="common-input"
                  type="email"
                  placeholder="Enter your Email"
                  onChange={(e) =>
                    setCredentials({ ...credentails, email: e.target.value })
                  }
                />
                <input
                  className="common-input"
                  style={{ marginop: "10px" }}
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setCredentials({ ...credentails, password: e.target.value })
                  }
                />
                <button onClick={login} className="login-btn">
                  Sign in
                </button>
              </div>
              <hr className="hr-text" data-content="Or" />
              <div className="google-btn-container">
                <GoogleButton className="google-btn" onClick={googleSignIn} />
                <p className="go-to-signup">
                  New to LinkedIn?{" "}
                  <span
                    className="join-now"
                    onClick={() => navigate("/register")}
                  >
                    Join now
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Popover content={content} title={<h2 className="info-title">SkyApp</h2>}>
        <FloatButton
          icon={<InfoOutlined />}
          badge={{
            dot: true,
            color: "red",
            size: "20",
          }}
          style={{
            right: 94,
            backgroundColor: "white",
          }}
        />
      </Popover>
    </div>
  );
};

export default LoginComponent;
