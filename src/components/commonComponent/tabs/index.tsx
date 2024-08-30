import { useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import SportsFilterJson from "../../home/sportsFilters/sportsFilters.json";
const CommonTabs = ({
  children,
  defaultActive,
  customClass,
  callback,
  selectedTab,
  ...props
}: any) => {
  const [key, setKey] = useState("cricket");
  const navigate = useNavigate();
  useEffect(() => {
    if (props?.id) {
      if (callback) {
        callback(props?.id);
      }
      setKey(props?.id);
    }
  }, [props?.id]);

  useEffect(() => {
    if (defaultActive) {
      setKey(defaultActive);
    } else {
      setKey("cricket");
    }
  }, [defaultActive]);

  return (
    <Tabs
      activeKey={key}
      onSelect={(k: any) => {
        if (callback) {
          callback(k);
        }
        setKey(k);
        const sportsFilterArray = SportsFilterJson();
        const sportsFilterIds = sportsFilterArray.map((item: any) => item.id);
        if (sportsFilterIds.includes(k)) {
          navigate(`/${k}`);
        }
        // if (k) {
        //   navigate(`/${k}`);
        // }
      }}
      id="uncontrolled-tab-example"
      className={`w-100 flex-nowrap ${customClass}`}
      {...props}
    >
      {children}
    </Tabs>
  );
};

export default CommonTabs;
