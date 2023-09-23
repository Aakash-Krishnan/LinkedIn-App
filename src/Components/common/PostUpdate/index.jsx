/* eslint-disable react/prop-types */
import "./index.scss";
import { useState, useMemo, useEffect } from "react";
import getUniqueId from "../../../helpers/getUniqueId";
import {
  PostStatusAPI,
  getAllUsersAPI,
  getChatMessageAPI,
  getStatusAPI,
  sendChatMessageAPI,
  updatePost,
} from "../../../api/FirestoreAPI";
import ModalComponent from "../Modal";
import PostsCard from "../postCard";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { FloatButton, Drawer, Card, ConfigProvider } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import Chat from "../Chat";
import { AiOutlineClose } from "react-icons/ai";
import { serverTimestamp } from "firebase/firestore";

const PostStatus = ({ curentUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [allUsers, setallusers] = useState({});
  const [selectChatFriend, setSelectChatFriend] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState("");
  const [oldMessage, setOldMessage] = useState({});

  console.log("oldMessage", allStatus);

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

  const sendChatMessage = (e) => {
    e.preventDefault();

    if (newMessage === "") {
      return;
    } else {
      let object = {
        text: newMessage,
        sentAt: getCurrentTimeStamp("LLL"),
        createdTimeStamp: serverTimestamp(),
        user: curentUser.name,
        roomId: roomId,
        chatId: getUniqueId(),
      };
      sendChatMessageAPI(object, setNewMessage);
    }
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

  useEffect(() => {
    getChatMessageAPI(roomId, setOldMessage);
  }, [roomId]);

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

      <FloatButton
        icon={<CommentOutlined />}
        badge={{ count: 1, color: "#07bd7a" }}
        onClick={() => {
          getAllUsersAPI(setallusers);
          setOpenDrawer(true);
        }}
      />
      <Drawer
        title="Comments"
        placement="right"
        onClose={() => {
          setSelectChatFriend({});
          setOpenDrawer(false);
        }}
        open={openDrawer}
      >
        <div>
          {Object.keys(selectChatFriend).length === 0 ? (
            <>
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <div key={user.id}>
                    <Chat
                      user={user}
                      selectChatFriend={selectChatFriend}
                      setSelectChatFriend={setSelectChatFriend}
                      setOpenDrawer={setOpenDrawer}
                      setRoomId={setRoomId}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 10,
                    colorBgContainer: "#99d492",
                  },
                }}
              >
                <form onSubmit={sendChatMessage} className="chat-box-form">
                  <Card
                    title={
                      <div className="chat-title">
                        <div className="chat-tittle-inner">
                          <img src={selectChatFriend.imageLink} />
                          <p>{selectChatFriend.name}</p>
                        </div>
                        <AiOutlineClose
                          size={20}
                          className="chat-close-btn"
                          onClick={() => setSelectChatFriend({})}
                        />
                      </div>
                    }
                    bordered={false}
                    style={{
                      width: 300,
                      minHeight: "600px",
                      padding: "0px",
                    }}
                    bodyStyle={{
                      padding: "8px",
                      width: "100%",
                    }}
                    headStyle={{
                      padding: "5px",
                      zIndex: 1,
                    }}
                  >
                    <div className="chat-container">
                      <div className="chat-messages">
                        {oldMessage?.map((message) => (
                          <div
                            className={
                              message.user != curentUser.name
                                ? "chat-right-side"
                                : "chat-left-side"
                            }
                            key={message.id}
                          >
                            <p className="chat-user-name">{message.user}</p>
                            <p className="chat-time">{message.sentAt}</p>
                            <p className="chat-text">{message.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="chat-input">
                        <textarea
                          id="chat-input"
                          placeholder="...Type your message..."
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                        ></textarea>
                      </div>
                    </div>
                  </Card>
                  <button className="chat-send-button" type="submit">
                    Send
                  </button>
                </form>
              </ConfigProvider>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default PostStatus;
