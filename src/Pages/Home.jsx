/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.confic";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/common/Loader/Loader";

import HomeComponent from "../Components/HomeComponent";

const Home = ({ curentUser }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      {loading ? <Loader /> : <HomeComponent curentUser={curentUser} />}
    </div>
  );
};

export default Home;
