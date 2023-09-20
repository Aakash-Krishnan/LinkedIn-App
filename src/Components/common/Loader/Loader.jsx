import { Space, Spin } from "antd";
import "./index.scss";

const Loader = () => {
  return (
    <div className="loader">
      <p>Loading please wait...</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loader;
