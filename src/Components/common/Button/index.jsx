import "./index.scss";

const Button = ({ title, onClick }) => {
  return (
    <>
      <button className="common-btn" onClick={onClick}>
        {title}
      </button>
    </>
  );
};

export default Button;
