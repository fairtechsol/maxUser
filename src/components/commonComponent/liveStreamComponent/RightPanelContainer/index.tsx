import React from "react";
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
    <>
      <BetTableHeader
        customClass=" rounded-0 py-1"
        customTextClass="cursor-pointer"
        title={title}
        setShowVideo={setShowVideo}
      />
      <div className="borderTable border rounded-bottom-1">{children}</div>
    </>
  );
};

export default RightPanelContainer;
