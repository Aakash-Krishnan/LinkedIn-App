/* eslint-disable react/prop-types */
import "./index.scss";
import { useState, useMemo } from "react";
import getUniqueId from "../../../helpers/getUniqueId";
import {
  PostStatusAPI,
  getStatusAPI,
  updatePost,
} from "../../../api/FirestoreAPI";
import ModalComponent from "../Modal";
import PostsCard from "../postCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

const PostStatus = ({ curentUser }) => {
  // let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimeStamp("LLL"),
      userEmail: curentUser.email,
      userName: curentUser.name,
      postId: getUniqueId(),
      userID: curentUser.id,
      postImage: postImage,
    };
    await PostStatusAPI(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };

  const getEditData = (posts) => {
    setStatus(posts?.status);
    setCurrentPost(posts);
    setModalOpen(true);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(
      currentPost?.id,
      status,
      postImage,
      setModalOpen,
      setStatus,
      setCurrentPost
    );
  };

  useMemo(() => {
    getStatusAPI(setAllStatus);
  }, []);

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={curentUser.imageLink} alt="user-image" />
        <p className="name">{curentUser.name}</p>
        <p className="headline">{curentUser.headline}</p>
      </div>
      <div className="post-status">
        <img src={curentUser.imageLink} alt="post-image" />

        <button
          className="open-post-modal"
          onClick={() => {
            setIsEdit(false);
            setModalOpen(true);
          }}
        >
          start a post
        </button>
      </div>

      <ModalComponent
        status={status}
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        setPostImage={setPostImage}
        postImage={postImage}
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
      />

      {allStatus.map((posts) => {
        return (
          <div key={posts.id}>
            <div>
              <PostsCard posts={posts} getEditData={getEditData} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostStatus;
