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
import { Modal } from "antd";

const PostsCard = ({ posts, getEditData }) => {
  const [currentUser, setCurrentUser] = useState({});

  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
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
      <Modal
        centered
        open={imageModal}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <div style={{}}>
          <img className="posted-preview-image" src={posts.postImage} />
        </div>
      </Modal>
      {isConnected || currentUser.id === posts.userID ? (
        <div className="posts-card">
          <div className="trash-user-container">
            <div className="post-image-wrapper">
              <img
                alt="profile-img"
                className="profile-image"
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
          {posts.postImage && (
            <img
              className="posted-image"
              src={posts.postImage}
              onClick={() => setImageModal(true)}
            />
          )}
          <div
            className="status"
            dangerouslySetInnerHTML={{ __html: posts.status }}
          ></div>

          <LikeButton
            userId={currentUser?.id}
            postsId={posts.id}
            posts={posts}
            currentUser={currentUser}
            allUsers={allUsers}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostsCard;
