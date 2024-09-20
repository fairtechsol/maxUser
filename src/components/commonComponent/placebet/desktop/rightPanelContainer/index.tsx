import React from 'react';
// import BetTableHeader from '../../../commonComponent/betTableHeader';
import BetTableHeader from '../../../betTableHeader';
interface RightPanelContainerProps {
    title: string;
    children: React.ReactNode;
  }
const RightPanelContainer = ({title,children}:RightPanelContainerProps) => {
  return (
    <div>
      <div>
        <BetTableHeader customClass="mt-2 rounded-0 lh-1 py-2" title={title} />
      </div>
      <div className="borderTable border rounded-0">
       {children}
      </div>
    </div>
  );
}

export default RightPanelContainer;
