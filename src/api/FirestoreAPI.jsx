/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { firestore } from "../firebase.confic";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let usersRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionsRef = collection(firestore, "connections");

export const PostStatusAPI = (object) => {
  addDoc(postsRef, object)
    .then((res) => {
      toast.success("Document status updated successfully");
    })
    .catch((err) => {
      toast.error("Error in uploading");
    });
};

export const getStatusAPI = (setAllStatus) => {
  let orderPostRef = query(postsRef, orderBy("timestamp", "desc"));
  onSnapshot(orderPostRef, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) => {
  addDoc(usersRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getAllUsersAPI = (setAllUsers) => {
  onSnapshot(usersRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(usersRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const editProfile = (userID, payload) => {
  let userToEdit = doc(usersRef, userID);
  updateDoc(userToEdit, payload)
    .then((res) => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      toast.error("Profile Rejected!");
    });
};

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setAllStatus, email) => {
  const singleUserQuery = query(usersRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const LikePost = (userId, postsId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postsId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postsId });
    }
  } catch (err) {
    console.log("Like Error", err);
  }
};

export const getLikesByUser = (userId, postsId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postsId", "==", postsId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes.length;

      const isLiked = likes.some((like) => like.userId === userId);
      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log("Get lIke error", err);
  }
};

export const postComment = (postsId, comment, timeStamp, name, setComment) => {
  try {
    addDoc(commentsRef, { postsId, comment, timeStamp, name });
    setComment("");
  } catch (err) {
    console.log("Posting comment failed", err);
  }
};

export const getCommentsAPI = (
  postsId,
  setRecoveredComments,
  setCommentsCount
) => {
  try {
    let commentsQuery = query(commentsRef, where("postsId", "==", postsId));

    onSnapshot(commentsQuery, (response) => {
      const commentsCount = response.docs.length;
      setCommentsCount(commentsCount);

      const comments = response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      });

      setRecoveredComments(comments);
    });
  } catch (err) {
    console.log("Get lIke error", err);
  }
};

export const updatePost = (
  id,
  status,
  postImage,
  setModalOpen,
  setStatus,
  setCurrentPost
) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success("Profile has been updated!");
    setStatus("");
    setModalOpen(false);
    setCurrentPost({});
  } catch (err) {
    console.log(err);
  }
};

export const deletePostAPI = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Profile has been Deleted!");
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionsRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });
    toast.success("Connection added!");
  } catch (err) {
    console.log("Like Error", err);
  }
};

export const getConnections = (userId, targetId, setisConnected) => {
  try {
    let connectionsQuery = query(
      connectionsRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());

      const isConnected = likes.some((connect) => connect.userId === userId);
      setisConnected(isConnected);
    });
  } catch (err) {
    console.log("Get lIke error", err);
  }
};
