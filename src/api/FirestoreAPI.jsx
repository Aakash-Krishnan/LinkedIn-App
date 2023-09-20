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
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let usersRef = collection(firestore, "users");

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
