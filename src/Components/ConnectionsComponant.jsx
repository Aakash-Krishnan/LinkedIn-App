/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../Scss/ConnectionsComponent.scss";
import {
  addConnection,
  getAllUsersAPI,
  getConnections,
} from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";

const ConnectionsComponent = ({ curentUser }) => {
  const [users, setUsers] = useState([]);

  const getCurrentUser = (id) => {
    addConnection(curentUser.id, id);
  };

  useEffect(() => {
    getAllUsersAPI(setUsers);
  }, []);

  return (
    <div className="connections-main">
      {users.map((user) => {
        return (
          <>
            {user.id != curentUser.id ? (
              <ConnectedUsers
                curentUser={curentUser}
                user={user}
                getCurrentUser={getCurrentUser}
              />
            ) : (
              <></>
            )}
          </>
        );
      })}
    </div>
  );
};

export default ConnectionsComponent;
