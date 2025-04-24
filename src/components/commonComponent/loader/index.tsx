import loader from "../../../assets/svg/loadersv.svg";
import "./style.scss";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;

