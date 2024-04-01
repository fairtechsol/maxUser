import { useState } from "react";
import { Tabs } from "react-bootstrap";
import "./style.scss";
import {useNavigate} from 'react-router-dom';
const CommonTabs = ({
  children,
  defaultActive,
  customClass,
  callback,
  selectedTab,
  ...props
}: any) => {
  const [key, setKey] = useState(defaultActive ?? "cricket");
  const navigate = useNavigate();
  return (
    <Tabs
      activeKey={key}
      onSelect={(k: any) => {
        if (callback) {
          callback(k);
        }
        setKey(k);
        if (k) {
          navigate(`/${k}`);
        }
        
      }}
      
      id="uncontrolled-tab-example"
      className={`w-100 ${customClass}`}
      {...props}
    >
      {children}
    </Tabs>
  );
};

export default CommonTabs;
