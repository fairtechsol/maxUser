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
        <BetTableHeader customClass="mt-2 rounded-0  py-1" title={title} />
      </div>
      <div className="borderTable border rounded-0">
       {children}
      </div>
    </div>
  );
}

export default RightPanelContainer;
