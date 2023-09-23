/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { getConnections, getCurrentUser } from "../../../api/FirestoreAPI";
import "./index.scss";
import { sortBy } from "lodash";

const Chat = ({ user, selectChatFriend, setSelectChatFriend, setRoomId }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isConnected, setisConnected] = useState(false);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  useEffect(() => {}, []);

  useEffect(() => {
    getConnections(currentUser.id, user.id, setisConnected);
  }, [currentUser.id, user.id]);

  return (
    <div className="chat-list-container">
      <></>
      {isConnected ? (
        !Object.keys(selectChatFriend).length && (
          <div
            className="chat-list"
            onClick={() => {
              setSelectChatFriend(user);
              setRoomId(sortBy(user?.id?.concat(currentUser?.id))?.join(""));
            }}
          >
            <img className="friend-pic" src={user.imageLink} />
            <p className="friend-name">{user.name}</p>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chat;
