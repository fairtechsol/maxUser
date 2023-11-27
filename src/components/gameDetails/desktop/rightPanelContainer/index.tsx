import React from 'react';
import BetTableHeader from '../../../commonComponent/betTableHeader';
interface RightPanelContainerProps {
    title: string;
    children: React.ReactNode;
  }
const RightPanelContainer = ({title,children}:RightPanelContainerProps) => {
  return (
    <div>
      <div>
        <BetTableHeader customClass="mt-2 rounded-top-1  rounded-bottom-0 py-2" title={title} />
      </div>
      <div className="borderTable border">
       {children}
      </div>
    </div>
  );
}

export default RightPanelContainer;
