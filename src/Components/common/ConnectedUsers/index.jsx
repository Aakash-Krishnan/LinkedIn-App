/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getConnections } from "../../../api/FirestoreAPI";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const ConnectedUsers = ({ user, getCurrentUser, curentUser }) => {
  const [isConnected, setisConnected] = useState(false);

  useEffect(() => {
    getConnections(curentUser.id, user.id, setisConnected);
  }, [curentUser.id, user.id]);

  return (
    !isConnected && (
      <div className="grid-child">
        <img src={user.imageLink} />
        <p className="name">{user.name}</p>
        <p className="headline">{user.headline}</p>

        <button onClick={() => getCurrentUser(user.id)}>
          <AiOutlineUsergroupAdd size={20} /> Connect
        </button>
      </div>
    )
  );
};

export default ConnectedUsers;
