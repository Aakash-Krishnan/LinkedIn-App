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
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let usersRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");

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
  onSnapshot(postsRef, (response) => {
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
  let statusToEdit = doc(postsRef, userID);
  console.log("payload", payload.name);

  updateDoc(userToEdit, payload)
    .then((res) => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      toast.error("Profile Rejected!");
    });

  updateDoc(statusToEdit, payload).then(() => {
    toast.success("ProfileName ");
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
