
import { loadernew } from "../../../assets/images";
import {isMobile} from "../../../utils/screenDimension";

const InnerLoader = () => {
  return (
    <div className={isMobile ? "loader-mobile" : "loader-inner"} >
      <img  src={loadernew}  width={80} height={80} alt="loader"/>
    </div>
  );
};

export default InnerLoader;