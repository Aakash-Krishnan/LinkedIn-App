import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import LogoImg2 from "../../../assets/images/LogoImg2.jpg";
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
import { getCurrentUser, getAllUsersAPI } from "../../../api/FirestoreAPI";
import SearchUser from "../SearchUsers";
import { AiOutlineClose } from "react-icons/ai";

const Topbar = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  // 10:05:05

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: { id: user.id, email: user.email },
    });
  };

  useEffect(() => {
    getAllUsersAPI(setUsers);
  }, []);

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => clearTimeout(debounced);
  }, [searchInput]);

  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup currentUser={currentUser} />
        </div>
      ) : (
        <></>
      )}

      <img className="skyappLogo" src={LogoImg2} alt="SkyAppLogo" />
      {isSearch ? (
        <div className="search-container">
          <SearchUser setSearchInput={setSearchInput} />
          <AiOutlineClose
            className="close-icon"
            onClick={() => {
              setSearchInput("");
              setIsSearch(false);
            }}
          />
        </div>
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            size="30px"
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            size="30px"
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <AiOutlineUserSwitch
            size="30px"
            className="react-icon"
            onClick={() =>
              navigate("/connections", {
                state: { id: currentUser?.id },
              })
            }
          />
          <BsBriefcase size="30px" className="react-icon" />
          <AiOutlineMessage size="30px" className="react-icon" />
          <AiOutlineBell size="30px" className="react-icon" />
        </div>
      )}
      <img
        className="user-logo"
        src={currentUser.imageLink ? currentUser.imageLink : user}
        alt="user"
        onClick={displayPopup}
      />

      {searchInput.length > 0 && (
        <div className="search-results">
          {filteredUsers.length ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="search-inner"
                onClick={() => openUser(user)}
              >
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          ) : (
            <p className="search-nodata">{`No results found :(`}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Topbar;
