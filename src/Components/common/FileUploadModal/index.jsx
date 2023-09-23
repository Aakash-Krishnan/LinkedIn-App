/* eslint-disable react/prop-types */
import { Modal, Button, Progress } from "antd";
import "./index.scss";

const FileUploadModal = ({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) => {
  return (
    <div>
      <Modal
        title="Add a profile picture"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={uploadImage}
            disabled={currentImage.name ? false : true}
          >
            Upload profile picture
          </Button>,
        ]}
      >
        <div className="img-upload-main">
          <p>{currentImage.name}</p>
          <label htmlFor="img-upload">Add an image</label>
          {progress != 0 ? (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          ) : (
            <></>
          )}

          <input hidden id="img-upload" type="file" onChange={getImage} />
        </div>
      </Modal>
    </div>
  );
};

export default FileUploadModal;
