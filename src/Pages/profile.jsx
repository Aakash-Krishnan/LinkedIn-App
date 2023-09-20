/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.confic";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/common/Loader/Loader";

import ProfileComponent from "../Components/ProfileComponent";

const Profile = ({ currentUser }) => {
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
      {loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />}
    </div>
  );
};

export default Profile;
