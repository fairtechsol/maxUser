import loader from "../../../assets/images/gameicons/loader.gif";

const CustomLoader = () => {
  return (
    <div className="custom-loader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default CustomLoader;