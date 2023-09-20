/* eslint-disable react/prop-types */
import { Modal, Button } from "antd";
import "./index.scss";

const ModalComponent = ({
  setStatus,
  modalOpen,
  setModalOpen,
  status,
  sendStatus,
}) => {
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            onClick={sendStatus}
          >
            post
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
