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
          customClass="mt-2 rounded-top-1  rounded-bottom-0 py-2"
          customTextClass="cursor-pointer"
          title={title}
          rightComponent={
            <FiMonitor
              onClick={() => setShowVideo((prev: boolean) => !prev)}
              style={{ cursor: "pointer" }}
            />
          }
          setShowVideo={setShowVideo}
        />
      </div>
      <div className="borderTable border rounded-bottom-1">{children}</div>
    </div>
  );
};

export default RightPanelContainer;
