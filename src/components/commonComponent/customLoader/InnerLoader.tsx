import loader from "../../../assets/images/gameicons/loader.gif";

const InnerLoader = () => {
  return (
    <div className="loader-inner">
      <img src={loader} alt="loader"/>
    </div>
  );
};

export default InnerLoader;