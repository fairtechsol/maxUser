import { useState } from "react";
import { Tabs } from "react-bootstrap";
import "./style.scss";

const CommonTabs = ({
  children,
  defaultActive,
  customClass,
  ...props
}: any) => {
  const [key, setKey] = useState(defaultActive);
  return (
    <Tabs
      activeKey={key}
      onSelect={(k: any) => setKey(k)}
      id="uncontrolled-tab-example"
      className={`w-100 ${customClass}`}
      {...props}
    >
      {children}
    </Tabs>
  );
};

export default CommonTabs;
