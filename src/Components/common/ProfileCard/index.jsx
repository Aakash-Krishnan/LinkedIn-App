/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import PostsCard from "../postCard";
import "./index.scss";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
import { HiOutlinePencil } from "react-icons/hi";
import { uploadImageAPI } from "../../../api/ImageUploadAPI";

const ProfileCard = ({ currentUser, onEdit }) => {
  const location = useLocation();
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser?.id,
      setModalOpen,
      setCurrentImage,
      setProgress
    );
  };

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
      <FileUploadModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getImage={getImage}
        uploadImage={uploadImage}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" onClick={onEdit} />
        </div>

        <div className="profile-info">
          <div>
            <img
              onClick={() => setModalOpen(true)}
              className="profile-img"
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-img"
            />
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
                ? `${currentUser.city} | ${currentUser.country}`
                : `${currentUser.city} | ${currentUser.country}`}
            </p>
            <a
              className="website"
              href={
                Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website
              }
              target="blank"
            >
              {Object.values(currentProfile).length === 0
                ? `${currentUser.website}`
                : currentProfile?.website}
            </a>
          </div>
          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.industry
                : currentProfile?.industry}
            </p>
          </div>
        </div>
        <p className="about">
          {Object.values(currentProfile).length === 0
            ? `${currentUser.aboutme}`
            : currentProfile?.aboutme}
        </p>

        <p className="skills">
          <span className="">Skills: </span>
          {Object.values(currentProfile).length === 0
            ? `${currentUser.skills}`
            : currentProfile?.skills}
        </p>
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
