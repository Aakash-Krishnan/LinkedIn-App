/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.confic";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/common/Loader/Loader";
import ConnectionsComponent from "../Components/ConnectionsComponant";

const Connections = ({ curentUser }) => {
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
      {loading ? <Loader /> : <ConnectionsComponent curentUser={curentUser} />}
    </div>
  );
};

export default Connections;
