import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import linkedinLogo from "../../../assets/linkedinLogo.png";
import user from "../../../assets/images/user.svg";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import ProfilePopup from "../ProfilePopup";
import { getCurrentUser } from "../../../api/FirestoreAPI";

const Topbar = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup currentUser={currentUser} />
        </div>
      ) : (
        <></>
      )}
      <img className="linkedinLogo" src={linkedinLogo} alt="linkedInLogo" />
      <div className="react-icons">
        <AiOutlineSearch size="30px" className="react-icon" />
        <AiOutlineHome
          size="30px"
          className="react-icon"
          onClick={() => goToRoute("/home")}
        />
        <AiOutlineUserSwitch
          size="30px"
          className="react-icon"
          onClick={() =>
            navigate("/profile", {
              state: { id: currentUser?.id },
            })
          }
        />
        <BsBriefcase size="30px" className="react-icon" />
        <AiOutlineMessage size="30px" className="react-icon" />
        <AiOutlineBell size="30px" className="react-icon" />
      </div>
      <img
        className="user-logo"
        src={currentUser.imageLink ? currentUser.imageLink : user}
        alt="user"
        onClick={displayPopup}
      />
    </div>
  );
};

export default Topbar;
