/* eslint-disable no-unused-vars */
import { storage } from "../firebase.confic";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editProfile } from "./FirestoreAPI";

export const uploadImageAPI = (
  file,
  id,
  setModalOpen,
  setCurrentImage,
  setProgress
) => {
  const profilePics = ref(storage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePics, file);

  //7:35:07

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = `${Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      )}`;
      setProgress(progress);
    },
    (error) => {
      console.log("Uploading Image error", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        editProfile(id, { imageLink: res });
        setCurrentImage({});
        setProgress(0);
        setModalOpen(false);
      });
    }
  );
};

export const uploadPostImageAPI = (file, setPostImage, setProgress) => {
  const postPicsRef = ref(storage, `postsImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postPicsRef, file);

  //10:33:35

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log("Uploading Image error", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((res) => {
        setPostImage(res);
      });
    }
  );
};
