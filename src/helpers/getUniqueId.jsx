import uuid from "react-uuid";
const getUniqueId = () => {
  let id = uuid();
  return id;
};

export default getUniqueId;
