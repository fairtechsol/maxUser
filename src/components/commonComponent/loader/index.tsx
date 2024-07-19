import loader from "../../../assets/svg/loadersv.svg";
import LogoSection from "../logoSection";
import "./style.scss";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;

export const LoaderOnRefresh = () => {
  return (
    <div className="auth-main loader-main text-center d-flex flex-column justify-content-center align-items-center">
      <LogoSection width="auto" height="65px" />
      <img src={loader} alt="loader" />
    </div>
  );
};
