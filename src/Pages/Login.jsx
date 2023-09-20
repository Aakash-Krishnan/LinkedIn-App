/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.confic";
import LoginComponent from "../Components/LoginComponent";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/common/Loader/Loader";

const Login = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        navigate("/home");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return <div>{loading ? <Loader /> : <LoginComponent />}</div>;
};

export default Login;
