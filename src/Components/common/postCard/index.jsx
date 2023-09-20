/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./index.scss";

const PostsCard = ({ posts }) => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default PostsCard;
