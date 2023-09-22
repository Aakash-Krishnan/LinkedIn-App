/* eslint-disable react/prop-types */
import "./index.scss";
import { Input } from "antd";

const SearchUser = ({ setSearchInput }) => {
  const { Search } = Input;
  return (
    <div className="search-users">
      <Search
        placeholder="input search text"
        enterButton
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </div>
  );
};

export default SearchUser;
