import { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../Components/common/Topbar";
import Profile from "../Pages/profile";
import "../Scss/ProfileComponent.scss";

const ProfileLayout = () => {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="profile-page">
      <Topbar />
      <Profile currentUser={currentUser} />
    </div>
  );
};

export default ProfileLayout;
