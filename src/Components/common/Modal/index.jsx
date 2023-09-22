/* eslint-disable react/prop-types */
import "./index.scss";

import { Modal, Button, Progress } from "antd";
import { FcPicture } from "react-icons/fc";
import { uploadPostImageAPI } from "../../../api/ImageUploadAPI";
import { useState } from "react";
import ReactQuill from "react-quill";

const ModalComponent = ({
  setStatus,
  modalOpen,
  setModalOpen,
  status,
  sendStatus,
  isEdit,
  updateStatus,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setPostImage("");
          setCurrentPost({});
          setStatus("");
          setModalOpen(false);
          setProgress(0);
        }}
        onCancel={() => {
          setPostImage("");
          setCurrentPost({});
          setStatus("");
          setModalOpen(false);
          setProgress(0);
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            onClick={isEdit ? updateStatus : sendStatus}
          >
            {isEdit ? "Edit" : "post"}
          </Button>,
        ]}
      >
        <div className="post-body">
          <ReactQuill
            className="modal-input"
            placeholder="Share your thoughts..."
            theme="snow"
            value={status}
            onChange={setStatus}
          />
          ;
          {progress === 0 || progress === 100 ? (
            <>
              {postImage.length > 0 || currentPost?.postImage?.length ? (
                <img
                  className="preview-image"
                  src={postImage || currentPost?.postImage}
                  alt="post-image"
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
        </div>

        <label htmlFor="pic-upload">
          <FcPicture className="picture-icon" size={38} />
        </label>
        <input
          type="file"
          id="pic-upload"
          hidden
          onChange={(event) =>
            uploadPostImageAPI(event.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};
export default ModalComponent;
