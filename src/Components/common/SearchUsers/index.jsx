import "./index.scss";
import { Input, Space } from "antd";

const SearchUser = ({ setSearchInput }) => {
  const { Search } = Input;
  return (
    <div className="search-users">
      {/* <input placeholder="search users.." /> */}
      <Search
        placeholder="input search text"
        enterButton
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </div>
  );
};

export default SearchUser;
