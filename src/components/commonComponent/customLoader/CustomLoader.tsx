import loader from "../../../assets/images/loader.gif";
// import "../../";

const CustomLoader = () => {
  return (
    <div className="custom-loader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default CustomLoader;