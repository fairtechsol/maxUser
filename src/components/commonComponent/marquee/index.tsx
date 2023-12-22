import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const MarqueeHeader = () => {
  const { marqueeNotification } = useSelector(
    (state: RootState) => state.user.profile
  );

  return (
    <>
      <div className="marquee-container nav-marquee text-white">
        <div className="marquee-content title-14">
          {/* Your scrolling content goes here */}
          <i>{marqueeNotification?.value}</i>
        </div>
      </div>
    </>
  );
};

export default MarqueeHeader;
