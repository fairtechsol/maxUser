import { useState } from "react";
import { Tabs } from "react-bootstrap";
import "./style.scss";

const CommonTabs = ({
  children,
  defaultActive,
  customClass,
  callback,
  ...props
}: any) => {
  const [key, setKey] = useState(defaultActive);
  return (
    <Tabs
      activeKey={key}
      onSelect={(k: any) => {
        if (callback) {
          callback(k);
        }
        setKey(k);
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
