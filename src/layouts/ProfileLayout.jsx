import { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../Components/common/Topbar";
import Profile from "../Pages/profile";

const ProfileLayout = () => {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar />
      <Profile currentUser={currentUser} />
    </div>
  );
};

export default ProfileLayout;
