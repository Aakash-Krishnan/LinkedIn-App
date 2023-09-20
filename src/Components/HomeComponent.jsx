import "../Scss/HomeComponent.scss";
import PostStatus from "./common/PostUpdate";

const HomeComponent = ({ curentUser }) => {
  return (
    <div className="home-component">
      <PostStatus curentUser={curentUser} />
    </div>
  );
};

export default HomeComponent;
