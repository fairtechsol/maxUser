import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const MarqueeHeader = () => {
  const { marqueeNotification } = useSelector(
    (state: RootState) => state.user.profile
  );

  return (
    <>
      <div className="marquee-container nav-marquee text-white">
        <Marquee>
          <span style={{ marginLeft: "300px", fontStyle: "italic" }}>
            {marqueeNotification?.value}
          </span>
        </Marquee>
      </div>
    </>
  );
};

export default MarqueeHeader;
