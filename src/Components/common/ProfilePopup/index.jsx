import "./index.scss";
import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button";
import user from "../../../assets/images/user.svg";

const ProfilePopup = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const navigate = useNavigate();

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="popup-card">
      <div className="user-details">
        <img className="user-img" src={user} />

        <div className="user-info">
          <p className="name">{currentUser.name}</p>
          <p className="headline">{currentUser.headline}</p>
        </div>
      </div>
      {/* <hr className="hline"></hr> */}

      <div className="btn-container">
        <Button
          onClick={() =>
            navigate("/profile", {
              state: { id: currentUser?.userID },
            })
          }
          title="View Profile"
        />
        <Button onClick={onLogout} title="Sign out" />
      </div>
    </div>
  );
};

export default ProfilePopup;
