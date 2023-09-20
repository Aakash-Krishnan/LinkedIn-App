import Home from "../Pages/Home";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../Components/common/Topbar";
import { useMemo, useState } from "react";
const HomeLayout = () => {
  const [curentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar />
      <Home curentUser={curentUser} />
    </div>
  );
};

export default HomeLayout;
