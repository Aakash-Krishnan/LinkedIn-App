/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import PostsCard from "../postCard";
import "./index.scss";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import { useLocation } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";

const ProfileCard = ({ currentUser, onEdit }) => {
  const location = useLocation();
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState([]);

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>

        <div className="profile-info">
          <div>
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? currentUser.location
                : currentProfile?.location}
            </p>
          </div>
          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
      </div>

      <div className="post-status-main">
        {allStatus.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfileCard;
