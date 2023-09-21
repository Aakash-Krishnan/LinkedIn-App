/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import LikeButton from "../LikeButton";
import {
  getCurrentUser,
  getAllUsersAPI,
  deletePostAPI,
  getConnections,
} from "../../../api/FirestoreAPI";
import { BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

const PostsCard = ({ posts, getEditData }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setisConnected] = useState(false);

  const navigate = useNavigate();

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsersAPI(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setisConnected);
  }, [currentUser.id, posts.userID]);

  return (
    <>
      {isConnected && (
        <div className="posts-card">
          <div className="trash-user-container">
            <div className="post-image-wrapper">
              <img
                alt="profile-img"
                className="post-image"
                src={
                  allUsers.filter((user) => user.id === posts.userID)[0]
                    ?.imageLink
                }
              />
              <div>
                <p
                  className="name"
                  onClick={() =>
                    navigate("/profile", {
                      state: { id: posts?.userID, email: posts.userEmail },
                    })
                  }
                >
                  {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
                </p>
                <p className="headline">
                  {
                    allUsers.filter((user) => user.id === posts.userID)[0]
                      ?.headline
                  }
                </p>
                <p className="time-stamp">{posts.timestamp}</p>
              </div>
              {currentUser.id === posts.userID && (
                <div className="edit-trah-icon-container">
                  <BiPencil
                    className="action-icon"
                    size={20}
                    onClick={() => getEditData(posts)}
                  />
                  <BsTrash
                    className="action-icon"
                    size={20}
                    onClick={() => deletePostAPI(posts.id)}
                  />
                </div>
              )}
            </div>
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
      )}
    </>
  );
};

export default PostsCard;
