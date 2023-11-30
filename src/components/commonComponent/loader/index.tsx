import loader from "../../../assets/images/loader.gif";
import "./style.scss";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
