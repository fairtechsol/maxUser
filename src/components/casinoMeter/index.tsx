import isMobile from "../../utils/screenDimension";
import CasinoMeterDesktop from "./desktop";
import CasinoMeterMobile from "./mobile";

const CasinoMeterComponentList = () => {
  return isMobile ? (
    <CasinoMeterMobile />
  ) : (
    <CasinoMeterDesktop  />
  );
};

export default CasinoMeterComponentList;
