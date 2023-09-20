/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.scss";
import { editProfile } from "../../../api/FirestoreAPI";

//4:16:51

const ProfileEdit = ({ onEdit, currentUser }) => {
  const [editInputs, setEditInputs] = useState(currentUser);

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = async () => {
    await editProfile(currentUser?.id, editInputs);
    await onEdit();
  };

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <button onClick={onEdit}>Go back</button>
      </div>
      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          autoFocus
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />
        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          name="headline"
          value={editInputs.headline}
        />
        <label>Location</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Location"
          name="location"
          value={editInputs.location}
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          name="company"
          value={editInputs.company}
        />
        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        />
      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
