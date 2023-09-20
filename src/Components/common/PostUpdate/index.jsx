/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import "./index.scss";
import getUniqueId from "../../../helpers/getUniqueId";
import { PostStatusAPI, getStatusAPI } from "../../../api/FirestoreAPI";
import ModalComponent from "../Modal";
import PostsCard from "../postCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

const PostStatus = ({ curentUser }) => {
  // let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);

  const sendStatus = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimeStamp("LLL"),
      userEmail: curentUser.email,
      userName: curentUser.name,
      postId: getUniqueId(),
      userID: curentUser.userID,
    };
    await PostStatusAPI(object);
    await setModalOpen(false);
    await setStatus("");
  };

  useMemo(() => {
    getStatusAPI(setAllStatus);
  }, []);

  return (
    <div className="post-status-main">
      <div className="post-status">
        <button className="open-post-modal" onClick={() => setModalOpen(true)}>
          start a post
        </button>
      </div>

      <ModalComponent
        status={status}
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        sendStatus={sendStatus}
      />

      {allStatus.map((posts) => {
        return (
          <div key={posts.id}>
            <div>
              <PostsCard posts={posts} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostStatus;
