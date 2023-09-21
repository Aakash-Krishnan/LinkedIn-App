/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import {
  LikePost,
  getCommentsAPI,
  getLikesByUser,
  postComment,
} from "../../../api/FirestoreAPI";
import "./index.scss";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { useNavigate } from "react-router-dom";

const LikeButton = ({ userId, postsId, currentUser, posts, allUsers }) => {
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [recoveredComments, setRecoveredComments] = useState({});
  const [commentsCount, setCommentsCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(
      postsId,
      comment,
      getCurrentTimeStamp("LLL"),
      currentUser?.name,
      setComment
    );
  };

  const handleLike = () => {
    LikePost(userId, postsId, liked);
  };

  useMemo(() => {
    getLikesByUser(userId, postsId, setLiked, setLikesCount);
    getCommentsAPI(postsId, setRecoveredComments, setCommentsCount);
  }, [userId, postsId]);

  return (
    <div className="like-container">
      <div className="likes-comments">
        <p>
          <span>{likesCount} </span>people liked this post
        </p>
        <p>
          <span>{commentsCount} </span> people commented
        </p>
      </div>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BiSolidLike size={30} color="#0072b1" />
          ) : (
            <BiLike size={30} />
          )}
          <p className={liked ? "blue" : "black"}>Like</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            className={showCommentBox ? "blue" : "black"}
            size={30}
          />

          <p className={showCommentBox ? "blue" : "black"}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            className="comment-input"
            placeholder="Add a comment"
            onChange={getComment}
            name="comment"
            value={comment}
          />
          <button onClick={addComment} className="add-comment-btn">
            Add comment
          </button>

          {recoveredComments.length > 0 ? (
            <div className="whole-comment-container">
              {recoveredComments.map((comment) => {
                return (
                  <>
                    <div key={comment.id} className="all-comments">
                      <div className="comments-username">
                        {allUsers
                          .filter((user) => user.userID === posts.userID)
                          .map((item) => (
                            <p key={item.id}>{item.name}</p>
                          ))}

                        <p className="timeStamp">{comment.timeStamp}</p>
                      </div>
                      <div className="comment-container">
                        <p className="comment">{comment.comment}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LikeButton;
