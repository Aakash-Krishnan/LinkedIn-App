import Connections from "../Pages/Connections";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../Components/common/Topbar";
import { useMemo, useState } from "react";
import "../Scss/ConnectionsComponent.scss";

const ConnectionsLayout = () => {
  const [curentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="Connections-page">
      <Topbar />
      <Connections curentUser={curentUser} />
    </div>
  );
};

export default ConnectionsLayout;
