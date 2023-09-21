/* eslint-disable react/prop-types */
import { Modal, Button } from "antd";
import "./index.scss";

const ModalComponent = ({
  setStatus,
  modalOpen,
  setModalOpen,
  status,
  sendStatus,
  isEdit,
  updateStatus,
}) => {
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
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
        <input
          className="modal-input"
          placeholder="what do you want to talk about"
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        />
      </Modal>
    </>
  );
};
export default ModalComponent;
