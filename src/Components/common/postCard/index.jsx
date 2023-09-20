/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import LikeButton from "../LikeButton";
import { getCurrentUser } from "../../../api/FirestoreAPI";

const PostsCard = ({ posts }) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="posts-card">
      <p
        className="name"
        onClick={() =>
          navigate("/profile", {
            state: { id: posts?.userID, email: posts.userEmail },
          })
        }
      >
        {posts.userName}
      </p>
      <p className="time-stamp">{posts.timestamp}</p>
      <p className="status">{posts.status}</p>
      <LikeButton userId={currentUser?.id} postsId={posts.id} />
    </div>
  );
};

export default PostsCard;
