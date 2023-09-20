import { useMemo, useState } from "react";
import { LikePost, getLikesByUser } from "../../../api/FirestoreAPI";
import "./index.scss";
import { BiLike, BiSolidLike } from "react-icons/bi";

const LikeButton = ({ userId, postsId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    LikePost(userId, postsId, liked);
  };

  useMemo(() => {
    getLikesByUser(userId, postsId, setLiked, setLikesCount);
  }, [userId, postsId]);

  return (
    <div className="like-container" onClick={handleLike}>
      <p>{likesCount} people liked this post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="likes-inner">
        {liked ? (
          <BiSolidLike size={30} color="#0072b1" />
        ) : (
          <BiLike size={30} />
        )}
        <p className={liked ? "blue" : "black"}>Like</p>
      </div>
    </div>
  );
};

export default LikeButton;
