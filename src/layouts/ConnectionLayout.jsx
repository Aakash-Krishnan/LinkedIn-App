import Connections from "../Pages/Connections";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../Components/common/Topbar";
import { useMemo, useState } from "react";

const ConnectionsLayout = () => {
  const [curentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div>
      <Topbar />
      <Connections curentUser={curentUser} />
    </div>
  );
};

export default ConnectionsLayout;
