import { Space, ConfigProvider, Spin, theme } from "antd";
import "./index.scss";
const { useToken } = theme;

const Loader = () => {
  const { token } = useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "white",
          borderRadius: 2,
          fontSize: token.fontSize,
        },
      }}
    >
      <div className="loader">
        <p>Loading please wait...</p>
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    </ConfigProvider>
  );
};

export default Loader;
