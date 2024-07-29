
import isMobile from "../../../utils/screenDimension";

const InnerLoader = () => {
  return (
    <div className={isMobile ? "loader-mobile" : "loader-inner"} >
      {/* <img src={loader} alt="loader"/> */}
    </div>
  );
};

export default InnerLoader;