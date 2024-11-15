import React from "react";
import { FiMonitor } from "react-icons/fi";
import BetTableHeader from "../BetTableHeader";
interface RightPanelContainerProps {
  title: string;
  children: React.ReactNode;
  setShowVideo: any;
}
const RightPanelContainer = ({
  title,
  setShowVideo,
  children,
}: RightPanelContainerProps) => {
  return (
    <div>
      <div>
        <BetTableHeader
          customClass=" rounded-0 py-1 mt-1"
          customTextClass="cursor-pointer"
          title={title}
          // rightComponent={
          //   <FiMonitor
          //     onClick={() => setShowVideo((prev: boolean) => !prev)}
          //     style={{ cursor: "pointer" }}
          //     color="white"
          //   />
          // }
          setShowVideo={setShowVideo}
        />
      </div>
      <div className="borderTable border rounded-bottom-1">{children}</div>
    </div>
  );
};

export default RightPanelContainer;
