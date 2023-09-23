/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.scss";
import { editProfile } from "../../../api/FirestoreAPI";
import { AiOutlineClose } from "react-icons/ai";

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
        <AiOutlineClose className="close-icon" onClick={onEdit} />
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
        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        <label>Industry</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Industry"
          name="industry"
          value={editInputs.industry}
        />
        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        />
        <label>Website</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>
        <textarea
          className="common-textArea"
          onChange={getInput}
          placeholder="About me"
          rows={5}
          name="aboutme"
          value={editInputs.aboutme}
        />
        <label>Skills</label>
        <input
          className="common-textArea"
          onChange={getInput}
          placeholder="Skills"
          name="skills"
          value={editInputs.skills}
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
