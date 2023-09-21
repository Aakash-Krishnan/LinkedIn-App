/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import LikeButton from "../LikeButton";
import { getCurrentUser, getAllUsersAPI } from "../../../api/FirestoreAPI";

const PostsCard = ({ posts }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsersAPI(setAllUsers);
  }, []);

  return (
    <div className="posts-card">
      <div className="name-timestamp-container">
        <div className="post-image-wrapper">
          <img
            alt="profile-img"
            className="post-image"
            src={
              allUsers
                .filter((user) => user.userID === posts.userID)
                .map((item) => item.imageLink)[0]
            }
          />
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {
              allUsers
                .filter((user) => user.userID === posts.userID)
                .map((item) => item.name)[0]
            }
          </p>
        </div>

        <p className="time-stamp">{posts.timestamp}</p>
      </div>
      <p className="status">{posts.status}</p>
      <LikeButton
        userId={currentUser?.id}
        postsId={posts.id}
        posts={posts}
        currentUser={currentUser}
        allUsers={allUsers}
      />
    </div>
  );
};

export default PostsCard;
